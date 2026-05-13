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
    youtubeId: string;
    accent: string;
    likes: number;
    comments: number;
};

const DEMOS: Demo[] = [
    {
        slug: 'urban-klean-booking',
        title: 'Booking Agent',
        industry: 'Hospitality',
        tagline: 'Handles inbound calls, checks availability, and confirms bookings — 24/7 without staff.',
        metric: '3×',
        metricLabel: 'more bookings handled',
        youtubeId: '4_6y0Tc-RMk',
        accent: '#10b981',
        likes: 2847,
        comments: 134,
    },
    {
        slug: 'real-estate-outbound',
        title: 'Real Estate Outbound',
        industry: 'Real Estate',
        tagline: 'Dials hundreds of leads daily, pitches listings, routes hot buyers straight to your agents.',
        metric: '8×',
        metricLabel: 'more dials / hour',
        youtubeId: 'TCDNUMABEnI',
        accent: '#f59e0b',
        likes: 1923,
        comments: 89,
    },
    {
        slug: 'real-estate-lead-qual',
        title: 'Lead Qualification',
        industry: 'Real Estate',
        tagline: 'Scores every inbound lead on budget, timeline and intent before your team ever picks up.',
        metric: '92%',
        metricLabel: 'qualification accuracy',
        youtubeId: 'fEMu-T2_1Zw',
        accent: '#fb923c',
        likes: 3241,
        comments: 201,
    },
    {
        slug: 'urban-klean-feedback',
        title: 'Review Collection',
        industry: 'Feedback',
        tagline: 'Post-service outbound call that captures reviews and flags unhappy customers automatically.',
        metric: '4.7★',
        metricLabel: 'avg rating captured',
        youtubeId: 'DnXb-gJ4WpE',
        accent: '#60a5fa',
        likes: 2103,
        comments: 112,
    },
];

/* Marquee shows all industries including ones without a live reel */
const MARQUEE_ITEMS = [
    { industry: 'Hospitality', title: 'Booking Agent' },
    { industry: 'Real Estate', title: 'Outbound Calling' },
    { industry: 'Real Estate', title: 'Lead Qualification' },
    { industry: 'Feedback', title: 'Review Collection' },
    { industry: 'Healthcare', title: 'Appointment Booking' },
    { industry: 'Support', title: 'Customer Service' },
];

const NAVBAR_H = 72;

