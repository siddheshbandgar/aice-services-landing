'use client';

import { useMemo, useState } from 'react';
import { useModal } from '@/components/ModalContext';

const FAQ_ITEMS = [
    {
        q: "What's the difference between Standard and Premium?",
        a: "Standard uses our cost-optimized voice stack — crisp, natural-sounding, and suited for 90% of service bookings. Premium uses ElevenLabs' top-tier voices (indistinguishable from human, richer emotional delivery) — best for luxury brands or high-ticket services. For most businesses, Standard is the right call and saves you ₹2/min.",
    },
    {
        q: "Is the ₹20,000 platform fee really fixed?",
        a: "Yes, fixed regardless of volume. It covers your dedicated phone number, dashboard, CRM integration, call recordings storage, analytics, success manager, and ongoing agent tuning. No per-seat, no per-number, no overage surprises.",
    },
    {
        q: "How exactly am I billed per minute?",
        a: "Per-second, not per-minute. A 47-second call bills for 47 seconds, not rounded up. Monthly invoice shows exact minutes used plus the fixed platform fee — no hidden telephony or number charges.",
    },
    {
        q: "What happens if my call volume doubles overnight?",
        a: "Nothing breaks. Infrastructure handles unlimited concurrent calls — 50 simultaneous callers all get answered at once. You pay only for minutes actually used, so a 2× day just costs 2× that day's minutes.",
    },
    {
        q: "Can the AI switch between Hindi, Telugu, and English?",
        a: "Yes — within the same call. The agent detects the caller's language from the first sentence and code-switches on demand.",
    },
    {
        q: "Any lock-in or long contracts?",
        a: "None. Month-to-month billing. Cancel anytime with no penalty. We earn your business every month or we don't deserve it.",
    },
    {
        q: "Does this replace my entire team?",
        a: "Not necessarily. Most clients start with AI handling overflow and off-hours, then gradually redeploy their team to higher-value work (outbound sales, VIP calls, escalations). The goal is stopping leaked leads — not cutting people.",
    },
];

function fmt(n: number) {
    return Math.round(n).toLocaleString('en-IN');
}

