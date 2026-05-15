'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
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
};

const DEMOS: Demo[] = [
    {
        slug: 'real-estate-outbound',
        title: 'Real Estate Outbound',
        industry: 'Real Estate',
        tagline: 'Dials hundreds of leads daily, pitches listings, routes hot buyers to agents.',
        metric: '8×',
        metricLabel: 'more dials / hr',
        src: '/voice/real-estate-outbound.mp4',
        accent: '#f59e0b',
    },
    {
        slug: 'real-estate-lead-qual',
        title: 'Lead Qualification',
        industry: 'Real Estate',
        tagline: 'Scores every inbound lead on budget, timeline and intent — before your team picks up.',
        metric: '92%',
        metricLabel: 'qualification accuracy',
        src: '/voice/lead-qualification.mp4',
        accent: '#fb923c',
    },
    {
        slug: 'urban-klean-feedback',
        title: 'Review Collection',
        industry: 'Feedback',
        tagline: 'Post-service call that captures reviews and flags unhappy customers automatically.',
        metric: '4.7★',
        metricLabel: 'avg rating captured',
        src: '/voice/review-collection.mp4',
        accent: '#60a5fa',
    },
    {
        slug: 'urban-klean-booking',
        title: 'Booking Agent',
        industry: 'Hospitality',
        tagline: 'Handles inbound calls, checks availability, confirms bookings — 24/7 without staff.',
        metric: '3×',
        metricLabel: 'more bookings handled',
        src: '/voice/booking-agent.mp4',
        accent: '#10b981',
    },
];

const MARQUEE_ITEMS = [
    { industry: 'Hospitality', title: 'Booking Agent' },
    { industry: 'Real Estate', title: 'Outbound Calling' },
    { industry: 'Real Estate', title: 'Lead Qualification' },
    { industry: 'Feedback', title: 'Review Collection' },
    { industry: 'Healthcare', title: 'Appointment Booking' },
    { industry: 'Support', title: 'Customer Service' },
];

const LOADER_MIN_MS = 350;

function useCanHover() {
    return useMemo(
        () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches,
        []
    );
}

function DemoCard({ demo }: { demo: Demo }) {
    const { openModal } = useModal();
    const videoRef = useRef<HTMLVideoElement>(null);
    const mountedAt = useRef(0);
    const [loading, setLoading] = useState(true);
    const [muted, setMuted] = useState(false); // unmuted by default — voice is the product
    const [aspectRatio, setAspectRatio] = useState(16 / 9);
    const canHover = useCanHover();

    useEffect(() => { mountedAt.current = Date.now(); }, []);

    const hideLoader = useCallback(() => {
        const elapsed = Date.now() - (mountedAt.current || Date.now());
        setTimeout(() => setLoading(false), Math.max(0, LOADER_MIN_MS - elapsed));
    }, []);

    const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
        videoRef.current = el;
        if ((el?.readyState ?? 0) >= 2) hideLoader();
    }, [hideLoader]);

    const play = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = muted;
        v.play().catch(() => {
            // Autoplay blocked — retry muted
            v.muted = true;
            setMuted(true);
            v.play().catch(() => {});
        });
    };

    const pause = () => videoRef.current?.pause();

    return (
        <article className="demo-card group">
            {/* Video */}
            <div
                className="demo-video-wrap"
                style={{ aspectRatio }}
                onMouseEnter={() => { if (canHover) play(); }}
                onMouseLeave={() => { if (canHover) pause(); }}
            >
                <video
                    ref={setVideoRef}
                    src={demo.src}
                    preload="auto"
                    muted={muted}
                    playsInline
                    loop
                    className="demo-video"
                    onLoadedMetadata={(e) => {
                        const v = e.currentTarget;
                        if (v.videoWidth && v.videoHeight) setAspectRatio(v.videoWidth / v.videoHeight);
                        if (v.readyState >= 2) hideLoader();
                    }}
                    onLoadedData={hideLoader}
                    onCanPlay={hideLoader}
                    onError={hideLoader}
                    aria-hidden
                />

                {/* Loader spinner */}
                {loading && (
                    <div className="demo-loader" aria-hidden>
                        <div className="demo-spinner" style={{ borderTopColor: demo.accent }} />
                    </div>
                )}

                {/* Hover play hint — fades once playing */}
                <div className="demo-play-hint" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                </div>

                {/* Mute toggle — bottom right */}
                <button
                    className="demo-mute-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        const next = !muted;
                        setMuted(next);
                        if (videoRef.current) videoRef.current.muted = next;
                    }}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                >
                    {muted ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                    )}
                </button>

                {/* Industry accent tag */}
                <span className="demo-tag" style={{ color: demo.accent }}>
                    {demo.industry}
                </span>
            </div>

            {/* Card footer */}
            <div className="demo-footer">
                <div className="demo-footer-left">
                    <div className="demo-metric" style={{ color: demo.accent }}>
                        {demo.metric}
                        <span className="demo-metric-lbl">{demo.metricLabel}</span>
                    </div>
                    <h3 className="demo-title">{demo.title}</h3>
                    <p className="demo-tagline">{demo.tagline}</p>
                </div>
                <button className="demo-deploy-btn" onClick={openModal} aria-label="Deploy agent">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    Deploy
                </button>
            </div>
        </article>
    );
}

