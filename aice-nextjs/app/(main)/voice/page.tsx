'use client';

import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/components/ModalContext';

type Demo = {
    slug: string;
    title: string;
    industry: string;
    tagline: string;
    metric: string;
    metricLabel: string;
    src: string;
    accent: string;
    bgFrom: string;
    bgTo: string;
};

const DEMOS: Demo[] = [
    {
        slug: 'doctor-appointment-booking',
        title: 'Doctor Appointment Booking',
        industry: 'Healthcare',
        tagline: 'Answers calls, checks availability, and books appointments — without a receptionist.',
        metric: '240+',
        metricLabel: 'appointments booked / day',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        accent: '#10b981',
        bgFrom: '#011c14',
        bgTo: '#042f1e',
    },
    {
        slug: 'real-estate-outbound',
        title: 'Real Estate Outbound',
        industry: 'Real Estate',
        tagline: 'Dials hundreds of leads daily, pitches listings, routes hot buyers straight to your agents.',
        metric: '8×',
        metricLabel: 'more dials per hour',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        accent: '#f59e0b',
        bgFrom: '#1c0f00',
        bgTo: '#3b1a00',
    },
    {
        slug: 'real-estate-lead-qual',
        title: 'Lead Qualification',
        industry: 'Real Estate',
        tagline: 'Scores every inbound lead on budget, timeline and intent before your team ever picks up.',
        metric: '92%',
        metricLabel: 'qualification accuracy',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        accent: '#fb923c',
        bgFrom: '#1c0800',
        bgTo: '#3b1200',
    },
    {
        slug: 'customer-service',
        title: 'Customer Service',
        industry: 'Support',
        tagline: 'Resolves tier-1 queries instantly. Escalates only when a human adds real value.',
        metric: '70%',
        metricLabel: 'tickets auto-resolved',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        accent: '#818cf8',
        bgFrom: '#07051a',
        bgTo: '#130f3a',
    },
    {
        slug: 'review-collection',
        title: 'Review Collection',
        industry: 'Feedback',
        tagline: 'Post-purchase outbound call that captures structured reviews and flags unhappy customers.',
        metric: '4.7★',
        metricLabel: 'avg rating captured',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        accent: '#60a5fa',
        bgFrom: '#020b1c',
        bgTo: '#071a40',
    },
];

const NAVBAR_H = 72;

function Waveform({ accent, active }: { accent: string; active: boolean }) {
    const heights = [35, 65, 50, 85, 60, 90, 45, 75, 55, 80, 40, 70, 55, 65, 42];
    return (
        <div className="wf">
            {heights.map((h, i) => (
                <span
                    key={i}
                    className={`wf-b ${active ? 'wf-on' : ''}`}
                    style={{
                        height: `${h}%`,
                        background: active ? accent : 'rgba(255,255,255,0.2)',
                        animationDelay: `${i * 0.07}s`,
                        boxShadow: active ? `0 0 8px ${accent}88` : 'none',
                    }}
                />
            ))}
            <style jsx>{`
                .wf { display: flex; align-items: center; gap: 3px; height: 28px; }
                .wf-b { display: block; width: 3px; border-radius: 3px; transition: background 0.4s, box-shadow 0.4s; }
                .wf-on { animation: wfb 1s ease-in-out infinite; }
                @keyframes wfb { 0%,100%{transform:scaleY(0.35)} 50%{transform:scaleY(1.15)} }
            `}</style>
        </div>
    );
}

