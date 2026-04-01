'use client';

import { useState, useEffect, useRef } from 'react';

function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('hcp-visible'); }); },
            { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );
        document.querySelectorAll('.hcp-reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

function CountUp({ value }: { value: number }) {
    const [display, setDisplay] = useState(value);
    const prev = useRef(value);
    useEffect(() => {
        const from = prev.current;
        prev.current = value;
        if (from === value) return;
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - start) / 280, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(from + (value - from) * e));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [value]);
    return <>{display.toLocaleString('en-IN')}</>;
}

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="hcp-faq-item">
            <button className={`hcp-faq-q${open ? ' open' : ''}`} onClick={() => setOpen(v => !v)}>
                <span>{q}</span>
                <span className="hcp-faq-icon">{open ? '−' : '+'}</span>
            </button>
            <div className={`hcp-faq-a${open ? ' open' : ''}`}>
                <div className="hcp-faq-body">{a}</div>
            </div>
        </div>
    );
}

const CHECK = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const X_ICON = (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const WA_ICON = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const STD_MONTHLY = 4999;
const PRO_MONTHLY = 6999;

function getCampaigns(p: number) {
    if (p <= 200) return 1;
    if (p <= 1000) return 2;
    if (p <= 2000) return 3;
    return 4;
}

export default function PricingPage() {
    useScrollReveal();
    const [patients, setPatients] = useState(500);
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
    const [plan, setPlan] = useState<'standard' | 'pro'>('standard');

    const campaigns = getCampaigns(patients);
    const mktgTotal = campaigns * patients * 1.20;
    const utilTotal = patients * 0.18;
    const stdFee = billing === 'annual' ? Math.round(STD_MONTHLY * 0.85) : STD_MONTHLY;
    const proFee = billing === 'annual' ? Math.round(PRO_MONTHLY * 0.85) : PRO_MONTHLY;
    const fee = plan === 'standard' ? stdFee : proFee;
    const total = fee + mktgTotal + utilTotal;

    return (
        <main>
            <style>{`
.hcp-page { background: var(--color-bg); }
.hcp-wrap { max-width: 920px; margin: 0 auto; padding: 0 24px; }

/* HERO */
.hcp-hero {
    padding: 120px 0 36px;
    background: linear-gradient(180deg, #EBF5FF 0%, var(--color-bg) 100%);
    border-bottom: 1px solid var(--color-gray-100);
    text-align: center;
}
.hcp-hero-pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase;
    color: var(--color-accent-blue);
    background: rgba(59,130,246,0.07); border: 1px solid rgba(59,130,246,0.18);
    padding: 5px 14px; border-radius: 999px; margin-bottom: 18px;
}
.hcp-hero h1 {
    font-size: clamp(28px, 4.5vw, 44px); font-weight: 700;
    color: var(--color-text); letter-spacing: -0.03em; line-height: 1.15;
    margin-bottom: 10px;
}
.hcp-hero h1 em { font-style: normal; color: var(--color-accent-blue); }
.hcp-hero-sub {
    font-size: 15px; color: var(--color-text-muted);
    max-width: 440px; margin: 0 auto 24px; line-height: 1.6;
}

/* TOGGLE */
.hcp-toggle {
    display: inline-flex;
    background: var(--color-white); border: 1px solid var(--color-gray-200);
    border-radius: 10px; padding: 3px; gap: 2px;
}
.hcp-toggle-btn {
    padding: 7px 20px; font-size: 13px; font-weight: 500;
    color: var(--color-text-muted); border-radius: 7px;
    background: transparent; border: none; cursor: pointer;
    transition: all 0.18s; font-family: var(--font-primary); white-space: nowrap;
}
.hcp-toggle-btn.active { background: var(--color-accent-blue); color: #fff; }
.hcp-save-tag {
    display: inline-flex; align-items: center;
    background: #dcfce7; color: #16a34a;
    font-size: 10px; font-weight: 700; padding: 2px 7px;
    border-radius: 999px; margin-left: 5px; letter-spacing: 0.04em;
}

/* SLIDER */
.hcp-slider-card {
    background: var(--color-white); border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-2xl); padding: 28px 32px;
    margin-top: 28px; box-shadow: var(--shadow-sm);
}
.hcp-slider-top {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 16px; gap: 12px; flex-wrap: wrap;
}
.hcp-pt-num {
    font-size: 44px; font-weight: 700; color: var(--color-text);
    letter-spacing: -0.04em; line-height: 1;
}
.hcp-pt-num span { font-size: 16px; font-weight: 400; color: var(--color-text-muted); margin-left: 5px; }
.hcp-slider-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.hcp-chip {
    font-size: 12px; font-weight: 500; color: var(--color-text-secondary);
    background: var(--color-gray-50); border: 1px solid var(--color-gray-200);
    padding: 4px 12px; border-radius: 999px;
}
.hcp-chip strong { color: var(--color-accent-blue); }
input[type=range].hcp-range {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 3px; background: var(--color-gray-200);
    border-radius: 2px; outline: none; cursor: pointer; margin-bottom: 8px;
}
input[type=range].hcp-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px; height: 20px; background: var(--color-accent-blue);
    border-radius: 50%; border: 3px solid #fff;
    box-shadow: 0 0 0 2px var(--color-accent-blue);
    transition: transform 0.15s;
}
input[type=range].hcp-range::-webkit-slider-thumb:hover { transform: scale(1.15); }
.hcp-ticks {
    display: flex; justify-content: space-between;
    font-size: 11px; color: var(--color-gray-400);
}

/* PLAN CARDS */
.hcp-plans { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px; }
.hcp-plan {
    background: var(--color-white); border: 1.5px solid var(--color-gray-200);
    border-radius: var(--radius-2xl); padding: 28px; position: relative;
    cursor: pointer; transition: all 0.2s;
}
.hcp-plan:hover { border-color: var(--color-gray-300); box-shadow: var(--shadow-md); }
.hcp-plan.sel { border-color: var(--color-accent-blue); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
.hcp-plan.feat {
    background: linear-gradient(145deg, #fff 0%, #EBF5FF 100%);
    border-color: var(--color-accent-blue);
    box-shadow: 0 6px 24px rgba(59,130,246,0.1);
}
.hcp-plan.feat.sel { box-shadow: 0 0 0 3px rgba(59,130,246,0.18), 0 8px 32px rgba(59,130,246,0.12); }
.hcp-plan-badge {
    position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
    background: var(--color-accent-blue); color: #fff;
    font-size: 10px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase;
    padding: 3px 14px; border-radius: 0 0 9px 9px; white-space: nowrap;
}
.hcp-sel-dot {
    position: absolute; top: 13px; right: 13px;
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid var(--color-gray-300); background: #fff;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s;
}
.hcp-plan.sel .hcp-sel-dot { border-color: var(--color-accent-blue); background: var(--color-accent-blue); color: #fff; }
.hcp-plan-label { font-size: 11px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 8px; }
.hcp-plan-price { font-size: 38px; font-weight: 700; color: var(--color-text); letter-spacing: -0.04em; line-height: 1; }
.hcp-plan-price span { font-size: 14px; font-weight: 400; color: var(--color-text-muted); letter-spacing: 0; }
.hcp-plan-cycle { font-size: 11px; color: var(--color-text-muted); margin-bottom: 16px; }
.hcp-plan-desc { font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 18px; }
.hcp-plan-hr { height: 1px; background: var(--color-gray-100); margin-bottom: 16px; }
.hcp-feats { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.hcp-feats li { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--color-text-secondary); line-height: 1.4; }
.hcp-ck { color: #16a34a; flex-shrink: 0; margin-top: 1px; }
.hcp-xk { color: var(--color-gray-300); flex-shrink: 0; margin-top: 1px; }
.hcp-feats li.dim { color: var(--color-gray-400); }

/* SECTION HEADER */
.hcp-sh { margin-bottom: 20px; }
.hcp-sh h2 { font-size: clamp(20px, 2.8vw, 26px); font-weight: 700; color: var(--color-text); letter-spacing: -0.025em; margin-bottom: 4px; }
.hcp-sh p { font-size: 13px; color: var(--color-text-muted); }

/* META GRID */
.hcp-meta { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
.hcp-mc {
    background: var(--color-white); border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-xl); padding: 20px 22px;
}
.hcp-mc.free { border-color: rgba(22,163,74,0.22); background: rgba(22,163,74,0.025); }
.hcp-mc-type { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 7px; }
.hcp-mc-rate { font-size: 22px; font-weight: 700; color: var(--color-text); letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
.hcp-mc.free .hcp-mc-rate { color: #16a34a; }
.hcp-mc-calc { font-size: 11px; font-weight: 500; color: var(--color-accent-blue); margin-bottom: 5px; font-family: 'Courier New', monospace; }
.hcp-mc.free .hcp-mc-calc { color: #16a34a; }
.hcp-mc-desc { font-size: 12px; color: var(--color-text-muted); line-height: 1.45; }

/* TOTAL */
.hcp-total {
    background: var(--color-white); border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-2xl); padding: 32px 36px;
    box-shadow: var(--shadow-sm); position: relative; overflow: hidden;
}
.hcp-total::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--color-accent-blue), #93c5fd, var(--color-accent-blue));
}
.hcp-plan-tabs { display: flex; gap: 8px; margin-bottom: 22px; }
.hcp-ptab {
    flex: 1; padding: 8px 10px; font-size: 12px; font-weight: 500;
    border-radius: 8px; border: 1px solid var(--color-gray-200);
    background: var(--color-bg); color: var(--color-text-muted);
    cursor: pointer; transition: all 0.18s; font-family: var(--font-primary); text-align: center;
}
.hcp-ptab.active { background: var(--color-accent-blue); color: #fff; border-color: var(--color-accent-blue); }
.hcp-tr {
    display: flex; justify-content: space-between; align-items: center;
    padding: 11px 0; border-bottom: 1px solid var(--color-gray-100); gap: 12px;
}
.hcp-tr:last-of-type { border-bottom: none; }
.hcp-trl { font-size: 13px; color: var(--color-text-secondary); }
.hcp-trl strong { display: block; font-size: 13px; font-weight: 500; color: var(--color-text); }
.hcp-trv { font-size: 14px; font-weight: 600; color: var(--color-text); white-space: nowrap; }
.hcp-trv.blue { color: var(--color-accent-blue); }
.hcp-trv.green { color: #16a34a; font-size: 12px; font-weight: 500; }
.hcp-total-sum {
    display: flex; justify-content: space-between; align-items: baseline;
    padding-top: 18px; margin-top: 8px; border-top: 2px solid var(--color-gray-100);
}
.hcp-sum-label { font-size: 14px; font-weight: 600; color: var(--color-text); }
.hcp-sum-val { font-size: 34px; font-weight: 700; color: var(--color-accent-blue); letter-spacing: -0.04em; }
.hcp-sum-val small { font-size: 14px; font-weight: 400; color: var(--color-text-muted); letter-spacing: 0; }
.hcp-total-note { margin-top: 10px; font-size: 12px; color: var(--color-text-muted); }

/* TABLE */
.hcp-tbl-wrap { overflow-x: auto; border-radius: var(--radius-xl); border: 1px solid var(--color-gray-200); }
table.hcp-tbl { width: 100%; border-collapse: collapse; background: var(--color-white); min-width: 560px; }
.hcp-tbl th {
    font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--color-text-muted); padding: 12px 14px;
    border-bottom: 1px solid var(--color-gray-100);
    text-align: left; background: var(--color-gray-50);
}
.hcp-tbl th:not(:first-child) { text-align: center; }
.hcp-tbl td { padding: 11px 14px; font-size: 13px; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-gray-100); }
.hcp-tbl td:not(:first-child) { text-align: center; }
.hcp-tbl td:first-child { font-weight: 500; color: var(--color-text); }
.hcp-tbl tr:last-child td { border-bottom: none; }
.hcp-tbl tr:hover td { background: var(--color-gray-50); }
.hcp-tbl .hsr td {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--color-text-muted); padding: 14px 14px 6px; background: var(--color-bg);
}
.tc-y { color: #16a34a !important; font-weight: 600; }
.tc-n { color: var(--color-gray-300) !important; }
.tc-b { color: var(--color-accent-blue) !important; font-weight: 600; }
.tc-m { color: var(--color-text-muted) !important; }

/* FAQ */
.hcp-faq-item { border-bottom: 1px solid var(--color-gray-100); }
.hcp-faq-q {
    width: 100%; display: flex; justify-content: space-between; align-items: center;
    gap: 12px; padding: 16px 0; font-size: 14px; font-weight: 500;
    color: var(--color-text); background: transparent; border: none;
    cursor: pointer; text-align: left; transition: color 0.18s; font-family: var(--font-primary);
}
.hcp-faq-q:hover, .hcp-faq-q.open { color: var(--color-accent-blue); }
.hcp-faq-icon { font-size: 20px; font-weight: 300; color: var(--color-text-muted); flex-shrink: 0; line-height: 1; }
.hcp-faq-q.open .hcp-faq-icon { color: var(--color-accent-blue); }
.hcp-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.32s ease; }
.hcp-faq-a.open { max-height: 300px; }
.hcp-faq-body { font-size: 13px; color: var(--color-text-secondary); line-height: 1.7; padding-bottom: 16px; }
.hcp-faq-body strong { color: var(--color-text); font-weight: 500; }

/* CTA */
.hcp-cta {
    background: var(--color-gray-900); border-radius: var(--radius-2xl);
    padding: 48px 40px; text-align: center; margin-bottom: 64px;
    position: relative; overflow: hidden;
}
.hcp-cta::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent);
}
.hcp-cta h3 { font-size: clamp(22px, 3vw, 30px); font-weight: 700; color: #fff; letter-spacing: -0.025em; margin-bottom: 8px; }
.hcp-cta p { font-size: 14px; color: var(--color-gray-400); margin-bottom: 28px; line-height: 1.6; }
.hcp-wa-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: #25D366; color: #fff; padding: 13px 26px;
    border-radius: 9px; font-size: 14px; font-weight: 500;
    text-decoration: none; transition: all 0.18s;
}
.hcp-wa-btn:hover { background: #1fba5a; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.3); }

/* DIVIDER */
.hcp-div { height: 1px; background: var(--color-gray-100); }

/* SECTION PAD */
.hcp-sec { padding: 48px 0; }

/* REVEAL */
.hcp-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.55s ease, transform 0.55s ease; }
.hcp-visible { opacity: 1; transform: translateY(0); }

/* ANNUAL NOTICE */
.hcp-ann-note {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    font-size: 12px; font-weight: 500; color: #16a34a;
    background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;
    padding: 9px 16px; margin-top: 12px;
}

@media (max-width: 640px) {
    .hcp-plans { grid-template-columns: 1fr; }
    .hcp-meta { grid-template-columns: 1fr; }
    .hcp-total { padding: 24px 18px; }
    .hcp-slider-card { padding: 22px 18px; }
    .hcp-cta { padding: 36px 22px; }
    .hcp-slider-top { flex-direction: column; align-items: flex-start; gap: 6px; }
    .hcp-hero { padding: 110px 0 28px; }
}
            `}</style>

            <div className="hcp-page">

                {/* HERO */}
                <section className="hcp-hero">
                    <div className="hcp-wrap">
                        <h1>Know Exactly What<br />You'll Pay. <em>Always.</em></h1>
                        <p className="hcp-hero-sub">
                            Pick a plan, set your patient volume, and see your exact monthly cost — no hidden fees.
                        </p>
                        <div className="hcp-toggle">
                            <button className={`hcp-toggle-btn${billing === 'monthly' ? ' active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</button>
                            <button className={`hcp-toggle-btn${billing === 'annual' ? ' active' : ''}`} onClick={() => setBilling('annual')}>
                                Annual <span className="hcp-save-tag">Save 15%</span>
                            </button>
                        </div>
                        {billing === 'annual' && (
                            <div className="hcp-ann-note">
                                ✓ Annual saves ₹{(STD_MONTHLY * 0.15 * 12).toLocaleString('en-IN')}–₹{(PRO_MONTHLY * 0.15 * 12).toLocaleString('en-IN')} / year
                            </div>
                        )}
                    </div>
                </section>

                <div className="hcp-wrap">

                    {/* PLAN CARDS */}
                    <div className="hcp-plans hcp-reveal">

                        {/* Standard */}
                        <div className={`hcp-plan${plan === 'standard' ? ' sel' : ''}`} onClick={() => setPlan('standard')}>
                            <div className={`hcp-sel-dot`}>{plan === 'standard' && CHECK}</div>
                            <div className="hcp-plan-label">Standard</div>
                            <div className="hcp-plan-price">₹<CountUp value={stdFee} /><span> /mo</span></div>
                            <div className="hcp-plan-cycle">{billing === 'annual' ? 'billed annually · ' : ''}+ GST</div>
                            <p className="hcp-plan-desc">Full workflow automation. No AI features.</p>
                            <div className="hcp-plan-hr" />
                            <ul className="hcp-feats">
                                <li><span className="hcp-ck">{CHECK}</span>Lead CRM (Instagram, FB, YouTube)</li>
                                <li><span className="hcp-ck">{CHECK}</span>Patient records &amp; EHR (unlimited)</li>
                                <li><span className="hcp-ck">{CHECK}</span>WhatsApp appointment booking</li>
                                <li><span className="hcp-ck">{CHECK}</span>Auto reminders · 24hr + 2hr</li>
                                <li><span className="hcp-ck">{CHECK}</span>Consent forms + digital signatures</li>
                                <li><span className="hcp-ck">{CHECK}</span>Prescriptions via WhatsApp</li>
                                <li><span className="hcp-ck">{CHECK}</span>Billing + loyalty points</li>
                                <li><span className="hcp-ck">{CHECK}</span>Unlimited broadcast lists</li>
                                <li className="dim"><span className="hcp-xk">{X_ICON}</span>AI lead scoring</li>
                                <li className="dim"><span className="hcp-xk">{X_ICON}</span>Smart reply suggestions</li>
                                <li className="dim"><span className="hcp-xk">{X_ICON}</span>Automated FAQ bot</li>
                            </ul>
                        </div>

                        {/* Pro */}
                        <div className={`hcp-plan feat${plan === 'pro' ? ' sel' : ''}`} onClick={() => setPlan('pro')}>
                            <div className="hcp-plan-badge">Recommended</div>
                            <div className="hcp-sel-dot">{plan === 'pro' && CHECK}</div>
                            <div className="hcp-plan-label">Pro · with AI</div>
                            <div className="hcp-plan-price">₹<CountUp value={proFee} /><span> /mo</span></div>
                            <div className="hcp-plan-cycle">{billing === 'annual' ? 'billed annually · ' : ''}+ GST</div>
                            <p className="hcp-plan-desc">Everything in Standard + AI that qualifies leads and automates replies.</p>
                            <div className="hcp-plan-hr" />
                            <ul className="hcp-feats">
                                <li><span className="hcp-ck">{CHECK}</span>Everything in Standard</li>
                                <li><span className="hcp-ck">{CHECK}</span>AI lead scoring &amp; qualification</li>
                                <li><span className="hcp-ck">{CHECK}</span>Smart reply suggestions for staff</li>
                                <li><span className="hcp-ck">{CHECK}</span>Automated FAQ on WhatsApp</li>
                                <li><span className="hcp-ck">{CHECK}</span>AI follow-up message drafts</li>
                                <li><span className="hcp-ck">{CHECK}</span>Priority support · &lt;4hr WhatsApp</li>
                            </ul>
                        </div>

                    </div>

                    {/* SLIDER */}
                    <div className="hcp-slider-card hcp-reveal" style={{marginTop: 32}}>
                        <div className="hcp-slider-top">
                            <div className="hcp-pt-num">
                                <CountUp value={patients} /><span>patients / mo</span>
                            </div>
                            <div className="hcp-slider-chips">
                                <span className="hcp-chip"><strong>{campaigns}</strong> campaign{campaigns > 1 ? 's' : ''} / mo</span>
                                <span className="hcp-chip">Blast size <strong>{patients.toLocaleString('en-IN')}</strong></span>
                            </div>
                        </div>
                        <input type="range" className="hcp-range" min={50} max={3000} step={50} value={patients} onChange={e => setPatients(Number(e.target.value))} />
                        <div className="hcp-ticks"><span>50</span><span>500</span><span>1,000</span><span>2,000</span><span>3,000+</span></div>
                    </div>

                    {/* WHATSAPP COSTS */}
                    <section className="hcp-sec hcp-reveal">
                        <div className="hcp-sh">
                            <h2>WhatsApp Message Costs</h2>
                            <p>Meta's charges, passed through at cost. Billed separately from your platform fee.</p>
                        </div>
                        <div className="hcp-meta">
                            <div className="hcp-mc">
                                <div className="hcp-mc-type">Marketing</div>
                                <div className="hcp-mc-rate">₹1.20<span style={{fontSize:13,color:'var(--color-text-muted)',fontWeight:400}}> /msg</span></div>
                                <div className="hcp-mc-calc">{patients.toLocaleString('en-IN')} × ₹1.20 = ₹{(patients*1.20).toLocaleString('en-IN',{maximumFractionDigits:0})} / blast</div>
                                <div className="hcp-mc-desc">Campaigns, promotions, re-engagement.</div>
                            </div>
                            <div className="hcp-mc">
                                <div className="hcp-mc-type">Utility (reminders)</div>
                                <div className="hcp-mc-rate">₹0.18<span style={{fontSize:13,color:'var(--color-text-muted)',fontWeight:400}}> /msg</span></div>
                                <div className="hcp-mc-calc">{patients.toLocaleString('en-IN')} × ₹0.18 = ₹{Math.round(utilTotal).toLocaleString('en-IN')} / mo</div>
                                <div className="hcp-mc-desc">Appointment reminders, prescriptions, receipts.</div>
                            </div>
                            <div className="hcp-mc free">
                                <div className="hcp-mc-type">Service Replies</div>
                                <div className="hcp-mc-rate">Free</div>
                                <div className="hcp-mc-calc">Patient messages first → 24hr window</div>
                                <div className="hcp-mc-desc">Unlimited replies when the patient initiates.</div>
                            </div>
                            <div className="hcp-mc free">
                                <div className="hcp-mc-type">Ad-Entry (IG / FB Ads)</div>
                                <div className="hcp-mc-rate">Free · 72 hrs</div>
                                <div className="hcp-mc-calc">Lead clicks ad → messages you</div>
                                <div className="hcp-mc-desc">Full 72-hour conversation window at zero cost.</div>
                            </div>
                        </div>
                    </section>

                    <div className="hcp-div" />

                    {/* TOTAL */}
                    <section className="hcp-sec hcp-reveal">
                        <div className="hcp-sh">
                            <h2>Your Estimated Monthly Total</h2>
                            <p>All figures exclude GST. Click a plan to switch.</p>
                        </div>
                        <div className="hcp-total">
                            <div className="hcp-plan-tabs">
                                <button className={`hcp-ptab${plan === 'standard' ? ' active' : ''}`} onClick={() => setPlan('standard')}>Standard — ₹{stdFee.toLocaleString('en-IN')}/mo</button>
                                <button className={`hcp-ptab${plan === 'pro' ? ' active' : ''}`} onClick={() => setPlan('pro')}>Pro (AI) — ₹{proFee.toLocaleString('en-IN')}/mo</button>
                            </div>
                            <div className="hcp-tr">
                                <div className="hcp-trl"><strong>{plan === 'standard' ? 'Standard' : 'Pro'} Platform Fee</strong>Monthly subscription</div>
                                <div className="hcp-trv blue">₹<CountUp value={fee} /></div>
                            </div>
                            <div className="hcp-tr">
                                <div className="hcp-trl"><strong>Marketing campaigns ({campaigns} blast{campaigns>1?'s':''} × {patients.toLocaleString('en-IN')} patients)</strong>₹1.20 / msg</div>
                                <div className="hcp-trv">₹<CountUp value={Math.round(mktgTotal)} /></div>
                            </div>
                            <div className="hcp-tr">
                                <div className="hcp-trl"><strong>Utility messages (reminders)</strong>₹0.18 / msg × {patients.toLocaleString('en-IN')} patients</div>
                                <div className="hcp-trv">₹<CountUp value={Math.round(utilTotal)} /></div>
                            </div>
                            <div className="hcp-tr">
                                <div className="hcp-trl"><strong>Service replies + Ad-entry leads</strong>Patient-initiated &amp; ad clicks</div>
                                <div className="hcp-trv green">₹0 · Free</div>
                            </div>
                            <div className="hcp-tr">
                                <div className="hcp-trl"><strong>Setup &amp; onboarding</strong>One-time (normally ₹10,000)</div>
                                <div className="hcp-trv green">Waived</div>
                            </div>
                            <div className="hcp-total-sum">
                                <div className="hcp-sum-label">Estimated monthly total</div>
                                <div className="hcp-sum-val">₹<CountUp value={Math.round(total)} /><small> /mo + GST</small></div>
                            </div>
                            <div className="hcp-total-note">✓ No long-term contracts &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; 2-week free trial</div>
                        </div>
                    </section>

                    <div className="hcp-div" />

                    {/* COMPARISON TABLE */}
                    <section className="hcp-sec hcp-reveal">
                        <div className="hcp-sh">
                            <h2>How TopDoc Compares</h2>
                            <p>vs. the alternatives you may already be using.</p>
                        </div>
                        <div className="hcp-tbl-wrap">
                            <table className="hcp-tbl">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>TopDoc Std</th>
                                        <th>TopDoc Pro</th>
                                        <th>Practo Ray</th>
                                        <th>HealthPlix</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hsr"><td colSpan={5}>Core</td></tr>
                                    <tr><td>Patient records &amp; EHR</td><td className="tc-y">✓</td><td className="tc-y">✓</td><td className="tc-y">✓</td><td className="tc-y">✓</td></tr>
                                    <tr><td>WhatsApp-native workflow</td><td className="tc-y">✓ Native</td><td className="tc-y">✓ Native</td><td className="tc-n">✗</td><td className="tc-n">✗</td></tr>
                                    <tr><td>Lead capture (IG / FB ads)</td><td className="tc-y">✓</td><td className="tc-y">✓</td><td className="tc-n">✗</td><td className="tc-n">✗</td></tr>
                                    <tr className="hsr"><td colSpan={5}>Campaigns</td></tr>
                                    <tr><td>Broadcast campaigns</td><td className="tc-y">✓ Unlimited</td><td className="tc-y">✓ Unlimited</td><td className="tc-m">Limited</td><td className="tc-m">Limited</td></tr>
                                    <tr><td>Patient segment targeting</td><td className="tc-y">✓</td><td className="tc-y">✓</td><td className="tc-n">✗</td><td className="tc-n">✗</td></tr>
                                    <tr><td>Free 72-hr ad-lead messaging</td><td className="tc-y">✓</td><td className="tc-y">✓</td><td className="tc-n">✗</td><td className="tc-n">✗</td></tr>
                                    <tr className="hsr"><td colSpan={5}>AI</td></tr>
                                    <tr><td>AI lead scoring + FAQ bot</td><td className="tc-n">✗</td><td className="tc-y">✓</td><td className="tc-n">✗</td><td className="tc-n">✗</td></tr>
                                    <tr className="hsr"><td colSpan={5}>Data &amp; Trust</td></tr>
                                    <tr><td>Data stays with your clinic</td><td className="tc-y">✓ Guaranteed</td><td className="tc-y">✓ Guaranteed</td><td className="tc-n">No — pharma ToS</td><td className="tc-n">No — shared infra</td></tr>
                                    <tr><td>No competitor ads on your page</td><td className="tc-y">✓</td><td className="tc-y">✓</td><td className="tc-n">Shows competitors</td><td className="tc-m">N/A</td></tr>
                                    <tr className="hsr"><td colSpan={5}>Pricing</td></tr>
                                    <tr><td>Monthly fee</td><td className="tc-b">₹4,999/mo</td><td className="tc-b">₹6,999/mo</td><td className="tc-m">₹2k–6k/mo</td><td className="tc-m">₹1k/mo (₹12k/yr)</td></tr>
                                    <tr><td>Annual contract required</td><td className="tc-y">No</td><td className="tc-y">No</td><td className="tc-n">Yes</td><td className="tc-n">Yes</td></tr>
                                    <tr><td>Setup fee</td><td className="tc-y">Waived</td><td className="tc-y">Waived</td><td className="tc-m">₹5k–10k</td><td className="tc-m">₹3k–8k</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div className="hcp-div" />

                    {/* FAQ */}
                    <section className="hcp-sec hcp-reveal">
                        <div className="hcp-sh"><h2>Quick Answers</h2></div>
                        <FaqItem q="Are WhatsApp costs included in the platform fee?"
                            a={<>No — intentionally. Platform fee is fixed; WhatsApp costs vary by what you actually send. You only pay for campaigns you run. The calculator above combines both.</>} />
                        <FaqItem q="Can I create multiple lists for different patient types?"
                            a={<>Yes, unlimited lists — acne, hair loss, VIP, unconverted leads, post-treatment, etc. <strong>You're charged only for messages sent</strong>, not for maintaining lists.</>} />
                        <FaqItem q="Is appointment booking fully automated?"
                            a={<>Yes. Patients tap a WhatsApp button, pick a slot, and it's confirmed automatically. Reminders fire at 24hr and 2hr. No manual intervention needed.</>} />
                        <FaqItem q="What happens to my data if I leave?"
                            a={<><strong>You own it, always.</strong> Full export (CSV/JSON) within 30 days. Verified server deletion with confirmation. We have zero financial incentive to retain your data.</>} />
                        <FaqItem q="Is there a lock-in contract?"
                            a={<>No. Both plans are month-to-month. Annual plan saves 15% with a prorated refund if you cancel. We earn renewal by being useful, not by contracts.</>} />
                        <FaqItem q="How long does onboarding take?"
                            a={<>3–5 working days. We handle WhatsApp API activation, Meta template approvals, data import, and staff training. Setup fee (₹10,000) is waived entirely.</>} />
                    </section>

                    {/* CTA */}
                    <div className="hcp-cta hcp-reveal">
                        <h3>Ready to Go Live?</h3>
                        <p>Setup takes 3–5 days. First campaign within the same week.</p>
                        <a href="https://wa.me/918956366659?text=Hi%2C%20I%27d%20like%20to%20proceed%20with%20TopDoc" className="hcp-wa-btn" target="_blank" rel="noopener noreferrer">
                            {WA_ICON} Start on WhatsApp →
                        </a>
                    </div>

                </div>
            </div>
        </main>
    );
}
