"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type EventItem = { id: string; title: string; city: string; event_url: string | null };

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgOk, setMsgOk] = useState(true);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await fetch("/api/semifinals/events");
        const j = (await r.json()) as { ok: boolean; events?: EventItem[] };
        if (ok && j.ok && j.events?.length) { setEvents(j.events); setEventId(j.events[0].id); }
      } catch { /* handled below */ }
    })();
    return () => { ok = false; };
  }, []);

  const STRIPE_LINK = "https://buy.stripe.com/5kQ6oJgYqe4N7vB3JJc3m08";
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const disabled = useMemo(() => loading || !isValidEmail(email), [loading, email]);

  async function pay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) { setMsgOk(false); setMsg("Please enter a valid email (e.g. name@gmail.com)"); return; }
    setLoading(true);
    setMsg("Redirecting to payment...");
    setMsgOk(true);

    try {
      await fetch("/api/semifinals/payment/create-order", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, eventId: eventId || "default" }),
      }).catch(() => {});
    } catch { /* ignore — DB save is best-effort */ }

    window.location.href = `${STRIPE_LINK}?prefilled_email=${encodeURIComponent(email)}`;
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-orange-200">
      {/* ═══ HERO + CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero.png" alt="" fill className="object-cover object-center brightness-[0.3] saturate-[0.8]" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a3a]/80 via-[#0f2557]/70 to-white" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-6 px-4 pb-10 pt-8 sm:px-6 sm:py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10 lg:py-16">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" /></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-200">Monitoring Live</span>
            </div>

            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">ICC T20 World Cup 2026 &middot; Semi Final</p>

            <h1 className="mt-2 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              <span className="bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">INDIA</span>
              <span className="mx-2 text-3xl text-white/50 sm:mx-3 sm:text-5xl">vs</span>
              <span className="text-white">ENG</span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-white/80">
              <span className="font-semibold text-white">5th March, Thu</span>
              <span className="text-white/30">&bull;</span>
              <span>7:00 PM IST</span>
              <span className="text-white/30">&bull;</span>
              <span>Wankhede Stadium, Mumbai</span>
            </div>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
              Wankhede tickets sell out in <strong className="text-orange-300">minutes</strong>. Stop refreshing BookMyShow.
              Pay once, get an <strong className="text-white">instant email alert</strong> with a direct booking link the second tickets drop.
            </p>

            <div className="mt-5 hidden gap-3 text-xs sm:flex">
              {["Checks every 15 min", "Direct booking link", "Zero false alerts"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-white/80 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-2xl shadow-orange-200/40 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600">Ticket Alert</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-900">&#8377;999</span>
                  <span className="text-sm text-gray-400 line-through">&#8377;1999</span>
                </p>
              </div>
              <span className="rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Limited</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">One-time &middot; IND vs ENG &middot; Wankhede, Mumbai</p>

            <form onSubmit={pay} className="mt-4 space-y-2.5">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email — where we send the alert" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
              {events.length > 1 && (
                <select value={eventId} onChange={(e) => setEventId(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500">
                  {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.title} ({ev.city})</option>)}
                </select>
              )}
              <button type="submit" disabled={disabled} className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-orange-300/50 transition-all hover:from-orange-400 hover:to-orange-500 hover:shadow-orange-400/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none">
                {loading ? "Redirecting to Payment..." : "Pay ₹999 — Get Ticket Alert"}
              </button>
              <p className="text-center text-[10px] text-gray-400">Secure payment via Stripe &middot; Activates instantly</p>
            </form>

            {msg && (
              <p className={`animate-slide-up mt-3 rounded-lg border px-3 py-2 text-xs ${msgOk ? "border-green-300 bg-green-50 text-green-700" : "border-red-300 bg-red-50 text-red-700"}`}>
                {msg}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ Social proof strip ═══ */}
      <div className="border-b border-gray-100 bg-orange-50/60">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-3 text-center text-xs text-gray-500 sm:gap-10 sm:text-sm">
          <span><strong className="text-gray-900">150+</strong> alerts activated</span>
          <span className="text-gray-300">|</span>
          <span><strong className="text-gray-900">24x7</strong> monitoring</span>
          <span className="text-gray-300">|</span>
          <span><strong className="text-gray-900">&lt;10 sec</strong> alert delivery</span>
        </div>
      </div>

      {/* ═══ How it works ═══ */}
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            { n: "01", title: "Enter your email", desc: "Tell us where to send the booking alert." },
            { n: "02", title: "Pay ₹999 once", desc: "Instant activation. No subscriptions, no hidden fees." },
            { n: "03", title: "Get alerted first", desc: "Email with direct BookMyShow link the second tickets drop." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-3xl font-black text-orange-500/30">{s.n}</p>
              <p className="mt-2 text-base font-bold text-gray-900">{s.title}</p>
              <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Why */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-orange-50/40 p-6">
          <h2 className="text-xl font-bold text-gray-900">Why 1000+ cricket fans trust this</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Last T20 WC semifinal tickets sold out in under 10 minutes on BookMyShow",
              "We check BookMyShow every 15 minutes — you don't have to keep refreshing",
              "Alert email has a direct link so you can book seats instantly",
              "No false alarms — we only alert when booking is actually open, not 'coming soon'",
            ].map((t) => (
              <div key={t} className="flex gap-3 rounded-xl bg-white p-3.5 shadow-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] text-orange-600">&#10003;</span>
                <p className="text-sm text-gray-600">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Questions? We got you.</h2>
          <div className="mt-4 space-y-3">
            {[
              { q: "When will tickets go live?", a: "Nobody knows the exact time — that's exactly why this service exists. We check 24x7 so you don't have to." },
              { q: "What if tickets are already sold out?", a: "We'll email you a sold-out notification immediately so you know to stop waiting." },
              { q: "Is my payment safe?", a: "100%. Payments are processed by Stripe. We never see your card details." },
              { q: "Can I get a refund?", a: "If the match is cancelled or tickets never go live on BookMyShow, yes — full refund, no questions." },
            ].map((f) => (
              <div key={f.q} className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-orange-700">{f.q}</p>
                <p className="mt-1 text-sm text-gray-500">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-14 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100/60 p-6 text-center shadow-sm">
          <p className="text-2xl font-black text-gray-900 sm:text-3xl">Don&#39;t miss the match of the decade.</p>
          <p className="mt-2 text-sm text-gray-600">India vs England. Wankhede. 5th March. You know you want to be there.</p>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-4 inline-block rounded-lg bg-orange-500 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-orange-200 transition hover:bg-orange-400">
            Get Your Alert — ₹999
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-6 text-center text-xs text-gray-400">
        <p>SemiMatch is not affiliated with BookMyShow, ICC, BCCI, or ECB. Independent alert service.</p>
        <p className="mt-1">Questions? <a href="mailto:semif674@gmail.com" className="text-orange-500 hover:underline">semif674@gmail.com</a></p>
      </footer>
    </main>
  );
}