function ReelCard({ demo, index, isActive }: { demo: Demo; index: number; isActive: boolean }) {
    const { openModal } = useModal();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [muted, setMuted] = useState(true); // YouTube autoplay requires starting muted
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(demo.likes);
    const [showHeart, setShowHeart] = useState(false);
    const lastTap = useRef(0);

    const sendYT = (func: string) => {
        iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func, args: '' }), '*'
        );
    };

    useEffect(() => {
        if (isActive) {
            const t = setTimeout(() => {
                sendYT('playVideo');
                if (!muted) sendYT('unMute');
            }, 400);
            return () => clearTimeout(t);
        } else {
            sendYT('pauseVideo');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    useEffect(() => {
        sendYT(muted ? 'mute' : 'unMute');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muted]);

    const handleTap = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            if (!liked) {
                setLiked(true);
                setLikeCount((c) => c + 1);
            }
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 900);
        }
        lastTap.current = now;
    };

    const toggleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (liked) {
            setLiked(false);
            setLikeCount((c) => c - 1);
        } else {
            setLiked(true);
            setLikeCount((c) => c + 1);
        }
    };

    return (
        <div className="ig-reel" onClick={handleTap}>
            {/* YouTube iframe — covers the portrait frame like object-fit:cover */}
            <iframe
                ref={iframeRef}
                className="ig-yt-frame"
                src={`https://www.youtube.com/embed/${demo.youtubeId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${demo.youtubeId}&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`}
                allow="autoplay; encrypted-media"
                allowFullScreen
            />

            {/* Double-tap heart burst */}
            {showHeart && (
                <div className="ig-heart-pop" aria-hidden>
                    <span className="ig-heart-pop-icon">❤️</span>
                </div>
            )}

            {/* Bottom gradient */}
            <div className="ig-gradient" />

            {/* Top bar */}
            <div className="ig-top">
                <div className="ig-user-row">
                    <div className="ig-avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                    </div>
                    <span className="ig-handle">aice.voice</span>
                    <span className="ig-industry-tag" style={{ color: demo.accent }}>
                        {demo.industry}
                    </span>
                </div>
                <button
                    className="ig-mute-toggle"
                    onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                >
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
                </button>
            </div>

            {/* Right sidebar */}
            <div className="ig-sidebar">
                {/* Like */}
                <button className={`ig-action ${liked ? 'ig-liked' : ''}`} onClick={toggleLike} aria-label="Like">
                    <svg className="ig-action-icon" viewBox="0 0 24 24" fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="ig-action-count">{likeCount.toLocaleString()}</span>
                </button>

                {/* Deploy Agent */}
                <button className="ig-action" onClick={(e) => { e.stopPropagation(); openModal(); }} aria-label="Deploy Agent">
                    <svg className="ig-action-icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span className="ig-action-count">Deploy</span>
                </button>

                {/* WhatsApp */}
                <a
                    className="ig-action"
                    href="https://wa.me/918956366659?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20AICE%20Voice%20Agents"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="WhatsApp"
                >
                    <svg className="ig-action-icon" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="ig-action-count">Chat</span>
                </a>

                {/* Book Demo */}
                <button className="ig-action" onClick={(e) => { e.stopPropagation(); openModal(); }} aria-label="Book Demo">
                    <svg className="ig-action-icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="ig-action-count">Book</span>
                </button>
            </div>

            {/* Bottom info — clean, minimal */}
            <div className="ig-bottom">
                <div className="ig-metric-display" style={{ color: demo.accent }}>
                    {demo.metric}
                    <span className="ig-metric-unit">{demo.metricLabel}</span>
                </div>
                <div className="ig-reel-title">{demo.title}</div>
                <div className="ig-reel-tagline">{demo.tagline}</div>
                <div className="ig-vinyl-row">
                    <div className={`ig-vinyl ${muted ? 'ig-vinyl-paused' : ''}`}>🎵</div>
                </div>
            </div>

            {/* Reel counter */}
            <div className="ig-counter">{index + 1} / {DEMOS.length}</div>
        </div>
    );
}