export default function VoicePage() {
    const { openModal } = useModal();

    useEffect(() => {
        const obs = new IntersectionObserver(
            (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vc-vis'); }),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.vc-rev').forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <main className="vc-root">

            {/* ── HERO ── */}
            <section className="vc-hero">
                <div className="vc-hero-bg" />
                <div className="vc-hero-inner">
                    <div className="vc-wf-hero">
                        {[50, 70, 40, 90, 60, 100, 45, 80, 55, 75, 35, 85].map((h, i) => (
                            <span key={i} className="vc-wf-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                    <h1 className="vc-h1">
                        AI Voice Agents<br />
                        <span className="vc-grad">for every industry.</span>
                    </h1>
                    <p className="vc-sub">Your customers are calling. <em>Don&apos;t make them wait.</em></p>
                    <div className="vc-hero-actions">
                        <button className="btn btn-primary btn-lg" onClick={openModal}>Book a Demo</button>
                        <button className="btn btn-secondary btn-lg" onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                            Watch demos ↓
                        </button>
                    </div>
                </div>
                <div className="vc-marquee-block">
                    <div className="vc-marquee-row">
                        <div className="vc-marquee-track">
                            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((d, i) => (
                                <button key={i} className="vc-pill" onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })}>
                                    {d.industry} — {d.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DEMOS ── */}
            <section className="demos-sec" id="demos">
                <div className="demos-inner vc-rev">
                    <div className="demos-head">
                        <p className="demos-eyebrow">Live demos</p>
                        <h2 className="demos-h2">
                            Hear the agent <span className="demos-h2-em">in action</span>
                        </h2>
                        <p className="demos-sub">Hover any card to listen. Every demo is a real call scenario.</p>
                        <Link href="/voice/pricing" className="demos-pricing-link">
                            Compare costs vs a human team →
                        </Link>
                    </div>
                    <div className="demos-grid">
                        {DEMOS.map((d) => <DemoCard key={d.slug} demo={d} />)}
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="vc-stats vc-rev">
                <div className="vc-wrap">
                    {[['24/7', 'Always on'], ['<500ms', 'Response time'], ['40+', 'Languages'], ['∞', 'Concurrent calls']].map(([n, l]) => (
                        <div key={n} className="vc-stat">
                            <div className="vc-stat-n">{n}</div>
                            <div className="vc-stat-l">{l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PRICING TEASER ── */}
            <section className="pr-teaser vc-rev">
                <div className="vc-wrap">
                    <div className="pr-teaser-inner">
                        <div className="pr-teaser-text">
                            <h2 className="pr-teaser-h2">Half the cost.<br />Zero missed leads.</h2>
                            <p className="pr-teaser-sub">See exactly how AICE compares to a 4-person team — with a live calculator built for your numbers.</p>
                        </div>
                        <div className="pr-teaser-stats">
                            {[
                                { value: '49%', label: 'avg cost reduction' },
                                { value: '24/7', label: 'vs 5-hr human shift' },
                                { value: '∞', label: 'concurrent calls' },
                            ].map((s) => (
                                <div key={s.value} className="pr-teaser-stat">
                                    <div className="pr-teaser-stat-v">{s.value}</div>
                                    <div className="pr-teaser-stat-l">{s.label}</div>
                                </div>
                            ))}
                        </div>
                        <Link href="/voice/pricing" className="pr-teaser-btn">
                            Explore Pricing
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="vc-cta-sec">
                <div className="vc-wrap">
                    <div className="vc-cta vc-rev">
                        <h2>Your agent. Live in 2 weeks.</h2>
                        <div className="vc-cta-btns">
                            <button className="btn btn-primary btn-lg" style={{ background: '#fff', color: '#0f172a' }} onClick={openModal}>Book a Demo</button>
                            <a href="https://wa.me/918956366659?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20AICE%20Voice%20Agents" target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>Talk to a Human</a>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .vc-root { background: var(--color-bg); color: var(--color-text); overflow-x: hidden; }

                /* ── HERO ── */
                .vc-hero {
                    position: relative; min-height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    text-align: center; padding: 130px 24px 160px; overflow: hidden;
                }
                .vc-hero-bg {
                    position: absolute; inset: 0; z-index: 0;
                    background: radial-gradient(70% 60% at 50% 40%, rgba(96,165,250,0.14) 0%, transparent 65%),
                                linear-gradient(180deg, #F8FBFE 0%, #EBF5FF 100%);
                }
                .vc-hero-inner {
                    position: relative; z-index: 1; max-width: 860px; width: 100%;
                    display: flex; flex-direction: column; align-items: center;
                    animation: vcrise 0.9s ease both;
                }
                @keyframes vcrise { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:none} }
                .vc-wf-hero { display: flex; align-items: center; gap: 4px; height: 40px; margin-bottom: 20px; }
                .vc-wf-bar {
                    display: block; width: 4px; border-radius: 4px;
                    background: linear-gradient(180deg, #93c5fd, #3b82f6);
                    animation: vcwfh 1.4s ease-in-out infinite;
                    box-shadow: 0 0 10px rgba(59,130,246,0.4);
                }
                @keyframes vcwfh { 0%,100%{transform:scaleY(0.3)} 50%{transform:scaleY(1.1)} }
                .vc-h1 { font-size: clamp(40px, 6vw, 76px); font-weight: 700; letter-spacing: -0.04em; line-height: 1.02; margin: 0 0 20px; }
                .vc-grad {
                    background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 50%, #6366F1 100%);
                    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
                }
                .vc-sub { font-size: clamp(20px, 2.8vw, 28px); color: var(--color-text-secondary); max-width: 600px; margin: 0 auto 36px; line-height: 1.45; }
                .vc-sub em { font-style: italic; color: var(--color-accent-blue); font-weight: 500; }
                .vc-marquee-block {
                    position: absolute; bottom: 44px; left: 0; right: 0; overflow: hidden; padding: 6px 0;
                    mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
                    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
                }
                .vc-marquee-row { overflow: hidden; }
                .vc-marquee-track { display: flex; gap: 10px; width: max-content; animation: vcmarq 36s linear infinite; }
                .vc-marquee-block:hover .vc-marquee-track { animation-play-state: paused; }
                @keyframes vcmarq { from{transform:translateX(0)} to{transform:translateX(calc(-100% / 3))} }
                .vc-pill {
                    display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px;
                    background: rgba(59,130,246,0.07); border: 1px solid rgba(59,130,246,0.18);
                    border-radius: 9999px; font-size: 12px; font-weight: 600;
                    color: rgba(15,23,42,0.6); letter-spacing: 0.04em; text-transform: uppercase;
                    cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: background 0.2s, color 0.2s;
                }
                .vc-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #3b82f6; opacity: 0.5; flex-shrink: 0; }
                .vc-pill:hover { background: rgba(59,130,246,0.13); color: rgba(15,23,42,0.85); }
                .vc-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

                /* ── DEMOS SECTION ── */
                .demos-sec {
                    background: #0c0c10;
                    padding: 88px 0 100px;
                }
                .demos-inner {
                    max-width: 1500px; margin: 0 auto; padding: 0 32px;
                }
                .demos-head { text-align: center; margin-bottom: 56px; }
                .demos-eyebrow {
                    font-size: 11px; font-weight: 600; letter-spacing: 0.22em;
                    text-transform: uppercase; color: rgba(255,255,255,0.35);
                    margin-bottom: 14px;
                }
                .demos-h2 {
                    font-size: clamp(30px, 5vw, 52px); font-weight: 600;
                    letter-spacing: -0.03em; line-height: 1.08; color: #fff;
                    margin: 0 0 14px;
                }
                .demos-h2-em {
                    background: linear-gradient(135deg, #93c5fd, #3b82f6);
                    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
                }
                .demos-sub { font-size: 15px; color: rgba(255,255,255,0.38); margin: 0 0 18px; }
                .demos-pricing-link {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 13px; font-weight: 600;
                    color: rgba(147,197,253,0.7);
                    text-decoration: none;
                    border-bottom: 1px solid rgba(147,197,253,0.25);
                    padding-bottom: 1px;
                    transition: color 0.2s, border-color 0.2s;
                }
                .demos-pricing-link:hover { color: #93c5fd; border-color: rgba(147,197,253,0.55); }

                /* Grid — 2 col desktop, 1 col mobile */
                .demos-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                    align-items: start;
                }

                /* ── DEMO CARD ── */
                .demo-card {
                    background: #141418;
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px;
                    overflow: hidden;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .demo-card:hover {
                    border-color: rgba(255,255,255,0.14);
                    box-shadow: 0 24px 64px rgba(0,0,0,0.6);
                }

                /* Video wrapper — natural aspect ratio */
                .demo-video-wrap {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    background: #0a0a0e;
                    cursor: default;
                }
                .demo-video {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transform: scale(1);
                    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .demo-card:hover .demo-video { transform: scale(1.025); }

                /* Loader */
                .demo-loader {
                    position: absolute; inset: 0; z-index: 10;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(10,10,14,0.88); backdrop-filter: blur(4px);
                }
                .demo-spinner {
                    width: 36px; height: 36px; border-radius: 50%;
                    border: 2.5px solid rgba(255,255,255,0.12);
                    border-top-color: #3b82f6;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* Hover play hint */
                .demo-play-hint {
                    position: absolute; inset: 0; z-index: 5;
                    display: flex; align-items: center; justify-content: center;
                    pointer-events: none;
                    opacity: 1;
                    transition: opacity 0.3s ease;
                }
                .demo-play-hint svg {
                    width: 52px; height: 52px;
                    background: rgba(0,0,0,0.55); border-radius: 50%;
                    padding: 14px; backdrop-filter: blur(8px);
                    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.5));
                    transition: transform 0.25s ease, opacity 0.25s ease;
                }
                .demo-card:hover .demo-play-hint { opacity: 0; }

                /* Mute button */
                .demo-mute-btn {
                    position: absolute; bottom: 12px; right: 12px; z-index: 8;
                    width: 34px; height: 34px; border-radius: 50%;
                    background: rgba(0,0,0,0.65); backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.15);
                    color: rgba(255,255,255,0.8);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s;
                    opacity: 0;
                    transition: opacity 0.25s ease, background 0.2s, color 0.2s;
                }
                .demo-card:hover .demo-mute-btn { opacity: 1; }
                .demo-mute-btn:hover { background: rgba(0,0,0,0.88); color: #fff; border-color: rgba(255,255,255,0.3); }

                /* Industry tag */
                .demo-tag {
                    position: absolute; top: 14px; left: 14px; z-index: 6;
                    font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em;
                    background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
                    padding: 4px 10px; border-radius: 9999px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                /* Card footer */
                .demo-footer {
                    padding: 18px 20px 20px;
                    display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
                }
                .demo-footer-left { flex: 1; min-width: 0; }
                .demo-metric {
                    font-size: 32px; font-weight: 700; letter-spacing: -0.04em; line-height: 1;
                    display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px;
                }
                .demo-metric-lbl {
                    font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.45);
                    letter-spacing: 0.08em; text-transform: uppercase;
                }
                .demo-title {
                    font-size: 15px; font-weight: 600; color: #fff;
                    margin: 0 0 4px; letter-spacing: -0.01em;
                }
                .demo-tagline {
                    font-size: 12.5px; color: rgba(255,255,255,0.38);
                    line-height: 1.5; margin: 0;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                }
                .demo-deploy-btn {
                    flex-shrink: 0; align-self: center;
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 8px 14px;
                    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 10px; color: rgba(255,255,255,0.7);
                    font-size: 12px; font-weight: 600; cursor: pointer;
                    transition: background 0.2s, border-color 0.2s, color 0.2s;
                    white-space: nowrap;
                }
                .demo-deploy-btn:hover { background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.4); color: #93c5fd; }

                /* ── STATS ── */
                .vc-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
                .vc-stats {
                    padding: 60px 0;
                    background: var(--color-bg-alt);
                    border-top: 1px solid var(--color-gray-200);
                    border-bottom: 1px solid var(--color-gray-200);
                }
                .vc-stats .vc-wrap { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
                .vc-stat { text-align: center; }
                .vc-stat-n {
                    font-size: clamp(32px,4.5vw,52px); font-weight: 700;
                    background: linear-gradient(135deg, #3B82F6, #1E40AF);
                    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
                    letter-spacing: -0.03em; line-height: 1;
                }
                .vc-stat-l { font-size: 12px; color: var(--color-text-muted); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.09em; font-weight: 600; }

                /* ── PRICING TEASER ── */
                .pr-teaser { padding: 100px 0; background: var(--color-bg); }
                .pr-teaser-inner {
                    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #312e81 100%);
                    border-radius: 28px;
                    padding: 64px 56px;
                    display: grid;
                    grid-template-columns: 1fr auto auto;
                    align-items: center;
                    gap: 48px;
                    box-shadow: 0 40px 100px rgba(30,64,175,0.25);
                    position: relative;
                    overflow: hidden;
                }
                .pr-teaser-inner::before {
                    content: '';
                    position: absolute; top: -60px; right: 200px;
                    width: 280px; height: 280px;
                    background: radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%);
                    pointer-events: none;
                }
                .pr-teaser-h2 { font-size: clamp(28px,4vw,44px); font-weight: 700; letter-spacing: -0.03em; color: #fff; line-height: 1.1; margin: 0 0 12px; }
                .pr-teaser-sub { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.6; margin: 0; max-width: 320px; }
                .pr-teaser-stats {
                    display: flex; flex-direction: column; gap: 20px;
                    padding: 0 36px;
                    border-left: 1px solid rgba(255,255,255,0.12);
                    border-right: 1px solid rgba(255,255,255,0.12);
                }
                .pr-teaser-stat { text-align: center; }
                .pr-teaser-stat-v {
                    font-size: 26px; font-weight: 700; letter-spacing: -0.03em;
                    color: #fff; line-height: 1;
                }
                .pr-teaser-stat-l { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
                .pr-teaser-btn {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 14px 28px;
                    background: #fff; color: #0f172a;
                    border-radius: 12px; font-size: 15px; font-weight: 700;
                    text-decoration: none; white-space: nowrap;
                    transition: background 0.2s, transform 0.15s;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
                }
                .pr-teaser-btn:hover { background: #f0f4ff; transform: translateY(-1px); }

                /* ── CTA ── */
                .vc-cta-sec { padding: 100px 0; }
                .vc-cta {
                    background: radial-gradient(55% 70% at 65% 15%, rgba(99,102,241,0.55) 0%, transparent 55%), linear-gradient(135deg, #0f172a, #1E40AF);
                    text-align: center; padding: 80px 32px; border-radius: 28px;
                    box-shadow: 0 40px 100px rgba(30,64,175,0.28);
                }
                .vc-cta h2 { font-size: clamp(32px,5vw,56px); font-weight: 700; letter-spacing: -0.03em; color: #fff; line-height: 1.05; margin: 0 0 32px; }
                .vc-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

                /* ── REVEAL ── */
                .vc-rev { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
                .vc-vis { opacity: 1; transform: none; }

                /* ── RESPONSIVE ── */
                @media (max-width: 768px) {
                    .vc-hero { padding: 110px 20px 140px; min-height: 100svh; }
                    .vc-h1 { font-size: clamp(36px, 10vw, 56px); }
                    .vc-sub { font-size: 17px; margin-bottom: 28px; }
                    .vc-hero-actions { flex-direction: column; align-items: stretch; }
                    .demos-sec { padding: 64px 0 72px; }
                    .demos-inner { padding: 0 16px; }
                    .demos-head { margin-bottom: 36px; }
                    .demos-grid { grid-template-columns: 1fr; gap: 14px; }
                    .demo-footer { padding: 14px 16px 16px; }
                    .demo-metric { font-size: 26px; }
                    .demo-mute-btn { opacity: 1; }
                    .vc-stats .vc-wrap { grid-template-columns: repeat(2,1fr); gap: 32px; }
                    .vc-stats { padding: 48px 0; }
                    .pr-teaser { padding: 60px 0; }
                    .pr-teaser-inner { grid-template-columns: 1fr; padding: 36px 28px; gap: 28px; }
                    .pr-teaser-inner::before { display: none; }
                    .pr-teaser-stats { flex-direction: row; justify-content: center; padding: 20px 0; border-left: none; border-right: none; border-top: 1px solid rgba(255,255,255,0.12); border-bottom: 1px solid rgba(255,255,255,0.12); }
                    .pr-teaser-btn { align-self: flex-start; }
                    .vc-cta { padding: 48px 20px; }
                    .vc-cta-btns { flex-direction: column; align-items: stretch; }
                    .vc-cta-sec { padding: 60px 0; }
                    .vc-wrap { padding: 0 16px; }
                }
            `}</style>
        </main>
    );
}
