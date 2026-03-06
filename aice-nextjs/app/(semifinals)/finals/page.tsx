"use client";

import Image from "next/image";
import { useState } from "react";

const TOPMATE_LINK = "https://topmate.io/ajinkya_hazare/1990750";
const WHATSAPP_LINK = "https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20question%20about%20the%20Finals%20ticket%20alert";

export default function FinalsPage() {
  const [showEmailPreview, setShowEmailPreview] = useState(false);

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

            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">ICC T20 World Cup 2026 &middot; Final</p>

            <h1 className="mt-2 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              <span className="bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">INDIA</span>
              <span className="mx-2 text-3xl text-white/50 sm:mx-3 sm:text-5xl">vs</span>
              <span className="text-white">???</span>
            </h1>
            <p className="mt-1 text-xs text-white/40">Opponent TBD after semi-finals</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-white/80">
              <span className="font-semibold text-white">9th March, Sun</span>
              <span className="text-white/30">&bull;</span>
              <span>7:00 PM IST</span>
              <span className="text-white/30">&bull;</span>
              <span>Venue TBD</span>
            </div>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
              World Cup Final tickets sell out in <strong className="text-orange-300">seconds</strong>. Stop refreshing BookMyShow.
              Pay once, get an <strong className="text-white">instant email + WhatsApp alert</strong> with a direct booking link the moment tickets drop.
            </p>

            <div className="mt-5 hidden gap-3 text-xs sm:flex">
              {["Checks every 5 min", "Direct booking link", "Pay via UPI"].map((t) => (
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
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600">Finals Ticket Alert</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-900">&#8377;99</span>
                  <span className="text-sm text-gray-400 line-through">&#8377;499</span>
                </p>
              </div>
              <span className="rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white animate-pulse">Limited Spots</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">One-time &middot; T20 World Cup Final &middot; India</p>

            {/* UPI badge */}
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
              <span className="text-lg">📱</span>
              <div>
                <p className="text-xs font-semibold text-green-800">Pay via GPay, PhonePe, Paytm or any UPI</p>
                <p className="text-[10px] text-green-600">Secure payment via Topmate &middot; No card needed</p>
              </div>
            </div>

            <a
              href={TOPMATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3.5 text-center text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-orange-300/50 transition-all hover:from-orange-400 hover:to-orange-500 hover:shadow-orange-400/50 active:scale-[0.98]"
            >
              Pay ₹99 via UPI — Get Ticket Alert
            </a>
            <p className="mt-2 text-center text-[10px] text-gray-400">Activates instantly &middot; 100% refund if match cancelled</p>

            {/* Trust badges */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { icon: "🔒", label: "Secure Payment" },
                { icon: "⚡", label: "Instant Alert" },
                { icon: "💸", label: "Money-back" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center rounded-lg bg-gray-50 px-2 py-2">
                  <span className="text-base">{b.icon}</span>
                  <span className="mt-0.5 text-[9px] font-medium text-gray-500">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Social proof strip ═══ */}
      <div className="border-b border-gray-100 bg-orange-50/60">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-3 text-center text-xs text-gray-500 sm:gap-10 sm:text-sm">
          <span><strong className="text-gray-900">200+</strong> alerts activated</span>
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
            { n: "01", title: "Pay ₹99 via UPI", desc: "GPay, PhonePe, Paytm — any UPI app. Takes 10 seconds." },
            { n: "02", title: "We monitor 24x7", desc: "Our bot checks BookMyShow every 5 minutes. You relax." },
            { n: "03", title: "Get alerted first", desc: "Email with direct BookMyShow link the second tickets drop." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-3xl font-black text-orange-500/30">{s.n}</p>
              <p className="mt-2 text-base font-bold text-gray-900">{s.title}</p>
              <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* ═══ Email Preview ═══ */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Here&apos;s exactly what you&apos;ll get</h2>
            <button
              onClick={() => setShowEmailPreview(!showEmailPreview)}
              className="text-sm font-semibold text-orange-500 hover:text-orange-400"
            >
              {showEmailPreview ? "Hide preview" : "See sample alert"}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">An email like this hits your inbox the instant tickets go live:</p>

          {showEmailPreview && (
            <div className="mt-4 animate-slide-up overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              {/* Email header */}
              <div className="border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">S</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">SemiMatch Alerts</p>
                    <p className="text-xs text-gray-400">semif674@gmail.com</p>
                  </div>
                </div>
                <p className="mt-2 text-sm font-bold text-gray-900">🚨 TICKETS LIVE: T20 World Cup Final — BOOK NOW!</p>
              </div>
              {/* Email body */}
              <div className="px-4 py-5 text-center">
                <p className="text-2xl font-black text-red-600">Tickets Are LIVE!</p>
                <p className="mt-2 text-base font-semibold text-gray-700">T20 World Cup 2026 — Final</p>
                <p className="mt-1 text-sm text-gray-500">Tickets are available on BookMyShow right now.</p>
                <div className="mt-4 inline-block rounded-lg bg-red-600 px-8 py-3 text-sm font-bold text-white shadow-md">BOOK NOW</div>
                <p className="mt-4 text-xs text-gray-400">Automated alert from SemiMatch</p>
              </div>
            </div>
          )}

          {!showEmailPreview && (
            <div className="mt-4 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-8">
              <button
                onClick={() => setShowEmailPreview(true)}
                className="flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400"
              >
                <span className="text-lg">📧</span>
                Click to see sample alert email
              </button>
            </div>
          )}
        </div>

        {/* Why */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-orange-50/40 p-6">
          <h2 className="text-xl font-bold text-gray-900">Why 200+ cricket fans trust this</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Semi-final tickets sold out in under 5 minutes on BookMyShow — Finals will be worse",
              "We check BookMyShow every 5 minutes — you don't have to keep refreshing",
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
              { q: "How do I pay?", a: "Via UPI — GPay, PhonePe, Paytm, or any UPI app. No card required. Payment is processed securely by Topmate." },
              { q: "When will tickets go live?", a: "Nobody knows the exact time — that's exactly why this service exists. We check 24x7 so you don't have to." },
              { q: "What if tickets are already sold out?", a: "We'll email you a sold-out notification immediately so you know to stop waiting." },
              { q: "Can I get a refund?", a: "If the match is cancelled or tickets never go live on BookMyShow — full refund, no questions asked." },
              { q: "Is this legit?", a: "Yes. We ran the same service for the Semi Finals. This is an independent alert service — we just notify you faster than you can refresh." },
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
          <p className="text-2xl font-black text-gray-900 sm:text-3xl">The World Cup Final. In India. You know you want to be there.</p>
          <p className="mt-2 text-sm text-gray-600">Don&apos;t miss it because you were 2 minutes late to BookMyShow.</p>
          <a
            href={TOPMATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg bg-orange-500 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-orange-200 transition hover:bg-orange-400"
          >
            Get Alert — ₹99 via UPI
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-6 text-center text-xs text-gray-400">
        <p>SemiMatch is not affiliated with BookMyShow, ICC, or BCCI. Independent alert service.</p>
        <p className="mt-1">Questions? <a href="mailto:semif674@gmail.com" className="text-orange-500 hover:underline">semif674@gmail.com</a></p>
      </footer>

      {/* ═══ Floating WhatsApp Button ═══ */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg shadow-green-300/50 transition-transform hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </main>
  );
}