export default function VoicePage() {
    const { openModal } = useModal();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

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

    useEffect(() => {
        const obs = new IntersectionObserver(
            (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vc-vis'); }),
            { threshold: 0.12 }
        );
        document.querySelectorAll('.vc-rev').forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); jumpTo(Math.min(active + 1, DEMOS.length - 1)); }
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); jumpTo(Math.max(active - 1, 0)); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    /* Add body class so CSS scroll-snap applies only on this page */
    useEffect(() => {
        document.body.classList.add('voice-page');
        return () => document.body.classList.remove('voice-page');
    }, []);

    /* Hide navbar when reels section is in view */
    useEffect(() => {
        const reels = document.getElementById('reels');
        if (!reels) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                document.body.classList.toggle('ig-reels-active', entry.isIntersecting);
            },
            { threshold: 0.2 }
        );
        obs.observe(reels);
        return () => {
            obs.disconnect();
            document.body.classList.remove('ig-reels-active');
        };
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
                        {[50, 70, 40, 90, 60, 100, 45, 80, 55, 75, 35, 85].map((h, i) => (
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

                <div className="vc-marquee-block">
                    <div className="vc-marquee-row">
                        <div className="vc-marquee-track">
                            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((d, i) => (
                                <button key={i} className="vc-pill" onClick={() => {
                                    document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    {d.industry} — {d.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── INSTAGRAM REELS ── */}
            <div className="ig-scene" id="reels">

                {/* Dot navigation */}
                <div className="ig-dots">
                    {DEMOS.map((d, i) => (
                        <button
                            key={i}
                            className={`ig-dot ${active === i ? 'ig-dot-on' : ''}`}
                            style={{ '--accent': d.accent } as React.CSSProperties}
                            onClick={() => jumpTo(i)}
                            aria-label={d.title}
                        />
                    ))}
                </div>

                {/* Portrait frame + scroll */}
                <div className="ig-portrait-wrap">
                    <div className="ig-scroll" ref={scrollRef}>
                        {DEMOS.map((d, i) => (
                            <ReelCard key={d.slug} demo={d} index={i} isActive={active === i} />
                        ))}
                    </div>
                </div>
            </div>

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
                /* ── NAVBAR HIDE WHEN REELS ACTIVE ── */
                .navbar { transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease !important; }
                body.ig-reels-active .navbar { transform: translateY(-100%); opacity: 0; pointer-events: none; }

                /* ── PAGE SCROLL SNAP (voice page only) ── */
                body.voice-page { scroll-snap-type: y proximity; }
                body.voice-page .vc-hero { scroll-snap-align: start; scroll-snap-stop: always; }
                body.voice-page .ig-scene { scroll-snap-align: start; scroll-snap-stop: always; }

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
                    display: flex; flex-direction: column; align-items: center;
                    animation: vcrise 0.9s ease both;
                }
                @keyframes vcrise { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:none} }
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
                    font-weight: 700; letter-spacing: -0.04em; line-height: 1.02;
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
                    max-width: 600px; margin: 0 auto 36px;
                    line-height: 1.45; font-weight: 400; letter-spacing: -0.01em;
                }
                .vc-sub em { font-style: italic; color: var(--color-accent-blue); font-weight: 500; }
                .vc-marquee-block {
                    position: absolute; bottom: 44px; left: 0; right: 0;
                    mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
                    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
                    overflow: hidden;
                    padding: 6px 0;
                }
                .vc-marquee-row { overflow: hidden; }
                .vc-marquee-track {
                    display: flex; gap: 10px; width: max-content;
                    animation: vcmarq 36s linear infinite;
                }
                .vc-marquee-block:hover .vc-marquee-track { animation-play-state: paused; }
                @keyframes vcmarq { from{transform:translateX(0)} to{transform:translateX(calc(-100% / 3))} }
                .vc-pill {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 7px 16px;
                    background: rgba(59,130,246,0.07);
                    border: 1px solid rgba(59,130,246,0.18);
                    border-radius: 9999px;
                    font-size: 12px; font-weight: 600;
                    color: rgba(15,23,42,0.6);
                    letter-spacing: 0.04em; text-transform: uppercase;
                    cursor: pointer; white-space: nowrap; flex-shrink: 0;
                    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
                }
                .vc-pill::before {
                    content: '';
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #3b82f6;
                    opacity: 0.5;
                    flex-shrink: 0;
                }
                .vc-pill:hover {
                    background: rgba(59,130,246,0.13);
                    border-color: rgba(59,130,246,0.35);
                    color: rgba(15,23,42,0.85);
                }
                .vc-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

                /* ── INSTAGRAM SCENE ── */
                .ig-scene {
                    height: calc(100vh - ${NAVBAR_H}px);
                    background: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                /* Portrait wrapper — 9:16 on desktop, full width on mobile */
                .ig-portrait-wrap {
                    position: relative;
                    height: 100%;
                    width: min(calc((100vh - ${NAVBAR_H}px) * 9 / 16), 100%);
                    overflow: hidden;
                    border-radius: 0;
                }

                /* Scroll snap container */
                .ig-scroll {
                    height: 100%;
                    width: 100%;
                    overflow-y: scroll;
                    scroll-snap-type: y mandatory;
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior-y: contain;
                }
                .ig-scroll::-webkit-scrollbar { display: none; }

                /* Each reel */
                .ig-reel {
                    position: relative;
                    width: 100%;
                    height: calc(100vh - ${NAVBAR_H}px);
                    scroll-snap-align: start;
                    scroll-snap-stop: always;
                    overflow: hidden;
                    background: #111;
                    cursor: pointer;
                }

                /* YouTube iframe — covers the portrait frame (16:9 video in 9:16 frame) */
                .ig-yt-frame {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    height: 100%;
                    aspect-ratio: 16 / 9;
                    min-width: 100%;
                    border: none;
                    pointer-events: none;
                    background: #000;
                }

                /* Bottom scrim */
                .ig-gradient {
                    position: absolute; inset: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(0,0,0,0.4) 0%,
                        rgba(0,0,0,0) 20%,
                        rgba(0,0,0,0) 40%,
                        rgba(0,0,0,0.5) 65%,
                        rgba(0,0,0,0.88) 100%
                    );
                    pointer-events: none;
                    z-index: 1;
                }

                /* Double-tap heart */
                .ig-heart-pop {
                    position: absolute; inset: 0;
                    display: flex; align-items: center; justify-content: center;
                    pointer-events: none; z-index: 20;
                }
                .ig-heart-pop-icon {
                    font-size: 90px;
                    animation: heartpop 0.9s ease forwards;
                    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.4));
                }
                @keyframes heartpop {
                    0% { transform: scale(0); opacity: 0; }
                    35% { transform: scale(1.25); opacity: 1; }
                    65% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1.05); opacity: 0; }
                }

                /* ── TOP BAR ── */
                .ig-top {
                    position: absolute; top: 16px; left: 16px; right: 16px;
                    display: flex; align-items: center; justify-content: space-between;
                    z-index: 5;
                }
                .ig-user-row {
                    display: flex; align-items: center; gap: 10px;
                }
                .ig-avatar {
                    width: 36px; height: 36px; border-radius: 50%;
                    background: linear-gradient(135deg, #405DE6, #833AB4, #E1306C, #FD1D1D, #F77737, #FCAF45);
                    border: 2px solid rgba(255,255,255,0.9);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .ig-handle {
                    font-size: 14px; font-weight: 700; color: #fff;
                    text-shadow: 0 1px 4px rgba(0,0,0,0.6);
                    letter-spacing: -0.01em;
                }
                .ig-follow-btn {
                    padding: 5px 14px;
                    border: 1.5px solid rgba(255,255,255,0.85);
                    border-radius: 8px;
                    background: transparent;
                    color: #fff;
                    font-size: 13px; font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                    white-space: nowrap;
                }
                .ig-follow-btn:hover { background: rgba(255,255,255,0.15); }
                .ig-mute-toggle {
                    width: 36px; height: 36px; border-radius: 50%;
                    background: rgba(0,0,0,0.55);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: background 0.2s;
                    flex-shrink: 0;
                }
                .ig-mute-toggle:hover { background: rgba(0,0,0,0.75); }

                /* ── RIGHT SIDEBAR ── */
                .ig-sidebar {
                    position: absolute;
                    right: 14px;
                    bottom: 140px;
                    z-index: 5;
                    display: flex; flex-direction: column; align-items: center; gap: 20px;
                }
                .ig-action {
                    display: flex; flex-direction: column; align-items: center; gap: 5px;
                    background: none; border: none; color: #fff;
                    cursor: pointer; padding: 0;
                    transition: transform 0.15s ease;
                }
                .ig-action:hover { transform: scale(1.1); }
                .ig-action.ig-liked { animation: likedpulse 0.35s ease; }
                @keyframes likedpulse {
                    0%   { transform: scale(1); }
                    50%  { transform: scale(1.3); }
                    100% { transform: scale(1); }
                }
                .ig-action-icon {
                    width: 28px; height: 28px;
                    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.7));
                }
                .ig-action-count {
                    font-size: 12px; font-weight: 600; color: #fff;
                    text-shadow: 0 1px 4px rgba(0,0,0,0.9);
                    letter-spacing: 0.01em;
                }

                /* ── TOP industry tag ── */
                .ig-industry-tag {
                    font-size: 11px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.12em;
                    text-shadow: 0 1px 4px rgba(0,0,0,0.6);
                }

                /* ── BOTTOM INFO ── */
                .ig-bottom {
                    position: absolute;
                    bottom: 0; left: 0; right: 76px;
                    padding: 0 18px 28px;
                    z-index: 5;
                }
                .ig-metric-display {
                    font-size: clamp(44px, 10vw, 72px);
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    line-height: 1;
                    display: flex; align-items: baseline; gap: 10px;
                    margin-bottom: 6px;
                    filter: drop-shadow(0 2px 12px rgba(0,0,0,0.5));
                }
                .ig-metric-unit {
                    font-size: 13px; font-weight: 500;
                    color: rgba(255,255,255,0.65);
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }
                .ig-reel-title {
                    font-size: 17px; font-weight: 700; color: #fff;
                    letter-spacing: -0.01em; line-height: 1.2;
                    margin-bottom: 4px;
                    text-shadow: 0 1px 6px rgba(0,0,0,0.5);
                }
                .ig-reel-tagline {
                    font-size: 13px; color: rgba(255,255,255,0.6);
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin-bottom: 12px;
                }
                .ig-vinyl-row { display: flex; align-items: center; }
                .ig-vinyl {
                    width: 28px; height: 28px; border-radius: 50%;
                    background: linear-gradient(135deg, #1a1a1a, #444);
                    border: 2px solid rgba(255,255,255,0.2);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12px; flex-shrink: 0;
                    animation: vinylspin 4s linear infinite;
                }
                .ig-vinyl.ig-vinyl-paused { animation-play-state: paused; }
                @keyframes vinylspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

                /* Reel counter */
                .ig-counter {
                    position: absolute; top: 16px; right: 16px;
                    font-size: 12px; font-weight: 500;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 0.04em;
                    z-index: 5;
                }

                /* Dot navigation */
                .ig-dots {
                    position: absolute;
                    left: 16px; top: 50%;
                    transform: translateY(-50%);
                    z-index: 20;
                    display: flex; flex-direction: column; gap: 8px;
                }
                .ig-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    border: none; padding: 0; cursor: pointer;
                    background: rgba(255,255,255,0.3);
                    transition: all 0.3s ease;
                }
                .ig-dot-on {
                    background: var(--accent);
                    width: 8px; height: 8px;
                    box-shadow: 0 0 8px var(--accent);
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
                    letter-spacing: -0.03em; color: #fff; line-height: 1.05; margin: 0 0 32px;
                }
                .vc-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

                /* ── REVEAL ── */
                .vc-rev { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
                .vc-vis { opacity: 1; transform: none; }

                /* ── RESPONSIVE ── */
                @media (max-width: 900px) {
                    .ig-portrait-wrap { width: 100%; border-radius: 0; }
                    .ig-dots { left: 8px; }
                }

                @media (max-width: 768px) {
                    /* Hero */
                    .vc-hero { padding: 110px 20px 140px; min-height: 100svh; }
                    .vc-h1 { font-size: clamp(36px, 10vw, 56px); margin-bottom: 16px; }
                    .vc-sub { font-size: 17px; margin-bottom: 28px; }
                    .vc-hero-actions { flex-direction: column; align-items: stretch; }
                    .vc-marquee-block { bottom: 40px; }

                    /* Scene */
                    .ig-scene { height: calc(100svh - 64px); }
                    .ig-reel { height: calc(100svh - 64px); }
                    .ig-portrait-wrap { height: calc(100svh - 64px); }

                    /* Bottom info */
                    .ig-bottom { right: 68px; padding: 0 14px 20px; }
                    .ig-sidebar { right: 10px; bottom: 110px; gap: 16px; }
                    .ig-metric-display { font-size: clamp(36px, 12vw, 56px); }
                    .ig-action-icon { width: 26px; height: 26px; }

                    /* Top */
                    .ig-follow-btn { font-size: 12px; padding: 4px 10px; }
                    .ig-handle { font-size: 13px; }

                    /* Stats */
                    .vc-stats .vc-wrap { grid-template-columns: repeat(2,1fr); gap: 32px; }
                    .vc-stats { padding: 48px 0; }

                    /* CTA */
                    .vc-cta { padding: 48px 20px; }
                    .vc-cta-btns { flex-direction: column; align-items: stretch; }
                    .vc-cta-sec { padding: 60px 0; }
                    .vc-wrap { padding: 0 16px; }
                }

                /* Desktop: slight rounded frame for the portrait */
                @media (min-width: 901px) {
                    .ig-portrait-wrap { border-radius: 12px; box-shadow: 0 0 80px rgba(0,0,0,0.6); }
                }
            `}</style>
        </main>
    );
}
