import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail, ticketsLiveEmail, soldOutEmail, comingSoonEmail } from "@/lib/email";

const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY || "";
const EVENT_URL = process.env.EVENT_URL || "";
const QSTASH_CURRENT_SIGNING_KEY = process.env.QSTASH_CURRENT_SIGNING_KEY || "";
const QSTASH_NEXT_SIGNING_KEY = process.env.QSTASH_NEXT_SIGNING_KEY || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";

const BOOKING_KEYWORDS = ["book now", "buy now", "book tickets", "buy tickets", "get tickets", "add to cart"];
const SOLD_OUT_KEYWORDS = ["sold out", "housefull", "house full", "no tickets available"];
const COMING_SOON_KEYWORDS = ["coming soon", "notify me", "register now", "stay tuned", "releasing soon"];

const EVENT_KEYWORDS = ["t20", "semifinal", "semi-final", "semi final", "india vs england", "india v england", "ind vs eng", "ind v eng"];

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
];

function determineStatus(text: string): "available" | "sold_out" | "coming_soon" | "unknown" {
  const t = text.toLowerCase();
  if (SOLD_OUT_KEYWORDS.some((kw) => t.includes(kw))) return "sold_out";
  if (COMING_SOON_KEYWORDS.some((kw) => t.includes(kw))) return "coming_soon";
  if (BOOKING_KEYWORDS.some((kw) => t.includes(kw))) return "available";
  return "unknown";
}

async function fetchPage(url: string): Promise<string | null> {
  const headers: Record<string, string> = {
    "User-Agent": USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
    Referer: "https://www.google.com/",
  };

  const target = SCRAPER_API_KEY
    ? `https://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(url)}`
    : url;

  try {
    const r = await fetch(target, { headers, signal: AbortSignal.timeout(60_000) });
    if (!r.ok) { console.warn(`HTTP ${r.status} for ${url}`); return null; }
    return await r.text();
  } catch (err) {
    console.warn(`Fetch error for ${url}:`, err);
    return null;
  }
}

function extractText(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

async function verifyQStash(req: Request): Promise<boolean> {
  if (!QSTASH_CURRENT_SIGNING_KEY && !QSTASH_NEXT_SIGNING_KEY) return true;
  const sig = req.headers.get("upstash-signature");
  if (!sig) return false;
  const authHeader = req.headers.get("authorization");
  if (authHeader) return true;
  return !!sig;
}

async function notifySubscribers(status: "available" | "sold_out" | "coming_soon", eventUrl: string) {
  try {
    const db = getSupabaseAdmin();

    const { data: events } = await db.from("events").select("id, title").eq("is_active", true).limit(1).single();
    if (!events) { console.log("No active event"); return; }

    const eventName = events.title;
    const eventId = events.id;

    const { data: subs } = await db
      .from("subscriptions")
      .select("id, user_id, users(email)")
      .eq("event_id", eventId)
      .eq("status", "active");

    if (!subs || subs.length === 0) { console.log("No active subscribers"); return; }

    const emailTemplate =
      status === "available" ? ticketsLiveEmail(eventName, eventUrl) :
      status === "sold_out" ? soldOutEmail(eventName, eventUrl) :
      comingSoonEmail(eventName, eventUrl);

    let sent = 0;
    for (const sub of subs) {
      const users = sub.users as unknown as { email: string } | null;
      const email = users?.email;
      if (!email) continue;

      const { data: existing } = await db
        .from("alerts")
        .select("id")
        .eq("subscription_id", sub.id)
        .eq("status_detected", status)
        .maybeSingle();

      if (existing) continue;

      const ok = await sendEmail(email, emailTemplate.subject, emailTemplate.html);
      if (ok) {
        await db.from("alerts").insert({
          subscription_id: sub.id,
          user_id: sub.user_id,
          event_id: eventId,
          channel: "email",
          status_detected: status,
        });
        sent++;
      }
    }
    console.log(`Notified ${sent} subscribers (${status})`);

    if (NOTIFY_EMAIL) {
      await sendEmail(NOTIFY_EMAIL, emailTemplate.subject, emailTemplate.html);
    }
  } catch (err) {
    console.error("Error notifying subscribers:", err);
  }
}

export async function POST(req: Request) {
  const authorized = await verifyQStash(req);
  if (!authorized) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const isDebug = searchParams.get("debug") === "true";

  const checkUrl = EVENT_URL || "https://in.bookmyshow.com/explore/cricket-mumbai";

  console.log(`[Checker] Fetching: ${checkUrl}${isDebug ? " (debug mode)" : ""}`);
  const html = await fetchPage(checkUrl);
  if (!html) {
    console.warn("[Checker] Could not fetch page");
    return NextResponse.json({ ok: true, status: "fetch_error", message: "Could not fetch BookMyShow page" });
  }

  const text = extractText(html);
  const keywordHits = EVENT_KEYWORDS.filter((kw) => text.includes(kw)).length;
  const status = determineStatus(text);

  console.log(`[Checker] Status: ${status}, Keywords: ${keywordHits}`);

  if (status === "available") {
    console.log("[Checker] TICKETS ARE AVAILABLE! Notifying subscribers...");
    await notifySubscribers("available", checkUrl);
  } else if (status === "sold_out") {
    console.log("[Checker] Tickets sold out. Notifying subscribers...");
    await notifySubscribers("sold_out", checkUrl);
  } else if (status === "coming_soon") {
    console.log("[Checker] Coming soon — notifying subscribers (once per subscriber)...");
    await notifySubscribers("coming_soon", checkUrl);
  }

  return NextResponse.json({
    ok: true,
    status,
    keywordHits,
    checkedUrl: checkUrl,
    timestamp: new Date().toISOString(),
    debug: isDebug,
  });
}

export async function GET(req: Request) {
  return POST(req);
}
