import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail, welcomeEmail } from "@/lib/email";

function getAdminPass() {
  return process.env.ADMIN_PASSWORD || "semimatch2026";
}

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: Request) {
  const auth = (req.headers.get("x-admin-password") || "").trim();
  const pass = getAdminPass().trim();
  return auth === pass;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) return unauthorized();

  const { searchParams } = new URL(req.url);
  const tab = searchParams.get("tab") || "users";

  if (tab === "auth_check") {
    return NextResponse.json({ ok: true, message: "Authenticated" });
  }

  try {
    const db = getSupabaseAdmin();

    if (tab === "users") {
      const { data, error } = await db.from("users").select("*").order("created_at", { ascending: false });
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, data });
    }

    if (tab === "subscriptions") {
      const { data, error } = await db
        .from("subscriptions")
        .select("*, users(email, name), events(title)")
        .order("created_at", { ascending: false });
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, data });
    }

    if (tab === "alerts") {
      const { data, error } = await db
        .from("alerts")
        .select("*, users(email), events(title)")
        .order("sent_at", { ascending: false })
        .limit(100);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, data });
    }

    return NextResponse.json({ ok: false, error: "Invalid tab" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!checkAuth(req)) return unauthorized();

  try {
    const db = getSupabaseAdmin();
    const body = await req.json();
    const action = body.action as string;

    if (action === "add_user") {
      const email = (body.email || "").trim().toLowerCase();
      const name = (body.name || "").trim();
      if (!email) return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });

      const { data, error } = await db.from("users").upsert({ email, name: name || null }, { onConflict: "email" }).select("id, email").single();
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, user: data });
    }

    if (action === "activate_subscription") {
      const subId = body.subscription_id;
      if (!subId) return NextResponse.json({ ok: false, error: "subscription_id required" }, { status: 400 });

      const { error } = await db.from("subscriptions").update({ status: "active", paid_amount: 999, currency: "INR" }).eq("id", subId);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

      const { data: sub } = await db.from("subscriptions").select("users(email), events(title)").eq("id", subId).single();
      if (sub) {
        const users = sub.users as unknown as { email: string } | null;
        const events = sub.events as unknown as { title: string } | null;
        if (users?.email) {
          const w = welcomeEmail(events?.title || "T20 Semi Final — India vs England");
          sendEmail(users.email, w.subject, w.html).catch(() => {});
        }
      }

      return NextResponse.json({ ok: true, message: "Activated & welcome email sent" });
    }

    if (action === "add_subscriber") {
      const email = (body.email || "").trim().toLowerCase();
      const name = (body.name || "").trim();
      const eventId = body.event_id;
      if (!email) return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });

      const { data: user, error: ue } = await db.from("users").upsert({ email, name: name || null }, { onConflict: "email" }).select("id").single();
      if (ue || !user) return NextResponse.json({ ok: false, error: ue?.message || "User error" }, { status: 500 });

      let eid = eventId;
      if (!eid) {
        const { data: ev } = await db.from("events").select("id").eq("is_active", true).limit(1).single();
        eid = ev?.id;
      }
      if (!eid) return NextResponse.json({ ok: false, error: "No active event found" }, { status: 400 });

      const { error: se } = await db.from("subscriptions").upsert(
        { user_id: user.id, event_id: eid, status: "active", paid_amount: 999, currency: "INR" },
        { onConflict: "user_id,event_id" }
      );
      if (se) return NextResponse.json({ ok: false, error: se.message }, { status: 500 });

      const { data: ev } = await db.from("events").select("title").eq("id", eid).single();
      const w = welcomeEmail(ev?.title || "T20 Semi Final — India vs England");
      sendEmail(email, w.subject, w.html).catch(() => {});

      return NextResponse.json({ ok: true, message: `${email} activated & welcome email sent` });
    }

    if (action === "test_email") {
      const email = (body.email || "").trim().toLowerCase();
      const type = body.type || "welcome";
      if (!email) return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });

      const eventName = "T20 Semi Final — India vs England";
      const eventUrl = "https://in.bookmyshow.com/sports/icc-men-s-t20-world-cup-2026-semi-final-2/ET00474271";

      let template: { subject: string; html: string };
      if (type === "tickets_live") {
        template = (await import("@/lib/email")).ticketsLiveEmail(eventName, eventUrl);
      } else if (type === "sold_out") {
        template = (await import("@/lib/email")).soldOutEmail(eventName, eventUrl);
      } else {
        template = welcomeEmail(eventName);
      }

      const ok = await sendEmail(email, `[TEST] ${template.subject}`, template.html);
      if (!ok) return NextResponse.json({ ok: false, error: "Failed to send email. Check Gmail credentials." }, { status: 500 });
      return NextResponse.json({ ok: true, message: `Test ${type} email sent to ${email}` });
    }

    return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