export default function PricingPage() {
    const { openModal } = useModal();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [tier, setTier] = useState<'standard' | 'premium'>('standard');
    const [calls, setCalls] = useState(100);
    const [duration, setDuration] = useState(1.5);

    const calc = useMemo(() => {
        const rate = tier === 'standard' ? 13 : 15;
        const monthMins = calls * 30 * duration;
        const voiceCost = monthMins * rate;
        const aiceTotal = voiceCost + 20000;

        const agentsNeeded = Math.max(3, Math.ceil(calls / 35));
        const supersNeeded = Math.max(1, Math.ceil(agentsNeeded / 4));
        const agentsCost = agentsNeeded * 25000;
        const supersCost = supersNeeded * 50000;
        const humanCost = agentsCost + supersCost;

        const savings = humanCost - aiceTotal;
        const savingsPct = Math.round((savings / humanCost) * 100);

        return {
            rate, monthMins, voiceCost, aiceTotal,
            agentsNeeded, supersNeeded, agentsCost, supersCost, humanCost,
            teamSize: agentsNeeded + supersNeeded,
            concurrentMin: Math.round(agentsNeeded * 1.5),
            concurrentMax: Math.round(agentsNeeded * 2.5),
            humanCeiling: agentsNeeded * 35 * 30,
            savings, savingsPct,
        };
    }, [tier, calls, duration]);

    return (
        <main className="pricing-root">

            {/* ── HERO ── */}
            <section className="pg-hero">
                <div className="pg-hero-glow" />
                <div className="pg-hero-inner">
                    <div className="pg-eyebrow">Voice Agent Pricing</div>
                    <h1 className="pg-h1">Half the cost.<br /><span className="pg-h1-grad">Zero missed leads.</span></h1>
                    <p className="pg-hero-sub">
                        See exactly what you&apos;ll spend per month — and how it stacks up against your current team.
                        Adjust the calculator for your own numbers.
                    </p>

                    {/* Tier toggle */}
                    <div className="pg-toggle-wrap">
                        <div className="pg-toggle">
                            <button className={tier === 'standard' ? 'active' : ''} onClick={() => setTier('standard')}>
                                Standard <span className="pg-badge">₹13/min</span>
                            </button>
                            <button className={tier === 'premium' ? 'active' : ''} onClick={() => setTier('premium')}>
                                Premium <span className="pg-badge">₹15/min</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── COMPARISON ── */}
            <section className="pg-section">
                <div className="pg-wrap">

                    <div className="pg-compare-grid">
                        <div className="pg-vs">vs</div>

                        {/* Human card */}
                        <div className="pg-card pg-card-human">
                            <div className="pg-card-label pg-label-human">Your current setup</div>
                            <div className="pg-card-title">A {calc.teamSize}-person team</div>
                            <div className="pg-card-sub">{calc.agentsNeeded} agents + {calc.supersNeeded} supervisor{calc.supersNeeded > 1 ? 's' : ''}, single shift</div>

                            <div className="pg-price-row">
                                <span className="pg-price">₹{fmt(calc.humanCost)}</span>
                                <span className="pg-price-unit">/ month</span>
                            </div>

                            <div className="pg-breakdown">
                                <div className="pg-bd-item">
                                    <span>{calc.agentsNeeded} agent{calc.agentsNeeded > 1 ? 's' : ''} × ₹25,000</span>
                                    <span className="pg-bd-val">₹{fmt(calc.agentsCost)}</span>
                                </div>
                                <div className="pg-bd-item">
                                    <span>{calc.supersNeeded} supervisor{calc.supersNeeded > 1 ? 's' : ''} × ₹50,000</span>
                                    <span className="pg-bd-val">₹{fmt(calc.supersCost)}</span>
                                </div>
                            </div>

                            <div className="pg-attrs">
                                {[
                                    { main: 'Morning shift only (~5 hrs/day)', sub: 'Leads after 1 PM go to competitors' },
                                    { main: `Max ${calc.concurrentMin}–${calc.concurrentMax} concurrent calls`, sub: 'Peak hours drop ~30% of callers' },
                                    { main: `~${fmt(calc.humanCeiling)} calls/month ceiling`, sub: 'And only during the 5-hour morning shift' },
                                    { main: 'Manual feedback calls', sub: 'Usually skipped — Google reviews suffer' },
                                    { main: 'Leaves, attrition, training overhead', sub: 'Hidden HR cost you already know' },
                                    { main: 'Tone & language quality varies', sub: 'Depends on which agent picks up' },
                                ].map((a, i) => (
                                    <div key={i} className="pg-attr-row">
                                        <span className="pg-icon-x">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                                            </svg>
                                        </span>
                                        <span className="pg-attr-body">
                                            {a.main}
                                            <span className="pg-attr-sub">{a.sub}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AICE card */}
                        <div className="pg-card pg-card-aice">
                            <div className="pg-card-label pg-label-aice">Recommended</div>
                            <div className="pg-card-title">AICE Voice Agent</div>
                            <div className="pg-card-sub pg-aice-sub">
                                {tier === 'standard' ? 'Standard plan · Always-on, every call' : 'Premium plan · Indistinguishable from human'}
                            </div>

                            <div className="pg-price-row">
                                <span className="pg-price">₹{fmt(calc.aiceTotal)}</span>
                                <span className="pg-price-unit pg-aice-unit">/ month</span>
                            </div>

                            <div className="pg-breakdown pg-aice-breakdown">
                                <div className="pg-bd-item pg-aice-bditem">
                                    <span>Voice minutes ({fmt(calc.monthMins)})</span>
                                    <span className="pg-bd-val">₹{fmt(calc.voiceCost)}</span>
                                </div>
                                <div className="pg-bd-item pg-aice-bditem">
                                    <span>Platform fee (fixed)</span>
                                    <span className="pg-bd-val">₹20,000</span>
                                </div>
                            </div>

                            <div className="pg-attrs">
                                {[
                                    { main: '24 / 7 / 365 coverage', sub: 'Every call answered — even 2 AM, festival days, Sundays' },
                                    { main: 'Unlimited concurrent calls', sub: '20 callers at once? All 20 get answered instantly' },
                                    { main: 'Scales to 45,000+ calls/month', sub: 'Zero extra headcount — pay per minute used' },
                                    { main: '100% automated feedback calls', sub: 'Post-service NPS, Google review nudges, reactivation' },
                                    { main: 'No HR, no training, no attrition', sub: 'Fixed cost, predictable, always consistent' },
                                    { main: 'English, Hindi, Telugu — same agent', sub: "Detects caller's language and adapts instantly" },
                                ].map((a, i) => (
                                    <div key={i} className="pg-attr-row">
                                        <span className="pg-icon-check">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        <span className="pg-attr-body pg-aice-attr">
                                            {a.main}
                                            <span className="pg-attr-sub pg-aice-attrsub">{a.sub}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Savings strip */}
                    {calc.savings > 0 ? (
                        <div className="pg-savings">
                            <div className="pg-savings-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                            </div>
                            <div>
                                <div className="pg-savings-label">You save every month</div>
                                <div className="pg-savings-value">₹{fmt(calc.savings)} <span className="pg-savings-pct">{calc.savingsPct}% less</span></div>
                            </div>
                            <div className="pg-savings-annual">
                                <span className="pg-savings-annual-val">₹{fmt(calc.savings * 12)}</span>
                                <span className="pg-savings-annual-lbl">saved per year</span>
                            </div>
                            <button className="pg-savings-cta" onClick={openModal}>Book a Demo →</button>
                        </div>
                    ) : (
                        <div className="pg-savings pg-savings-blue">
                            <div className="pg-savings-icon pg-savings-icon-blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                            <div>
                                <div className="pg-savings-label">24/7 advantage</div>
                                <div className="pg-savings-value">{fmt(calc.monthMins.toFixed(0) as unknown as number)} mins <span className="pg-savings-pct pg-pct-blue">all hours, all days</span></div>
                            </div>
                            <div className="pg-savings-annual">
                                <span className="pg-savings-annual-val">24h</span>
                                <span className="pg-savings-annual-lbl">vs 5-hour human shift</span>
                            </div>
                            <button className="pg-savings-cta pg-savings-cta-blue" onClick={openModal}>Book a Demo →</button>
                        </div>
                    )}

                    {/* Calculator */}
                    <div className="pg-calc">
                        <div className="pg-calc-head">
                            <h2 className="pg-calc-title">Adjust for your numbers</h2>
                            <p className="pg-calc-sub">Drag the sliders — the comparison above updates in real time.</p>
                        </div>
                        <div className="pg-calc-sliders">
                            <div className="pg-slider-group">
                                <div className="pg-slider-label-row">
                                    <span className="pg-slider-lbl">Calls per day</span>
                                    <span className="pg-slider-val">{calls.toLocaleString('en-IN')} <span className="pg-slider-unit">calls</span></span>
                                </div>
                                <input type="range" min={20} max={1500} step={10} value={calls} onChange={(e) => setCalls(Number(e.target.value))} />
                                <div className="pg-range-marks"><span>20</span><span>500</span><span>1,000</span><span>1,500</span></div>
                            </div>
                            <div className="pg-slider-group">
                                <div className="pg-slider-label-row">
                                    <span className="pg-slider-lbl">Avg call duration</span>
                                    <span className="pg-slider-val">{duration.toFixed(1)} <span className="pg-slider-unit">min</span></span>
                                </div>
                                <input type="range" min={0.5} max={4} step={0.1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                                <div className="pg-range-marks"><span>0.5m</span><span>1.5m</span><span>2.5m</span><span>4m</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STACK BREAKDOWN ── */}
            <section className="pg-section pg-section-alt">
                <div className="pg-wrap">
                    <div className="pg-sec-head">
                        <h2 className="pg-sec-title">What powers every minute</h2>
                        <p className="pg-sec-sub">Best-in-class AI stack, fully managed. Here&apos;s what&apos;s under the hood.</p>
                    </div>
                    <div className="pg-stack-grid">
                        {[
                            {
                                tier: 'Standard', rate: '₹13', per: '/min',
                                title: 'Cost-optimized, production-ready',
                                desc: "Fast, natural-sounding voice that handles 90% of booking and service calls — best ₹/minute in the Indian market.",
                                premium: false,
                                rows: [
                                    { color: '#3B82F6', label: 'Telephony', model: 'Plivo India · inbound + DID number', upgraded: false },
                                    { color: '#8B5CF6', label: 'Speech-to-Text', model: 'Deepgram Nova-3 · streaming, <300ms', upgraded: false },
                                    { color: '#F59E0B', label: 'Text-to-Speech', model: 'Deepgram Aura · natural voice', upgraded: false },
                                    { color: '#10B981', label: 'Language Model', model: 'GPT-4o-mini · tuned for bookings', upgraded: false },
                                    { color: '#6B7280', label: 'Orchestration · analytics', model: '24/7 monitoring, retries, logging', upgraded: false },
                                ],
                                useWhen: 'Booking flows, service inquiries, appointment confirmations, feedback calls, reminders — anywhere natural voice sounds professional.',
                            },
                            {
                                tier: 'Premium', rate: '₹15', per: '/min',
                                title: 'Indistinguishable from human',
                                desc: "Ultra-realistic voice with emotional nuance. Used by luxury brands and high-ticket services where voice quality directly impacts trust.",
                                premium: true,
                                rows: [
                                    { color: '#3B82F6', label: 'Telephony', model: 'Plivo India · inbound + DID number', upgraded: false },
                                    { color: '#8B5CF6', label: 'Speech-to-Text', model: 'Deepgram Nova-3 · streaming, <300ms', upgraded: false },
                                    { color: '#EF4444', label: 'Text-to-Speech', model: 'ElevenLabs · flagship multilingual voices', upgraded: true },
                                    { color: '#10B981', label: 'Language Model', model: 'GPT-4o · higher reasoning accuracy', upgraded: true },
                                    { color: '#6B7280', label: 'Orchestration · analytics', model: 'Priority processing, dedicated capacity', upgraded: false },
                                ],
                                useWhen: 'Premium brands, high-ticket bookings (₹10K+ services), luxury hospitality, concierge — where voice quality is part of the brand.',
                            },
                        ].map((plan) => (
                            <div key={plan.tier} className={`pg-stack-card ${plan.premium ? 'pg-stack-premium' : ''}`}>
                                <div className="pg-stack-top">
                                    <span className={`pg-stack-tier ${plan.premium ? 'pg-tier-prem' : ''}`}>{plan.tier} Stack</span>
                                    <span className={`pg-stack-rate ${plan.premium ? 'pg-rate-prem' : ''}`}>{plan.rate}<span className="pg-stack-per">{plan.per}</span></span>
                                </div>
                                <div className="pg-stack-title">{plan.title}</div>
                                <div className="pg-stack-desc">{plan.desc}</div>
                                <div className={`pg-stack-rows ${plan.premium ? 'pg-rows-prem' : ''}`}>
                                    {plan.rows.map((r, i) => (
                                        <div key={i} className="pg-stack-row">
                                            <span className="pg-stack-dot" style={{ background: r.color }} />
                                            <span className="pg-stack-lbl">{r.label} <span className="pg-stack-model">{r.model}</span></span>
                                            <span className={`pg-stack-cost ${r.upgraded ? 'pg-upgraded' : ''}`}>{r.upgraded ? 'Upgraded' : 'Included'}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={`pg-use-when ${plan.premium ? 'pg-use-prem' : ''}`}>
                                    <strong>Best for</strong>{plan.useWhen}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="pg-section">
                <div className="pg-wrap pg-wrap-narrow">
                    <div className="pg-sec-head">
                        <h2 className="pg-sec-title">Pricing FAQs</h2>
                        <p className="pg-sec-sub">Straight answers to everything you&apos;d ask on a sales call.</p>
                    </div>
                    <div className="pg-faq">
                        {FAQ_ITEMS.map((item, i) => (
                            <div key={i} className={`pg-faq-item ${openFaq === i ? 'open' : ''}`}>
                                <button className="pg-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <span>{item.q}</span>
                                    <svg className="pg-faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                <div className="pg-faq-a">{item.a}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="pg-section">
                <div className="pg-wrap">
                    <div className="pg-cta">
                        <h2 className="pg-cta-h2">Your agent. Live in 2 weeks.</h2>
                        <p className="pg-cta-sub">No lock-in. Month-to-month. Cancel anytime.</p>
                        <div className="pg-cta-btns">
                            <button className="btn btn-primary btn-lg" style={{ background: '#fff', color: '#0f172a' }} onClick={openModal}>Book a Demo</button>
                            <a href="https://wa.me/918956366659?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20AICE%20Voice%20Agents" target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>Talk to a Human</a>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .pricing-root { background: var(--color-bg); color: var(--color-text); overflow-x: hidden; }

                /* ── HERO ── */
                .pg-hero {
                    position: relative; min-height: 52vh;
                    display: flex; align-items: center; justify-content: center;
                    text-align: center; padding: 140px 24px 80px; overflow: hidden;
                    background: linear-gradient(180deg, #EBF5FF 0%, var(--color-bg) 100%);
                }
                .pg-hero-glow {
                    position: absolute; inset: 0; z-index: 0;
                    background: radial-gradient(65% 55% at 50% 35%, rgba(59,130,246,0.12) 0%, transparent 70%);
                }
                .pg-hero-inner { position: relative; z-index: 1; max-width: 780px; width: 100%; animation: pgrise 0.8s ease both; }
                @keyframes pgrise { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
                .pg-eyebrow {
                    font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
                    color: var(--color-accent-blue); margin-bottom: 18px;
                }
                .pg-h1 { font-size: clamp(36px,6vw,66px); font-weight: 700; letter-spacing: -0.04em; line-height: 1.06; margin: 0 0 18px; }
                .pg-h1-grad {
                    background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 50%, #6366F1 100%);
                    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
                }
                .pg-hero-sub { font-size: 17px; color: var(--color-text-secondary); max-width: 540px; margin: 0 auto 36px; line-height: 1.6; }

                /* Toggle */
                .pg-toggle-wrap { display: flex; justify-content: center; }
                .pg-toggle {
                    background: #fff; border: 1px solid var(--color-gray-200);
                    border-radius: 9999px; padding: 5px; display: flex; gap: 4px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
                }
                .pg-toggle button {
                    background: transparent; border: none; padding: 10px 22px; border-radius: 9999px;
                    font-family: inherit; font-size: 14px; font-weight: 500; color: var(--color-text-muted);
                    cursor: pointer; display: flex; align-items: center; gap: 8px;
                    transition: all 0.2s ease;
                }
                .pg-toggle button.active { background: #0f172a; color: #fff; }
                .pg-badge {
                    padding: 2px 9px; border-radius: 9999px; font-size: 10px; font-weight: 600;
                    background: var(--color-gray-100); color: var(--color-text-muted);
                }
                .pg-toggle button.active .pg-badge { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.85); }

                /* ── SECTIONS ── */
                .pg-section { padding: 80px 0; }
                .pg-section-alt { background: var(--color-bg-alt); border-top: 1px solid var(--color-gray-200); border-bottom: 1px solid var(--color-gray-200); }
                .pg-wrap { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
                .pg-wrap-narrow { max-width: 780px; }
                .pg-sec-head { text-align: center; margin-bottom: 48px; }
                .pg-sec-title { font-size: clamp(26px,4vw,42px); font-weight: 700; letter-spacing: -0.03em; margin: 0 0 10px; }
                .pg-sec-sub { font-size: 15px; color: var(--color-text-secondary); margin: 0; }

                /* ── COMPARE GRID ── */
                .pg-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; position: relative; margin-bottom: 20px; }
                .pg-vs {
                    position: absolute; left: 50%; top: 68px; transform: translate(-50%, -50%);
                    background: var(--color-bg); border: 1px solid var(--color-gray-200);
                    width: 48px; height: 48px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    z-index: 10; font-size: 13px; font-weight: 500; font-style: italic; color: var(--color-text-muted);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                }

                /* ── CARDS ── */
                .pg-card {
                    border: 1px solid var(--color-gray-200); border-radius: 24px;
                    padding: 32px 30px; display: flex; flex-direction: column;
                    background: var(--color-bg-alt);
                }
                .pg-card-aice {
                    background: #0f172a; border-color: #0f172a; color: #fff;
                }

                .pg-card-label {
                    display: inline-flex; align-items: center; font-size: 11px; font-weight: 600;
                    letter-spacing: 0.08em; text-transform: uppercase;
                    padding: 5px 12px; border-radius: 9999px; align-self: flex-start; margin-bottom: 14px;
                }
                .pg-label-human { background: #FEF2F2; color: #DC2626; }
                .pg-label-aice { background: rgba(59,130,246,0.15); color: #93c5fd; }

                .pg-card-title { font-size: 24px; font-weight: 600; letter-spacing: -0.015em; margin-bottom: 4px; }
                .pg-card-sub { font-size: 13.5px; color: var(--color-text-muted); }
                .pg-aice-sub { color: rgba(255,255,255,0.5); }

                .pg-price-row { margin-top: 24px; display: flex; align-items: baseline; gap: 8px; }
                .pg-price { font-size: 58px; font-weight: 600; letter-spacing: -0.04em; line-height: 1; font-variant-numeric: tabular-nums; }
                .pg-price-unit { font-size: 14px; color: var(--color-text-muted); }
                .pg-aice-unit { color: rgba(255,255,255,0.5); }

                .pg-breakdown { margin-top: 18px; padding-top: 16px; border-top: 1px dashed var(--color-gray-200); }
                .pg-aice-breakdown { border-top-color: rgba(255,255,255,0.12); }
                .pg-bd-item { display: flex; justify-content: space-between; font-size: 13.5px; padding: 5px 0; color: var(--color-text-secondary); }
                .pg-aice-bditem { color: rgba(255,255,255,0.6); }
                .pg-bd-val { font-weight: 600; color: var(--color-text); }
                .pg-card-aice .pg-bd-val { color: #fff; }

                .pg-attrs { margin-top: 22px; flex: 1; }
                .pg-attr-row { display: grid; grid-template-columns: 20px 1fr; gap: 10px; padding: 9px 0; font-size: 13.5px; align-items: flex-start; border-top: 1px solid var(--color-gray-200); }
                .pg-attr-row:first-child { border-top: none; }
                .pg-card-aice .pg-attr-row { border-top-color: rgba(255,255,255,0.07); }
                .pg-icon-x { color: #DC2626; opacity: 0.85; margin-top: 1px; }
                .pg-icon-check { color: #22C55E; margin-top: 1px; }
                .pg-attr-body { color: var(--color-text); line-height: 1.4; }
                .pg-aice-attr { color: #fff; }
                .pg-attr-sub { display: block; font-size: 12px; color: var(--color-text-muted); margin-top: 2px; line-height: 1.4; }
                .pg-aice-attrsub { color: rgba(255,255,255,0.42); }

                /* ── SAVINGS STRIP ── */
                .pg-savings {
                    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
                    border: 1px solid #bbf7d0; border-radius: 18px;
                    padding: 24px 30px; margin-bottom: 32px;
                    display: grid; grid-template-columns: 44px 1fr auto auto;
                    align-items: center; gap: 20px;
                }
                .pg-savings-blue { background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border-color: #BFDBFE; }
                .pg-savings-icon {
                    width: 44px; height: 44px; border-radius: 12px;
                    background: #16A34A; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0;
                }
                .pg-savings-icon-blue { background: #3B82F6; }
                .pg-savings-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #16A34A; margin-bottom: 4px; }
                .pg-savings-value { font-size: 30px; font-weight: 600; letter-spacing: -0.025em; color: #14532D; font-variant-numeric: tabular-nums; }
                .pg-savings-pct { font-size: 14px; font-weight: 500; color: #16A34A; margin-left: 8px; }
                .pg-pct-blue { color: #3B82F6; }
                .pg-savings-annual { text-align: center; }
                .pg-savings-annual-val { display: block; font-size: 24px; font-weight: 700; color: #14532D; letter-spacing: -0.02em; }
                .pg-savings-annual-lbl { font-size: 11px; color: #166534; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
                .pg-savings-cta {
                    padding: 11px 22px; background: #16A34A; color: #fff;
                    border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
                    cursor: pointer; transition: background 0.2s, transform 0.15s; white-space: nowrap;
                }
                .pg-savings-cta:hover { background: #15803d; transform: translateY(-1px); }
                .pg-savings-cta-blue { background: #3B82F6; }
                .pg-savings-cta-blue:hover { background: #2563eb; }

                /* ── CALCULATOR ── */
                .pg-calc {
                    background: var(--color-bg); border: 1px solid var(--color-gray-200);
                    border-radius: 20px; padding: 32px;
                }
                .pg-calc-head { margin-bottom: 28px; }
                .pg-calc-title { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: var(--color-text); margin: 0 0 6px; }
                .pg-calc-sub { font-size: 14px; color: var(--color-text-muted); margin: 0; }
                .pg-calc-sliders { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
                .pg-slider-group { display: flex; flex-direction: column; gap: 10px; }
                .pg-slider-label-row { display: flex; justify-content: space-between; align-items: baseline; }
                .pg-slider-lbl { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-secondary); }
                .pg-slider-val { font-size: 22px; font-weight: 700; color: var(--color-text); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
                .pg-slider-unit { font-size: 13px; font-weight: 400; color: var(--color-text-muted); }
                .pg-slider-group input[type="range"] {
                    -webkit-appearance: none; appearance: none; width: 100%;
                    height: 5px; background: var(--color-gray-200); border-radius: 9999px; outline: none; cursor: pointer;
                }
                .pg-slider-group input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none; width: 20px; height: 20px;
                    background: #0f172a; border-radius: 50%; border: 3px solid #fff;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2); cursor: pointer;
                }
                .pg-slider-group input[type="range"]::-moz-range-thumb {
                    width: 20px; height: 20px; background: #0f172a; border-radius: 50%;
                    border: 3px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2); cursor: pointer;
                }
                .pg-range-marks { display: flex; justify-content: space-between; font-size: 11px; color: var(--color-text-muted); margin-top: 5px; }

                /* ── STACK CARDS ── */
                .pg-stack-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .pg-stack-card {
                    background: var(--color-bg); border: 1px solid var(--color-gray-200);
                    border-radius: 20px; padding: 30px;
                }
                .pg-stack-premium { background: #fffbeb; border-color: #fde68a; }
                .pg-stack-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
                .pg-stack-tier { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-text-muted); }
                .pg-tier-prem { color: #B45309; }
                .pg-stack-rate { font-size: 28px; font-weight: 700; letter-spacing: -0.025em; color: var(--color-text); }
                .pg-rate-prem { color: #0A0A0A; }
                .pg-stack-per { font-size: 13px; font-weight: 400; color: var(--color-text-muted); margin-left: 3px; }
                .pg-stack-title { font-size: 18px; font-weight: 600; margin-bottom: 6px; }
                .pg-stack-desc { font-size: 13px; color: var(--color-text-secondary); line-height: 1.55; margin-bottom: 20px; }
                .pg-stack-rows {
                    background: var(--color-bg-alt); border: 1px solid var(--color-gray-200);
                    border-radius: 12px; padding: 14px 16px; margin-bottom: 16px;
                }
                .pg-rows-prem { background: rgba(255,255,255,0.6); border-color: #fde68a; }
                .pg-stack-row { display: grid; grid-template-columns: 14px 1fr auto; gap: 10px; align-items: center; padding: 7px 0; font-size: 13px; border-top: 1px dashed var(--color-gray-200); }
                .pg-stack-row:first-child { border-top: none; }
                .pg-rows-prem .pg-stack-row { border-top-color: #fde68a; }
                .pg-stack-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
                .pg-stack-lbl { color: var(--color-text); font-weight: 500; line-height: 1.3; }
                .pg-stack-model { display: block; font-size: 11px; color: var(--color-text-muted); font-weight: 400; margin-top: 1px; }
                .pg-stack-cost { font-weight: 600; color: var(--color-text); font-size: 12.5px; }
                .pg-upgraded { color: #B45309; }
                .pg-use-when { padding: 12px 14px; background: var(--color-gray-100); border-radius: 10px; font-size: 12.5px; color: var(--color-text-secondary); line-height: 1.6; }
                .pg-use-prem { background: rgba(180,83,9,0.07); color: #78350F; }
                .pg-use-when strong { color: var(--color-text); font-weight: 600; display: block; margin-bottom: 3px; }
                .pg-use-prem strong { color: #78350F; }

                /* ── FAQ ── */
                .pg-faq { display: flex; flex-direction: column; gap: 8px; }
                .pg-faq-item {
                    background: var(--color-bg); border: 1px solid var(--color-gray-200);
                    border-radius: 14px; overflow: hidden; transition: box-shadow 0.2s;
                }
                .pg-faq-item:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
                .pg-faq-q {
                    width: 100%; padding: 18px 20px;
                    display: flex; justify-content: space-between; align-items: center; gap: 16px;
                    font-size: 15px; font-weight: 500; color: var(--color-text);
                    background: transparent; border: none; cursor: pointer; text-align: left;
                }
                .pg-faq-chevron { flex-shrink: 0; transition: transform 0.25s ease; }
                .pg-faq-item.open .pg-faq-chevron { transform: rotate(-180deg); }
                .pg-faq-a {
                    max-height: 0; overflow: hidden;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                    padding: 0 20px; font-size: 14px; color: var(--color-text-secondary); line-height: 1.7;
                }
                .pg-faq-item.open .pg-faq-a { max-height: 400px; padding: 0 20px 20px; }

                /* ── CTA ── */
                .pg-cta {
                    background: radial-gradient(55% 70% at 65% 15%, rgba(99,102,241,0.55) 0%, transparent 55%),
                                linear-gradient(135deg, #0f172a, #1E40AF);
                    text-align: center; padding: 80px 32px; border-radius: 28px;
                    box-shadow: 0 40px 100px rgba(30,64,175,0.28);
                }
                .pg-cta-h2 { font-size: clamp(28px,5vw,52px); font-weight: 700; letter-spacing: -0.03em; color: #fff; line-height: 1.05; margin: 0 0 10px; }
                .pg-cta-sub { font-size: 15px; color: rgba(255,255,255,0.5); margin: 0 0 28px; }
                .pg-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

                /* ── RESPONSIVE ── */
                @media (max-width: 900px) {
                    .pg-compare-grid { grid-template-columns: 1fr; }
                    .pg-vs { display: none; }
                    .pg-stack-grid { grid-template-columns: 1fr; }
                    .pg-savings { grid-template-columns: 44px 1fr; }
                    .pg-savings-annual, .pg-savings-cta { grid-column: 2; }
                }
                @media (max-width: 768px) {
                    .pg-hero { padding: 120px 20px 60px; min-height: auto; }
                    .pg-h1 { font-size: clamp(30px,10vw,50px); }
                    .pg-section { padding: 56px 0; }
                    .pg-wrap { padding: 0 16px; }
                    .pg-calc-sliders { grid-template-columns: 1fr; gap: 22px; }
                    .pg-card { padding: 24px 20px; }
                    .pg-price { font-size: 44px; }
                    .pg-savings { grid-template-columns: 44px 1fr; gap: 14px; }
                    .pg-savings-annual, .pg-savings-cta { display: none; }
                    .pg-cta { padding: 48px 20px; }
                    .pg-cta-btns { flex-direction: column; align-items: stretch; }
                }
            `}</style>
        </main>
    );
}