export default function VoicePage() {
    const { openModal } = useModal();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    /* Track which reel is snapped — use actual container height, not hardcoded NAVBAR_H */
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onScroll = () => {
            const h = el.clientHeight;
            if (!h) return;
            const idx = Math.round(el.scrollTop / h);
            setActive(Math.max(0, Math.min(idx, DEMOS.length - 1)));
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        return () => el.removeEventListener('scroll', onScroll);
    }, []);

    /* Reveal animations for non-reel sections */
    useEffect(() => {
        const obs = new IntersectionObserver(
            (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vc-vis'); }),
            { threshold: 0.12 }
        );
        document.querySelectorAll('.vc-rev').forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    /* Keyboard navigation */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); jumpTo(Math.min(active + 1, DEMOS.length - 1)); }
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); jumpTo(Math.max(active - 1, 0)); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    /* Snap hero → reels on scroll-stop */
    useEffect(() => {
        const reels = document.getElementById('reels');
        if (!reels) return;
        let timer: ReturnType<typeof setTimeout>;
        const onScroll = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const rect = reels.getBoundingClientRect();
                if (rect.top > 24 && rect.top < window.innerHeight * 0.75) {
                    reels.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 80);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer); };
    }, []);

    const jumpTo = (i: number) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' });
    };

    return (
        <main className="vc-root">

            {/* ── HERO ── */}
            <section className="vc-hero">
                <div className="vc-hero-bg" />
                <div className="vc-hero-inner">
                    <div className="vc-wf-hero">
                        {[50,70,40,90,60,100,45,80,55,75,35,85].map((h, i) => (
                            <span key={i} className="vc-wf-hero-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                    <h1 className="vc-h1">
                        AI Voice Agents<br />
                        <span className="vc-grad">for every industry.</span>
                    </h1>
                    <p className="vc-sub">
                        Your customers are calling. <em>Don&apos;t make them wait.</em>
                    </p>
                    <div className="vc-hero-actions">
                        <button className="btn btn-primary btn-lg" onClick={openModal}>Book a Demo</button>
                        <a href="#reels" className="btn btn-secondary btn-lg">Watch demos ↓</a>
                    </div>
                </div>

                {/* Full-bleed marquee — outside constrained inner */}
                <div className="vc-marquee-block">
                    <div className="vc-marquee-row">
                        <div className="vc-marquee-track">
                            {[...DEMOS, ...DEMOS, ...DEMOS].map((d, i) => (
                                <button key={i} className="vc-pill" onClick={() => {
                                    document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' });
                                    setTimeout(() => jumpTo(i % DEMOS.length), 500);
                                }}>
                                    {d.industry} — {d.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── REEL SCROLL ── */}
            <div className="vc-reels" id="reels">

                {/* Progress bar */}
                <div className="vc-progress">
                    <div
                        className="vc-progress-fill"
                        style={{
                            width: `${((active + 1) / DEMOS.length) * 100}%`,
                            background: DEMOS[active].accent,
                        }}
                    />
                </div>

                {/* Prev arrow */}
                {active > 0 && (
                    <button className="vc-nav-btn vc-nav-prev" onClick={() => jumpTo(active - 1)} aria-label="Previous">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                    </button>
                )}

                {/* Next arrow */}
                {active < DEMOS.length - 1 && (
                    <button className="vc-nav-btn vc-nav-next" onClick={() => jumpTo(active + 1)} aria-label="Next">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </button>
                )}

                {/* Right dot nav */}
                <div className="vc-dots">
                    {DEMOS.map((d, i) => (
                        <button
                            key={i}
                            className={`vc-d ${active === i ? 'vc-d-on' : ''}`}
                            style={{ '--a': d.accent } as React.CSSProperties}
                            onClick={() => jumpTo(i)}
                            aria-label={d.title}
                        />
                    ))}
                </div>

                {/* Scroll container — snap happens here */}
                <div className="vc-scroll" ref={scrollRef}>
                    {DEMOS.map((d, i) => {
                        const isActive = active === i;
                        return (
                            <div key={d.slug} className="vc-reel">
                                {/* Video */}
                                <VideoReel src={d.src} active={isActive} />

                                {/* Cinematic gradient overlay — bottom-heavy */}
                                <div className="vc-overlay" style={{
                                    background: `linear-gradient(180deg,
                                        rgba(0,0,0,0.35) 0%,
                                        rgba(0,0,0,0) 25%,
                                        rgba(0,0,0,0) 45%,
                                        rgba(0,0,0,0.6) 70%,
                                        rgba(0,0,0,0.92) 100%)`
                                }} />

                                {/* Top row */}
                                <div className="vc-reel-top">
                                    <span className="vc-tag" style={{ color: d.accent }}>
                                        {d.industry}
                                    </span>
                                    <span className="vc-num">{i + 1} / {DEMOS.length}</span>
                                </div>

                                {/* Body */}
                                <div className={`vc-body ${isActive ? 'vc-body-in' : ''}`}>
                                    <div className="vc-metric-row">
                                        <span className="vc-metric-hero" style={{ color: d.accent }}>{d.metric}</span>
                                        <span className="vc-metric-label">{d.metricLabel}</span>
                                    </div>
                                    <h2 className="vc-reel-title">{d.title}</h2>
                                    <p className="vc-reel-sub">{d.tagline}</p>
                                    <div className="vc-reel-footer">
                                        <Waveform accent={d.accent} active={isActive} />
                                        <button className="vc-reel-cta" onClick={openModal}>
                                            Deploy this agent
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── STATS ── */}
            <section className="vc-stats vc-rev">
                <div className="vc-wrap">
                    {[['24/7','Always on'],['<500ms','Response time'],['40+','Languages'],['∞','Concurrent calls']].map(([n, l]) => (
                        <div key={n} className="vc-stat">
                            <div className="vc-stat-n">{n}</div>
                            <div className="vc-stat-l">{l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="vc-cta-sec">
                <div className="vc-wrap">
                    <div className="vc-cta vc-rev">
                        <h2>Your agent. Live in 2 weeks.</h2>
                        <div className="vc-cta-btns">
                            <button className="btn btn-primary btn-lg" style={{ background: '#fff', color: '#0f172a' }} onClick={openModal}>Book a Demo</button>
                            <a href="mailto:hello@aice.services" className="btn btn-secondary btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>Talk to a Human</a>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                /* ── ROOT ── */
                .vc-root { background: var(--color-bg); color: var(--color-text); overflow-x: hidden; }

                /* ── HERO ── */
                .vc-hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    text-align: center;
                    padding: 130px 24px 160px;
                    overflow: hidden;
                }
                .vc-hero-bg {
                    position: absolute; inset: 0; z-index: 0;
                    background:
                        radial-gradient(70% 60% at 50% 40%, rgba(96,165,250,0.14) 0%, transparent 65%),
                        linear-gradient(180deg, #F8FBFE 0%, #EBF5FF 100%);
                }
                .vc-hero-inner {
                    position: relative; z-index: 1;
                    max-width: 860px; width: 100%;
                    display: flex; flex-direction: column; align-items: center; gap: 0;
                    animation: vcrise 0.9s ease both;
                }
                @keyframes vcrise { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:none} }

                /* Hero waveform decoration */
                .vc-wf-hero {
                    display: flex; align-items: center; gap: 4px;
                    height: 40px; margin-bottom: 20px;
                }
                .vc-wf-hero-bar {
                    display: block; width: 4px; border-radius: 4px;
                    background: linear-gradient(180deg, #93c5fd, #3b82f6);
                    animation: vcwfh 1.4s ease-in-out infinite;
                    box-shadow: 0 0 10px rgba(59,130,246,0.4);
                }
                @keyframes vcwfh { 0%,100%{transform:scaleY(0.3)} 50%{transform:scaleY(1.1)} }

                .vc-h1 {
                    font-size: clamp(40px, 6vw, 76px);
                    font-weight: 700;
                    letter-spacing: -0.04em;
                    line-height: 1.02;
                    margin: 0 0 20px;
                }
                .vc-grad {
                    background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 50%, #6366F1 100%);
                    -webkit-background-clip: text; background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .vc-sub {
                    font-size: clamp(20px, 2.8vw, 28px);
                    color: var(--color-text-secondary);
                    max-width: 600px;
                    margin: 0 auto 36px;
                    line-height: 1.45;
                    font-weight: 400;
                    letter-spacing: -0.01em;
                }
                .vc-sub em {
                    font-style: italic;
                    color: var(--color-accent-blue);
                    font-weight: 500;
                }
                .vc-marquee-block {
                    position: absolute;
                    bottom: 52px;
                    left: 0; right: 0;
                    mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
                    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
                    overflow: hidden;
                }
                .vc-marquee-row { overflow: hidden; }
                .vc-marquee-track {
                    display: flex;
                    gap: 10px;
                    width: max-content;
                    animation: vcmarq 36s linear infinite;
                }
                .vc-marquee-block:hover .vc-marquee-track { animation-play-state: paused; }
                @keyframes vcmarq {
                    from { transform: translateX(0); }
                    to { transform: translateX(calc(-100% / 3)); }
                }
                .vc-pill {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 6px 0;
                    background: none;
                    border: none;
                    font-size: 12px; font-weight: 500;
                    color: rgba(15,23,42,0.28);
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: color 0.25s ease;
                    flex-shrink: 0;
                }
                .vc-pill::after {
                    content: '·';
                    color: rgba(15,23,42,0.15);
                    font-size: 16px;
                    line-height: 1;
                }
                .vc-pill:hover { color: rgba(15,23,42,0.55); }
                .vc-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

                /* ── REEL CONTAINER ── */
                .vc-reels {
                    position: relative;
                    height: calc(100vh - ${NAVBAR_H}px);
                }
                .vc-scroll {
                    height: 100%;
                    overflow-y: scroll;
                    scroll-snap-type: y mandatory;
                    scroll-behavior: smooth;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
                .vc-scroll::-webkit-scrollbar { display: none; }

                /* Each reel MUST have the same explicit height as the container */
                .vc-reel {
                    position: relative;
                    width: 100%;
                    height: calc(100vh - ${NAVBAR_H}px);
                    scroll-snap-align: start;
                    scroll-snap-stop: always;
                    overflow: hidden;
                    background: #0a0a0f;
                }

                /* YouTube iframe — cover the reel like object-fit:cover */
                .vc-reel-video {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 177.78vh;   /* 16:9 at full height */
                    height: 56.25vw;  /* 16:9 at full width */
                    min-width: 100%;
                    min-height: 100%;
                    filter: brightness(0.85);
                }

                /* Gradient overlay */
                .vc-overlay { position: absolute; inset: 0; pointer-events: none; z-index: 1; }

                /* Top row */
                .vc-reel-top {
                    position: absolute; top: 28px; left: 28px; right: 28px;
                    display: flex; align-items: center; justify-content: space-between;
                    z-index: 3;
                }
                .vc-tag {
                    font-size: 11px; font-weight: 700; text-transform: uppercase;
                    letter-spacing: 0.16em;
                }
                .vc-num {
                    font-size: 12px; font-weight: 500;
                    color: rgba(255,255,255,0.3); letter-spacing: 0.04em;
                }

                /* Progress bar */
                .vc-progress {
                    position: absolute; top: 0; left: 0; right: 0;
                    height: 2px; background: rgba(255,255,255,0.1);
                    z-index: 10;
                }
                .vc-progress-fill {
                    height: 100%;
                    transition: width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease;
                }

                /* Prev / Next navigation */
                .vc-nav-btn {
                    position: absolute;
                    left: 50%; transform: translateX(-50%);
                    z-index: 10;
                    width: 36px; height: 36px;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(255,255,255,0.08);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 50%;
                    color: rgba(255,255,255,0.5);
                    cursor: pointer;
                    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
                }
                .vc-nav-btn:hover {
                    background: rgba(255,255,255,0.16);
                    color: rgba(255,255,255,0.9);
                }
                .vc-nav-prev { top: 14px; }
                .vc-nav-next { bottom: 14px; }
                .vc-nav-prev:hover { transform: translateX(-50%) translateY(-2px); }
                .vc-nav-next:hover { transform: translateX(-50%) translateY(2px); }

                /* Reel body — staggered children */
                .vc-body {
                    position: absolute; bottom: 0; left: 0; right: 0;
                    padding: 32px 36px 60px;
                    z-index: 3;
                }
                .vc-body > * {
                    opacity: 0; transform: translateY(16px);
                    transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
                }
                .vc-body-in > *:nth-child(1) { opacity: 1; transform: none; transition-delay: 0.04s; }
                .vc-body-in > *:nth-child(2) { opacity: 1; transform: none; transition-delay: 0.11s; }
                .vc-body-in > *:nth-child(3) { opacity: 1; transform: none; transition-delay: 0.18s; }
                .vc-body-in > *:nth-child(4) { opacity: 1; transform: none; transition-delay: 0.25s; }

                /* Metric hero number */
                .vc-metric-row {
                    display: flex; align-items: baseline; gap: 10px;
                    margin-bottom: 10px;
                }
                .vc-metric-hero {
                    font-size: clamp(48px, 6.5vw, 80px);
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    line-height: 1;
                }
                .vc-metric-label {
                    font-size: 12px; font-weight: 500;
                    color: rgba(255,255,255,0.4);
                    text-transform: uppercase; letter-spacing: 0.1em;
                    padding-bottom: 4px;
                }

                .vc-reel-title {
                    font-size: clamp(22px, 2.8vw, 36px);
                    font-weight: 600; color: #fff;
                    letter-spacing: -0.02em; line-height: 1.15;
                    margin: 0 0 8px;
                }
                .vc-reel-sub {
                    font-size: 14px; color: rgba(255,255,255,0.5);
                    line-height: 1.6; margin: 0; max-width: 480px;
                }
                .vc-reel-footer {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    margin-top: 22px;
                }
                .vc-reel-cta {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 10px 20px;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.18);
                    border-radius: 9999px;
                    color: #fff;
                    font-size: 13px; font-weight: 600;
                    cursor: pointer; letter-spacing: 0.02em;
                    transition: background 0.25s, transform 0.2s;
                }
                .vc-reel-cta:hover { background: rgba(255,255,255,0.18); transform: translateX(3px); }

                /* Mute toggle */
                .vc-mute-btn {
                    position: absolute;
                    top: 24px; right: 24px;
                    z-index: 4;
                    display: inline-flex; align-items: center; gap: 7px;
                    padding: 8px 14px;
                    background: rgba(0,0,0,0.55);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.18);
                    border-radius: 9999px;
                    color: #fff;
                    font-size: 12px; font-weight: 600;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    transition: background 0.2s ease, transform 0.2s ease;
                    animation: vcrise 0.4s ease both;
                }
                .vc-mute-btn:hover { background: rgba(0,0,0,0.75); transform: scale(1.04); }

                /* Dot nav */
                .vc-dots {
                    position: absolute; right: 16px; top: 50%;
                    transform: translateY(-50%); z-index: 10;
                    display: flex; flex-direction: column; gap: 8px;
                }
                .vc-d {
                    width: 7px; height: 7px; border-radius: 50%;
                    border: none; padding: 0; cursor: pointer;
                    background: rgba(255,255,255,0.25);
                    transition: all 0.3s ease;
                }
                .vc-d-on {
                    background: var(--a);
                    width: 9px; height: 9px;
                    box-shadow: 0 0 10px var(--a);
                }

                /* ── STATS ── */
                .vc-stats {
                    padding: 60px 0;
                    background: var(--color-bg-alt);
                    border-top: 1px solid var(--color-gray-200);
                    border-bottom: 1px solid var(--color-gray-200);
                }
                .vc-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
                .vc-stats .vc-wrap { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
                .vc-stat { text-align: center; }
                .vc-stat-n {
                    font-size: clamp(32px,4.5vw,52px); font-weight: 700;
                    background: linear-gradient(135deg, #3B82F6, #1E40AF);
                    -webkit-background-clip: text; background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -0.03em; line-height: 1;
                }
                .vc-stat-l {
                    font-size: 12px; color: var(--color-text-muted);
                    margin-top: 8px; text-transform: uppercase;
                    letter-spacing: 0.09em; font-weight: 600;
                }

                /* ── CTA ── */
                .vc-cta-sec { padding: 100px 0; }
                .vc-cta {
                    background:
                        radial-gradient(55% 70% at 65% 15%, rgba(99,102,241,0.55) 0%, transparent 55%),
                        linear-gradient(135deg, #0f172a, #1E40AF);
                    text-align: center; padding: 80px 32px;
                    border-radius: 28px;
                    box-shadow: 0 40px 100px rgba(30,64,175,0.28);
                }
                .vc-cta h2 {
                    font-size: clamp(32px,5vw,56px); font-weight: 700;
                    letter-spacing: -0.03em; color: #fff;
                    line-height: 1.05; margin: 0 0 32px;
                }
                .vc-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

                /* ── REVEAL ── */
                .vc-rev { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
                .vc-vis { opacity: 1; transform: none; }

                /* ── RESPONSIVE ── */
                @media (max-width: 768px) {
                    /* Hero */
                    .vc-hero { padding: 110px 20px 140px; min-height: 100svh; }
                    .vc-hero-inner { gap: 0; }
                    .vc-h1 { font-size: clamp(36px, 10vw, 56px); margin-bottom: 16px; }
                    .vc-sub { font-size: 17px; margin-bottom: 28px; }
                    .vc-hero-actions { flex-direction: column; align-items: stretch; }
                    .vc-marquee-block { bottom: 40px; }

                    /* Reels */
                    .vc-reels { height: calc(100svh - 64px); }
                    .vc-reel { height: calc(100svh - 64px); }
                    .vc-reel-top { left: 16px; right: 16px; top: 20px; }
                    .vc-body { padding: 24px 20px 44px; }
                    .vc-metric-hero { font-size: clamp(40px, 11vw, 60px); }
                    .vc-reel-title { font-size: clamp(20px, 5.5vw, 28px); }
                    .vc-reel-sub { font-size: 13px; }
                    .vc-reel-footer { flex-wrap: wrap; gap: 12px; }
                    .vc-reel-cta { font-size: 12px; padding: 9px 16px; }
                    .vc-dots { right: 8px; }
                    .vc-nav-btn { width: 32px; height: 32px; }
                    .vc-mute-btn { top: 16px; right: 16px; font-size: 11px; padding: 7px 12px; }

                    /* Stats */
                    .vc-stats .vc-wrap { grid-template-columns: repeat(2,1fr); gap: 32px; }
                    .vc-stats { padding: 48px 0; }

                    /* CTA */
                    .vc-cta { padding: 48px 20px; }
                    .vc-cta-btns { flex-direction: column; align-items: stretch; }
                    .vc-cta-sec { padding: 60px 0; }
                    .vc-wrap { padding: 0 16px; }
                }
            `}</style>
        </main>
    );
}

/* YouTube iframe — unmuted by default, postMessage for play/pause/mute */
function VideoReel({ active }: { src: string; active: boolean }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [muted, setMuted] = useState(false);

    const send = (func: string) => {
        iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func, args: '' }),
            '*'
        );
    };

    useEffect(() => {
        if (active) {
            send('playVideo');
            const t = setTimeout(() => send(muted ? 'mute' : 'unMute'), 400);
            return () => clearTimeout(t);
        } else {
            send('pauseVideo');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    useEffect(() => {
        send(muted ? 'mute' : 'unMute');
    }, [muted]);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMuted((m) => !m);
    };

    return (
        <>
            <iframe
                ref={iframeRef}
                className="vc-reel-video"
                src="https://www.youtube.com/embed/TCDNUMABEnI?enablejsapi=1&autoplay=0&mute=1&loop=1&playlist=TCDNUMABEnI&controls=0&playsinline=1&rel=0&modestbranding=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ border: 'none', pointerEvents: 'none' }}
            />
            {active && (
                <button className="vc-mute-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
                    {muted ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                    )}
                    <span>{muted ? 'Unmute' : 'Mute'}</span>
                </button>
            )}
        </>
    );
}
