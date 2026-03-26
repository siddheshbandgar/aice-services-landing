'use client';

import { useEffect, useRef, useState } from 'react';

/* ==========================================
   SCROLL REVEAL HOOK
   ========================================== */
function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('hc-visible');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        const elements = document.querySelectorAll('.hc-reveal');
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

/* ==========================================
   JOURNEY ANIMATION HOOK
   ========================================== */
function useJourneyAnimation() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('hc-journey-animate');
                });
            },
            { threshold: 0.2 }
        );
        const el = document.querySelector('.hc-journey-flow');
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);
}

/* ==========================================
   COUNT-UP STAT
   ========================================== */
function CountStat({ num, suffix = '', prefix = '' }: { num: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const duration = 1800;
                    const startTime = performance.now();
                    const animate = (now: number) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.round(eased * num));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [num]);

    return <div className="hc-roi-number" ref={ref}>{prefix}{count}{suffix}</div>;
}

/* ==========================================
   ICONS
   ========================================== */
const Icons = {
    smartphone: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>),
    fileText: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>),
    messageCircle: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>),
    penTool: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>),
    users: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    heart: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>),
    calendar: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>),
    clipboard: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>),
    pill: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>),
    receipt: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" /></svg>),
    megaphone: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>),
    play: (<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg>),
    arrowRight: (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>),
    check: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    checkCircle: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>),
    xCircle: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>),
    whatsapp: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>),
    star: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    trendingUp: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>),
    clock: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    target: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
    indianRupee: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" /></svg>),
    sparkles: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>),
    building: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>),
    shield: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    lock: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
    headset: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>),
    concierge: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18" /><path d="M12 4a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8z" /><path d="M12 4v2" /></svg>),
    stethoscope: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" /></svg>),
};

/* ==========================================
   SCREEN PLACEHOLDER
   ========================================== */
function ScreenPlaceholder({ label, aspectRatio = '16/9' }: { label: string; aspectRatio?: string }) {
    return (
        <div className="hc-screen-placeholder" style={{ aspectRatio }}>
            <div className="hc-browser-chrome">
                <div className="hc-browser-dots"><span /><span /><span /></div>
                <div className="hc-browser-bar"><span>arna-leadgen-crm-emr.vercel.app</span></div>
                <div className="hc-browser-actions"><span className="hc-browser-btn" /><span className="hc-browser-btn" /></div>
            </div>
            <div className="hc-screen-body">
                <div className="hc-mock-sidebar">
                    <div className="hc-mock-logo" />
                    {[0,1,2,3,4,5].map(i => (
                        <div key={i} className={`hc-mock-nav-item ${i === 1 ? 'active' : ''}`} />
                    ))}
                </div>
                <div className="hc-mock-main">
                    <div className="hc-mock-topbar">
                        <div className="hc-mock-page-title" />
                        <div className="hc-mock-topbar-right">
                            <div className="hc-mock-search" />
                            <div className="hc-mock-avatar" />
                        </div>
                    </div>
                    <div className="hc-mock-stats">
                        {[0,1,2,3].map(i => (
                            <div key={i} className="hc-mock-stat-card">
                                <div className="hc-mock-stat-num" />
                                <div className="hc-mock-stat-label" />
                            </div>
                        ))}
                    </div>
                    <div className="hc-mock-content">
                        <div className="hc-mock-table">
                            <div className="hc-mock-table-header">
                                {[0,1,2,3].map(i => <div key={i} className="hc-mock-th" />)}
                            </div>
                            {[0,1,2,3,4].map(i => (
                                <div key={i} className="hc-mock-table-row">
                                    <div className="hc-mock-td hc-mock-td-name" />
                                    <div className="hc-mock-td" />
                                    <div className="hc-mock-td" />
                                    <div className="hc-mock-td hc-mock-badge" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hc-screen-label-overlay">
                        <span>{Icons.sparkles}</span>
                        <span>{label}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ==========================================
   JOURNEY NODE
   ========================================== */
function JourneyNode({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="hc-journey-node">
            <div className="hc-journey-icon">{icon}</div>
            <span className="hc-journey-label">{label}</span>
        </div>
    );
}

/* ==========================================
   FEATURE ROW
   ========================================== */
function FeatureRow({
    heading, bullets, screenshotLabel, screenshotComment, icon, reversed, imageSrc,
}: {
    heading: string; bullets: string[]; screenshotLabel: string;
    screenshotComment?: string; icon: React.ReactNode; reversed?: boolean; imageSrc?: string;
}) {
    return (
        <div className={`hc-feature-row hc-reveal ${reversed ? 'hc-feature-reversed' : ''}`}>
            <div className="hc-feature-text">
                <div className="hc-feature-icon-wrap">{icon}</div>
                <h3>{heading}</h3>
                <ul>
                    {bullets.map((b, i) => (
                        <li key={i}>
                            <span className="hc-bullet-check">{Icons.check}</span>
                            {b}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hc-feature-image">
                <div className={`hc-img-tilt ${reversed ? 'hc-tilt-right' : 'hc-tilt-left'}`}>
                    {imageSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imageSrc} alt={screenshotLabel} className="hc-real-img" />
                    ) : (
                        <ScreenPlaceholder label={screenshotLabel} />
                    )}
                </div>
            </div>
        </div>
    );
}

/* ==========================================
   MAIN PAGE
   ========================================== */
export default function HealthcarePage() {
    useScrollReveal();
    useJourneyAnimation();

    return (
        <main>

            {/* ========== HERO ========== */}
            <section className="hc-hero">
                <div className="hc-hero-bg" />
                <div className="container">
                    <div className="hc-hero-grid">
                        <div className="hc-hero-content">
                            {/* Exclusivity badge */}
                            <div className="hc-exclusive-badge">
                                <span className="hc-badge-left">
                                    <span className="hc-badge-star">✦</span>
                                    By Invitation Only
                                </span>
                                <span className="hc-badge-divider" />
                                <span className="hc-badge-right">
                                    Limited to <span className="hc-badge-count">100</span> Clinics / City
                                </span>
                                <span className="hc-badge-shimmer" />
                            </div>
                            <h1>The Clinic Platform Built for Top Doctors</h1>
                            <p>
                                A premium, AI-powered operating system for leading dermatologists
                                and specialist clinics. Your patients. Your data. Your growth —
                                never shared with competitors.
                            </p>
                            <div className="hc-hero-cta">
                                <a
                                    href="https://wa.me/918956366659?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20access%20to%20AICE%20Healthcare"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-lg"
                                >
                                    Apply for Access {Icons.arrowRight}
                                </a>
                                <a
                                    href="https://arna-leadgen-crm-emr.vercel.app/dashboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary btn-lg"
                                >
                                    See Live Demo {Icons.arrowRight}
                                </a>
                            </div>
                        </div>
                        <div className="hc-hero-visual">
                            <div className="hc-hero-img-wrap">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/healthcare/01-dashboard.png" alt="AICE Healthcare Dashboard" className="hc-real-img" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust bar */}
                <div className="hc-trust-bar">
                    <span className="hc-trust-label">Trusted by leading clinics in Hyderabad</span>
                    <div className="hc-trust-logos">
                        {['Arna Skin Clinic', 'DermaCare', 'SmileDent', 'GlowSkin Studio', 'Elite Aesthetics'].map((name) => (
                            <span key={name} className="hc-trust-logo">{name}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== PROBLEM STATEMENT ========== */}
            <section className="hc-problems">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">The Challenge</span>
                        <h2>Sound Familiar?</h2>
                        <p className="hc-section-subtitle">
                            Every clinic faces the same operational bottlenecks. Here&apos;s what we hear most.
                        </p>
                    </div>
                    <div className="hc-problems-grid">
                        {[
                            { icon: Icons.smartphone, title: 'Leads Lost in DMs', desc: 'Instagram and Facebook ad leads scatter across platforms. No one follows up systematically. Money wasted.' },
                            { icon: Icons.fileText, title: 'Patient Records on Paper', desc: 'Paper forms, physical files, handwritten notes. Finding a patient\'s history means digging through cabinets.' },
                            { icon: Icons.messageCircle, title: 'Manual WhatsApp, One by One', desc: 'Your staff sends appointment reminders, offers, and prescriptions to patients one message at a time.' },
                            { icon: Icons.penTool, title: 'Consent Forms in Filing Cabinets', desc: 'Printed consent forms signed with pen, stored in folders. No digital backup. Hard to retrieve when needed.' },
                        ].map((card, i) => (
                            <div key={i} className="hc-problem-card hc-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="hc-problem-icon">{card.icon}</div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== DATA TRUST (NEW) ========== */}
            <section className="hc-data-trust">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label hc-label-onlight">Data Privacy</span>
                        <h2>Your Data Stays Yours. Always.</h2>
                        <p className="hc-section-subtitle">
                            Read your EMR&apos;s Terms of Service carefully. Here&apos;s what the fine print says — and what it means for your practice.
                        </p>
                    </div>

                    <div className="hc-comparison-grid hc-reveal">
                        {/* Negative column */}
                        <div className="hc-comp-col hc-comp-negative">
                            <div className="hc-comp-col-header hc-comp-header-neg">
                                <span className="hc-comp-platform-badge">⚠ Practo &amp; HealthPlix</span>
                                <h3>What Their ToS Actually Allows</h3>
                            </div>
                            <ul className="hc-comp-list">
                                {[
                                    'Your prescription data sold to pharma as "Real World Evidence"',
                                    'Competing doctors boosted using insights from your patients',
                                    'Patients poached via SMS after booking at your clinic',
                                    'All in-app calls recorded and stored on their servers',
                                    'Your data stays with them even after you cancel',
                                ].map((item, i) => (
                                    <li key={i} className="hc-comp-item hc-comp-item-neg">
                                        <span className="hc-comp-icon hc-icon-x">{Icons.xCircle}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Divider */}
                        <div className="hc-comp-vs">
                            <span>vs</span>
                        </div>

                        {/* Positive column */}
                        <div className="hc-comp-col hc-comp-positive">
                            <div className="hc-comp-col-header hc-comp-header-pos">
                                <span className="hc-comp-aice-badge">{Icons.shield} AICE Healthcare</span>
                                <h3>Our Contractual Guarantees</h3>
                            </div>
                            <ul className="hc-comp-list">
                                {[
                                    'Zero pharma data deals. Your prescriptions stay private.',
                                    'AES-256 encrypted, clinic-isolated database',
                                    'No marketplace. Your patients cannot be redirected.',
                                    'Full export and verified deletion within 30 days of cancellation',
                                    'Tamper-proof audit log on every record access',
                                ].map((item, i) => (
                                    <li key={i} className="hc-comp-item hc-comp-item-pos">
                                        <span className="hc-comp-icon hc-icon-check">{Icons.checkCircle}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="hc-trust-statement hc-reveal">
                        <div className="hc-trust-shield">{Icons.lock}</div>
                        <p>&ldquo;We make money from our platform fee, not from your data.<br />That&apos;s the only business model where your interests and ours are aligned.&rdquo;</p>
                    </div>
                </div>
            </section>

            {/* ========== PATIENT JOURNEY ========== */}
            <section className="hc-journey">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">The Solution</span>
                        <h2>One Platform. Everything Connected.</h2>
                        <p className="hc-section-subtitle">
                            From first ad click to repeat visit — every step automated, every record digital.
                        </p>
                    </div>
                    <div className="hc-journey-flow">
                        <JourneyNode icon={Icons.megaphone} label="Ad Click" />
                        <div className="hc-journey-arrow" />
                        <JourneyNode icon={Icons.users} label="Lead Captured" />
                        <div className="hc-journey-arrow" />
                        <JourneyNode icon={Icons.messageCircle} label="WhatsApp Bot Books" />
                        <div className="hc-journey-arrow" />
                        <JourneyNode icon={Icons.clipboard} label="Digital Form Filled" />
                        <div className="hc-journey-arrow" />
                        <JourneyNode icon={Icons.heart} label="Doctor Consultation" />
                        <div className="hc-journey-arrow" />
                        <JourneyNode icon={Icons.pill} label="Rx via WhatsApp" />
                        <div className="hc-journey-arrow" />
                        <JourneyNode icon={Icons.receipt} label="Bill &amp; Loyalty" />
                        <div className="hc-journey-arrow" />
                        <JourneyNode icon={Icons.trendingUp} label="Patient Returns" />
                    </div>
                </div>
            </section>

            {/* ========== FEATURES ========== */}
            <section className="hc-features">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Features</span>
                        <h2>What&apos;s Inside</h2>
                        <p className="hc-section-subtitle">Every tool your clinic needs — built into one unified platform.</p>
                    </div>

                    <FeatureRow heading="Every Lead, One Dashboard" icon={Icons.users}
                        bullets={['Capture leads from Instagram, Facebook & Google ads automatically', 'See lead source, interest, status — at a glance', 'AI-generated lead summaries and engagement scoring', 'Follow up via WhatsApp directly from the dashboard']}
                        screenshotLabel="Lead CRM Dashboard" screenshotComment="Lead CRM screenshot"
                        imageSrc="/healthcare/02-leads.png" />

                    <FeatureRow heading="Patient Records, Fully Digital" icon={Icons.heart} reversed
                        bullets={['Complete patient profiles — history, allergies, medications, treatment tags', 'Visit-by-visit timeline with diagnosis, treatment notes, and photos', 'Before/after photos attached to each visit', 'Search patients by name, phone, or treatment type']}
                        screenshotLabel="Patient Records (EHR)" screenshotComment="Patient records screenshot"
                        imageSrc="/healthcare/03-patients.png" />

                    <FeatureRow heading="Appointments That Manage Themselves" icon={Icons.calendar}
                        bullets={['Patients book via WhatsApp — AI handles scheduling', 'Automatic reminders 24 hours and 2 hours before', 'No-show tracking and rebooking suggestions', 'Calendar view for the doctor to see the full day']}
                        screenshotLabel="Smart Appointments" screenshotComment="Appointments calendar screenshot"
                        imageSrc="/healthcare/04-appointments.png" />

                    <FeatureRow heading="Forms on WhatsApp. Signatures on iPad." icon={Icons.clipboard} reversed
                        bullets={['Send client data forms to patients on WhatsApp before they arrive', 'Patient fills medical history, allergies, treatment interest — digitally', 'Consent forms with digital signature capture on iPad at the clinic', 'Everything stored in the patient\'s record — no paper, no filing']}
                        screenshotLabel="Digital Forms & Consent" screenshotComment="Consent form screenshot"
                        imageSrc="/healthcare/05-forms.png" />

                    <FeatureRow heading="Prescriptions, Sent in One Click" icon={Icons.pill}
                        bullets={['Create prescriptions with medicine name, dosage, frequency, duration', 'Send directly to patient\'s WhatsApp — instantly', 'Stored in patient\'s digital record permanently', 'Searchable — find all patients prescribed a specific medicine']}
                        screenshotLabel="Prescription Management" screenshotComment="Prescription page screenshot"
                        imageSrc="/healthcare/06-prescriptions.png" />

                    <FeatureRow heading="Billing That Builds Loyalty" icon={Icons.receipt} reversed
                        bullets={['Consultation, service, and medicine billing — all in one place', 'Built-in loyalty points system — patients earn and redeem points', 'Bills sent to patients via WhatsApp automatically', 'Track revenue by service type, doctor, and time period']}
                        screenshotLabel="Billing & Loyalty Points" screenshotComment="Billing page screenshot"
                        imageSrc="/healthcare/07-billing.png" />

                    <FeatureRow heading="Right Message. Right Patients. Right Time." icon={Icons.megaphone}
                        bullets={['Segment patients by treatment type — Laser, Botox, Acne, Hair Fall', 'Send targeted offers only to relevant patients', 'No more manual one-by-one messaging', 'Track delivery, read receipts, and responses']}
                        screenshotLabel="WhatsApp Campaigns" screenshotComment="Campaign builder screenshot"
                        imageSrc="/healthcare/08-campaigns.png" />
                </div>
            </section>

            {/* ========== VIDEO ========== */}
            <section className="hc-video-section">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Demo</span>
                        <h2>See It In Action</h2>
                        <p className="hc-section-subtitle">Watch how AICE transforms a clinic&apos;s daily operations in 90 seconds.</p>
                    </div>
                    <div className="hc-video-cta">
                        <a href="https://arna-leadgen-crm-emr.vercel.app/dashboard" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                            Try the Live Demo Yourself {Icons.arrowRight}
                        </a>
                    </div>
                </div>
            </section>

            {/* ========== ROI NUMBERS ========== */}
            <section className="hc-roi">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Impact</span>
                        <h2>The Math Works</h2>
                    </div>
                    <div className="hc-roi-grid hc-reveal">
                        {[
                            { icon: Icons.trendingUp, num: 40, suffix: '%', label: 'Reduction in No-Shows', sub: 'with automated WhatsApp reminders' },
                            { icon: Icons.clock, num: 3, suffix: ' hrs/day', label: 'Staff Time Saved', sub: 'on manual messaging and record-keeping' },
                            { icon: Icons.target, num: 100, suffix: '%', label: 'Lead Capture Rate', sub: 'from Instagram, Facebook & Google ads' },
                            { icon: Icons.indianRupee, num: 35, prefix: '₹', suffix: 'K+/mo', label: 'Extra Monthly Revenue', sub: 'from recovered no-shows and WhatsApp campaigns' },
                        ].map((stat, i) => (
                            <div key={i} className="hc-roi-card" style={{ transitionDelay: `${i * 80}ms` }}>
                                <div className="hc-roi-icon">{stat.icon}</div>
                                <CountStat num={stat.num} suffix={stat.suffix} prefix={stat.prefix} />
                                <div className="hc-roi-label">{stat.label}</div>
                                <div className="hc-roi-sub">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                    <p className="hc-roi-tagline hc-reveal">Pays for itself with just 5 patients per month.</p>
                </div>
            </section>

            {/* ========== WHO IT'S FOR (dark bg, no salons) ========== */}
            <section className="hc-audience">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label hc-label-ondark">Built For You</span>
                        <h2 className="hc-heading-ondark">Who It&apos;s For</h2>
                    </div>
                    <div className="hc-audience-grid hc-reveal">
                        {[
                            { icon: Icons.sparkles, title: 'Dermatology & Aesthetic Clinics', desc: 'Manage laser, Botox, chemical peel patients. Track sessions, send targeted treatment offers, build long-term loyalty.' },
                            { icon: Icons.stethoscope, title: 'Dental Clinics', desc: 'Appointment booking, treatment records, and automated recall campaigns for checkups and cleanings.' },
                            { icon: Icons.building, title: 'Multi-Specialty Clinics', desc: 'Multiple doctors, multiple departments — one unified patient management system with role-based access.' },
                        ].map((card, i) => (
                            <div key={i} className="hc-audience-card" style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="hc-audience-icon">{card.icon}</div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== EXCLUSIVITY (NEW) ========== */}
            <section className="hc-exclusivity">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label hc-label-ondark">Exclusive Access</span>
                        <h2 className="hc-heading-ondark">Built for the Best.<br />Not for Everyone.</h2>
                    </div>
                    <p className="hc-excl-intro hc-reveal">
                        AICE Healthcare is available by application only. We onboard a maximum of{' '}
                        <strong>100 clinics per city</strong> to ensure every doctor gets dedicated support,
                        custom configuration, and a platform that&apos;s never crowded.
                    </p>
                    <div className="hc-excl-cards hc-reveal">
                        {[
                            {
                                icon: Icons.concierge,
                                title: 'Dedicated Setup',
                                desc: 'A dedicated specialist configures the entire system for your clinic — your schedule, your treatments, your forms, your branding.',
                            },
                            {
                                icon: Icons.lock,
                                title: 'Data Isolation',
                                desc: 'Every clinic gets isolated data infrastructure. Your patient records are never co-mingled with other clinics.',
                            },
                            {
                                icon: Icons.headset,
                                title: 'Priority Support',
                                desc: 'Direct WhatsApp access to your account manager. Issues resolved in hours, not days.',
                            },
                        ].map((card, i) => (
                            <div key={i} className="hc-excl-card" style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="hc-excl-icon">{card.icon}</div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="hc-excl-cities hc-reveal">
                        Currently accepting applications in: <strong>Hyderabad</strong>
                        <span className="hc-cities-sep">&middot;</span>
                        <span className="hc-cities-soon">Coming soon to Bangalore, Mumbai, Chennai</span>
                    </div>
                    <div className="hc-excl-cta hc-reveal">
                        <a
                            href="https://wa.me/918956366659?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20access%20to%20AICE%20Healthcare"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            Apply for Access {Icons.arrowRight}
                        </a>
                    </div>
                </div>
            </section>

            {/* ========== TESTIMONIAL (updated) ========== */}
            <section className="hc-testimonial">
                <div className="container">
                    <div className="hc-testimonial-card hc-reveal">
                        <div className="hc-testimonial-stars">
                            {Icons.star}{Icons.star}{Icons.star}{Icons.star}{Icons.star}
                        </div>
                        {/* REPLACE: Real testimonial once available */}
                        <blockquote>
                            &ldquo;We tried Practo and HealthPlix. Both used our patient data to show ads for
                            competing clinics right on our listing page. AICE was the first platform that
                            actually guaranteed our data stays private. The product is excellent — but the
                            trust is what made us switch.&rdquo;
                        </blockquote>
                        <div className="hc-testimonial-author">
                            <div className="hc-testimonial-avatar">KR</div>
                            <div>
                                <div className="hc-testimonial-name">Dr. Kavitha Reddy</div>
                                <div className="hc-testimonial-role">Founder, Elite Skin &amp; Laser Clinic</div>
                                <div className="hc-testimonial-location">Hyderabad, India</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== PRICING (3 tiers, no price) ========== */}
            <section className="hc-pricing">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Investment</span>
                        <h2>Pricing Tailored to Your Clinic</h2>
                        <p className="hc-section-subtitle">
                            Every plan includes full setup, data migration, staff training, and priority support.
                            We&apos;ll discuss the right plan after reviewing your application.
                        </p>
                    </div>
                    <div className="hc-pricing-tiers hc-reveal">
                        {[
                            {
                                name: 'Solo Practice',
                                sub: '1 doctor · 1 location',
                                features: ['All core features', 'Lead CRM + EHR + Appointments', 'WhatsApp Bot & Campaigns', 'Billing & Loyalty'],
                                ideal: 'Ideal for independent specialists',
                                featured: false,
                            },
                            {
                                name: 'Growing Clinic',
                                sub: '2–3 doctors · 1 location',
                                features: ['Everything in Solo', 'Advanced campaign segmentation', 'Multi-doctor scheduling', 'Performance analytics'],
                                ideal: 'For clinics scaling their practice',
                                featured: true,
                            },
                            {
                                name: 'Multi-Location',
                                sub: 'Unlimited doctors · Multiple locations',
                                features: ['Everything in Growing', 'Custom integrations', 'Dedicated account manager', 'SLA-backed support'],
                                ideal: 'For clinic chains & hospital depts',
                                featured: false,
                            },
                        ].map((tier, i) => (
                            <div key={i} className={`hc-tier-card ${tier.featured ? 'hc-tier-featured' : ''}`}>
                                {tier.featured && <span className="hc-tier-badge">Most Popular</span>}
                                <h3 className="hc-tier-name">{tier.name}</h3>
                                <p className="hc-tier-sub">{tier.sub}</p>
                                <ul className="hc-tier-features">
                                    {tier.features.map((f, j) => (
                                        <li key={j}>
                                            <span className="hc-bullet-check">{Icons.check}</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <p className="hc-tier-ideal">{tier.ideal}</p>
                            </div>
                        ))}
                    </div>
                    <div className="hc-pricing-footer hc-reveal">
                        <p>All plans include a <strong>2-week complimentary trial</strong>. Apply to discuss pricing with our team.</p>
                        <a
                            href="https://wa.me/918956366659?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20access%20to%20AICE%20Healthcare"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            Apply for Access {Icons.arrowRight}
                        </a>
                    </div>
                </div>
            </section>

            {/* ========== FINAL CTA (updated) ========== */}
            <section className="hc-final-cta">
                <div className="container">
                    <div className="hc-cta-grid">
                        <div className="hc-cta-card">
                            <h3>Ready to Join the Top 100?</h3>
                            <p>Apply for early access to AICE Healthcare in your city. Limited spots available.</p>
                            <a
                                href="https://wa.me/918956366659?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20access%20to%20AICE%20Healthcare"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-lg"
                            >
                                Apply for Access {Icons.arrowRight}
                            </a>
                        </div>
                        <div className="hc-cta-card hc-cta-whatsapp">
                            <h3>Have Questions?</h3>
                            <p>Our team is available on WhatsApp. No sales pitch — just honest answers about whether this is right for your clinic.</p>
                            <a
                                href="https://wa.me/918956366659"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hc-wa-btn"
                            >
                                {Icons.whatsapp} WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== ALL STYLES ========== */}
            <style jsx global>{`

/* ==========================================
   BASE CONTAINER
   ========================================== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-6);
}

/* ==========================================
   HERO
   ========================================== */
.hc-hero {
    position: relative;
    padding: 120px 0 0;
    overflow: hidden;
    background: var(--color-white);
}
.hc-hero-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #EBF5FF 0%, #F8FBFE 40%, #FFFFFF 100%);
    z-index: 0;
}
.hc-hero .container { position: relative; z-index: 1; }
.hc-hero-grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: var(--spacing-10);
    align-items: center;
}
.hc-hero-content { max-width: 520px; }

/* Gold exclusivity badge */
@keyframes hc-badge-shimmer {
    0%   { transform: translateX(-120%); }
    60%  { transform: translateX(120%); }
    100% { transform: translateX(120%); }
}
.hc-exclusive-badge {
    display: inline-flex;
    align-items: center;
    gap: 0;
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 55%, #fef9c3 100%);
    border: 1px solid rgba(245, 158, 11, 0.5);
    border-radius: 999px;
    margin-bottom: var(--spacing-5);
    overflow: hidden;
    position: relative;
    box-shadow:
        0 2px 12px rgba(245, 158, 11, 0.25),
        0 1px 3px rgba(245, 158, 11, 0.15),
        inset 0 1px 0 rgba(255,255,255,0.6);
}
.hc-badge-left {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 16px;
    color: #78350f;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    white-space: nowrap;
}
.hc-badge-divider {
    width: 1px;
    height: 16px;
    background: rgba(180, 100, 0, 0.3);
    flex-shrink: 0;
}
.hc-badge-right {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 9px 16px;
    color: #92400e;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
}
.hc-badge-count {
    font-size: 13px;
    font-weight: 800;
    color: #b45309;
    letter-spacing: 0;
}
.hc-badge-star {
    color: #d97706;
    font-size: 11px;
    line-height: 1;
}
.hc-badge-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        105deg,
        transparent 30%,
        rgba(255, 255, 255, 0.55) 50%,
        transparent 70%
    );
    animation: hc-badge-shimmer 3.5s ease-in-out infinite;
    pointer-events: none;
}

.hc-hero-content h1 {
    font-size: var(--text-5xl);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: var(--spacing-6);
    color: var(--color-text);
}
.hc-hero-content p {
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: var(--spacing-8);
}
.hc-hero-cta {
    display: flex;
    gap: var(--spacing-4);
    flex-wrap: wrap;
}
.hc-hero-visual {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: -48px;
}
.hc-hero-img-wrap {
    width: 100%;
    filter:
        drop-shadow(0 2px 0 rgba(59,130,246,0.08))
        drop-shadow(0 30px 70px rgba(0,0,0,0.22))
        drop-shadow(0 8px 30px rgba(59,130,246,0.14));
    transform: perspective(1400px) rotateY(-5deg) rotateX(3deg) translateY(20px);
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                filter 0.6s ease;
}
.hc-hero-img-wrap:hover {
    transform: perspective(1400px) rotateY(-1deg) rotateX(0deg) translateY(0px);
    filter:
        drop-shadow(0 40px 90px rgba(0,0,0,0.18))
        drop-shadow(0 8px 30px rgba(59,130,246,0.1));
}

/* ==========================================
   TRUST BAR
   ========================================== */
.hc-trust-bar {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: var(--spacing-10) 0 var(--spacing-10);
    border-top: 1px solid var(--color-gray-100);
    margin-top: var(--spacing-16);
}
.hc-trust-label {
    font-size: 11px;
    color: var(--color-text-muted);
    font-weight: var(--font-medium);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    display: block;
    margin-bottom: var(--spacing-4);
}
.hc-trust-logos {
    display: flex;
    justify-content: center;
    gap: var(--spacing-8);
    flex-wrap: wrap;
}
.hc-trust-logo {
    font-size: 13px;
    font-weight: var(--font-semibold);
    color: var(--color-gray-300);
    letter-spacing: 0.02em;
    filter: grayscale(1);
    opacity: 0.5;
    transition: opacity 0.2s;
}
.hc-trust-logo:hover { opacity: 0.8; }

/* ==========================================
   SECTION HEADERS
   ========================================== */
.hc-section-header {
    text-align: center;
    margin-bottom: 3.5rem;
}
.hc-section-label {
    display: inline-block;
    padding: 5px 14px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: var(--color-accent-blue);
    font-size: 11px;
    font-weight: 700;
    border-radius: var(--radius-full);
    margin-bottom: var(--spacing-4);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.hc-label-ondark {
    background: rgba(59,130,246,0.15);
    color: #93c5fd;
}
.hc-label-onlight {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: var(--color-accent-blue);
}
.hc-section-header h2 {
    font-size: var(--text-4xl);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: var(--spacing-4);
    color: var(--color-text);
}
.hc-heading-ondark {
    color: var(--color-white) !important;
}
.hc-section-subtitle {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
}

/* ==========================================
   PROBLEM CARDS — glassmorphism on dark
   ========================================== */
.hc-problems {
    padding: var(--spacing-24) 0;
    background: #f8fafc;
}
.hc-problems-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-5);
}
.hc-problem-card {
    background: #0f172a;
    border-radius: var(--radius-xl);
    padding: var(--spacing-8);
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.06);
    border-top: 3px solid var(--color-accent-blue);
    position: relative;
    overflow: hidden;
}
.hc-problem-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 60%);
    pointer-events: none;
}
.hc-problem-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    border-top-color: #60a5fa;
}
.hc-problem-icon {
    width: 44px;
    height: 44px;
    background: rgba(59, 130, 246, 0.12);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-5);
    color: var(--color-accent-blue);
}
.hc-problem-card h3 {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--color-white);
    margin-bottom: var(--spacing-3);
    letter-spacing: -0.01em;
}
.hc-problem-card p {
    font-size: 13px;
    color: rgba(148,163,184,0.9);
    line-height: 1.65;
}

/* ==========================================
   DATA TRUST SECTION
   ========================================== */
.hc-data-trust {
    padding: var(--spacing-24) 0;
    background: #080f1d;
}
.hc-data-trust .hc-section-header h2 {
    color: var(--color-white);
}
.hc-data-trust .hc-section-subtitle {
    color: rgba(148,163,184,0.8);
}

.hc-comparison-grid {
    display: grid;
    grid-template-columns: 1fr 56px 1fr;
    gap: 0;
    align-items: stretch;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 40px 80px rgba(0,0,0,0.4);
}

/* Negative column */
.hc-comp-negative {
    background: #110a0a;
    padding: var(--spacing-10);
    border-right: 1px solid rgba(255,255,255,0.04);
}
.hc-comp-header-neg {
    margin-bottom: var(--spacing-8);
    padding-bottom: var(--spacing-6);
    border-bottom: 1px solid rgba(255,255,255,0.06);
}
.hc-comp-platform-badge {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(239,68,68,0.12);
    color: #f87171;
    font-size: 11px;
    font-weight: 700;
    border-radius: 999px;
    letter-spacing: 0.04em;
    margin-bottom: var(--spacing-3);
}
.hc-comp-header-neg h3 {
    font-size: var(--text-xl);
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    letter-spacing: -0.01em;
}

/* Positive column */
.hc-comp-positive {
    background: #ffffff;
    padding: var(--spacing-10);
}
.hc-comp-header-pos {
    margin-bottom: var(--spacing-8);
    padding-bottom: var(--spacing-6);
    border-bottom: 1px solid #e2e8f0;
}
.hc-comp-aice-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    color: var(--color-accent-blue);
    font-size: 11px;
    font-weight: 700;
    border-radius: 999px;
    letter-spacing: 0.04em;
    margin-bottom: var(--spacing-3);
}
.hc-comp-aice-badge svg { width: 13px; height: 13px; }
.hc-comp-header-pos h3 {
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-text);
    letter-spacing: -0.01em;
}

/* VS divider */
.hc-comp-vs {
    background: #0d1320;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(255,255,255,0.04);
    border-right: 1px solid rgba(255,255,255,0.04);
}
.hc-comp-vs span {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    writing-mode: vertical-rl;
}

/* List items */
.hc-comp-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}
.hc-comp-item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-3);
    font-size: 14px;
    line-height: 1.55;
}
.hc-comp-item-neg {
    color: rgba(203,213,225,0.7);
}
.hc-comp-item-pos {
    color: var(--color-text-secondary);
}
.hc-comp-icon {
    flex-shrink: 0;
    margin-top: 2px;
}
.hc-icon-x { color: #f87171; }
.hc-icon-check { color: #22c55e; }

/* Trust statement */
.hc-trust-statement {
    margin-top: var(--spacing-12);
    text-align: center;
}
.hc-trust-shield {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(59,130,246,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    margin: 0 auto var(--spacing-5);
}
.hc-trust-statement p {
    font-size: var(--text-xl);
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    line-height: 1.6;
}

/* ==========================================
   PATIENT JOURNEY
   ========================================== */
.hc-journey {
    padding: var(--spacing-24) 0;
    background: linear-gradient(180deg, #F8FBFE 0%, #EBF5FF 100%);
}
.hc-journey-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    padding: var(--spacing-8) 0;
}
.hc-journey-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2);
    opacity: 0;
    transform: scale(0.8) translateY(8px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}
.hc-journey-animate .hc-journey-node { opacity: 1; transform: scale(1) translateY(0); }
.hc-journey-animate .hc-journey-node:nth-child(1)  { transition-delay: 0ms; }
.hc-journey-animate .hc-journey-node:nth-child(3)  { transition-delay: 200ms; }
.hc-journey-animate .hc-journey-node:nth-child(5)  { transition-delay: 400ms; }
.hc-journey-animate .hc-journey-node:nth-child(7)  { transition-delay: 600ms; }
.hc-journey-animate .hc-journey-node:nth-child(9)  { transition-delay: 800ms; }
.hc-journey-animate .hc-journey-node:nth-child(11) { transition-delay: 1000ms; }
.hc-journey-animate .hc-journey-node:nth-child(13) { transition-delay: 1200ms; }
.hc-journey-animate .hc-journey-node:nth-child(15) { transition-delay: 1400ms; }

@keyframes hc-pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(59,130,246,0.35); }
    70%  { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
    100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
}
.hc-journey-icon {
    width: 56px;
    height: 56px;
    background: var(--color-white);
    border: 2px solid var(--color-soft-blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent-blue);
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
}
.hc-journey-animate .hc-journey-icon {
    animation: hc-pulse-ring 2.5s ease-out infinite;
}
.hc-journey-node:hover .hc-journey-icon {
    background: var(--color-accent-blue);
    color: var(--color-white);
    border-color: var(--color-accent-blue);
    transform: scale(1.1);
}
.hc-journey-label {
    font-size: 11px;
    font-weight: var(--font-semibold);
    color: var(--color-text-secondary);
    text-align: center;
    max-width: 80px;
    letter-spacing: 0.01em;
}
/* Dotted animated arrows */
.hc-journey-arrow {
    width: 28px;
    height: 2px;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
    position: relative;
    background: repeating-linear-gradient(
        90deg,
        var(--color-accent-blue) 0px,
        var(--color-accent-blue) 3px,
        transparent 3px,
        transparent 7px
    );
}
.hc-journey-arrow::after {
    content: '';
    position: absolute;
    right: -1px;
    top: -4px;
    width: 0;
    height: 0;
    border-left: 6px solid var(--color-accent-blue);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
}
.hc-journey-animate .hc-journey-arrow { opacity: 1; }
.hc-journey-animate .hc-journey-arrow:nth-child(2)  { transition-delay: 150ms; }
.hc-journey-animate .hc-journey-arrow:nth-child(4)  { transition-delay: 350ms; }
.hc-journey-animate .hc-journey-arrow:nth-child(6)  { transition-delay: 550ms; }
.hc-journey-animate .hc-journey-arrow:nth-child(8)  { transition-delay: 750ms; }
.hc-journey-animate .hc-journey-arrow:nth-child(10) { transition-delay: 950ms; }
.hc-journey-animate .hc-journey-arrow:nth-child(12) { transition-delay: 1150ms; }
.hc-journey-animate .hc-journey-arrow:nth-child(14) { transition-delay: 1350ms; }

/* ==========================================
   FEATURES
   ========================================== */
.hc-features {
    padding: var(--spacing-24) 0;
    background: var(--color-white);
}
.hc-feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-16);
    align-items: center;
    margin-bottom: var(--spacing-24);
}
.hc-feature-row:last-child { margin-bottom: 0; }
.hc-feature-reversed .hc-feature-text { order: 2; }
.hc-feature-reversed .hc-feature-image { order: 1; }
.hc-feature-icon-wrap {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent-blue);
    margin-bottom: var(--spacing-5);
}
.hc-feature-text h3 {
    font-size: var(--text-3xl);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: var(--spacing-6);
    color: var(--color-text);
}
.hc-feature-text ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}
.hc-feature-text li {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-3);
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    line-height: 1.6;
}
.hc-bullet-check {
    width: 20px;
    height: 20px;
    min-width: 20px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent-blue);
    margin-top: 2px;
}
/* Perspective tilt on screenshots */
.hc-img-tilt {
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    filter: drop-shadow(0 24px 48px rgba(0,0,0,0.13));
}
.hc-tilt-left  { transform: perspective(1200px) rotateY(-3deg) rotateX(1.5deg); }
.hc-tilt-right { transform: perspective(1200px) rotateY(3deg)  rotateX(1.5deg); }
.hc-feature-image:hover .hc-img-tilt {
    transform: perspective(1200px) rotateY(0deg) rotateX(0deg);
}
/* Real screenshot images */
.hc-real-img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--radius-xl);
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

/* ==========================================
   SCREEN PLACEHOLDER
   ========================================== */
.hc-screen-placeholder {
    width: 100%;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    border: 1px solid var(--color-gray-200);
    background: #f8fafc;
    display: flex;
    flex-direction: column;
}
.hc-browser-chrome {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    padding: 9px 14px;
    background: #e8ecf0;
    border-bottom: 1px solid #d1d9e0;
    flex-shrink: 0;
}
.hc-browser-dots { display: flex; gap: 5px; flex-shrink: 0; }
.hc-browser-dots span { width: 10px; height: 10px; border-radius: 50%; }
.hc-browser-dots span:nth-child(1) { background: #ff5f57; }
.hc-browser-dots span:nth-child(2) { background: #febc2e; }
.hc-browser-dots span:nth-child(3) { background: #28c840; }
.hc-browser-bar {
    flex: 1;
    background: rgba(255,255,255,0.8);
    border-radius: 5px;
    padding: 4px 10px;
    font-size: 10px;
    color: #94a3b8;
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.hc-browser-actions { display: flex; gap: 6px; flex-shrink: 0; }
.hc-browser-btn { width: 14px; height: 14px; border-radius: 3px; background: rgba(255,255,255,0.5); display: block; }
.hc-screen-body { display: flex; flex: 1; min-height: 260px; background: #f1f5f9; }
.hc-mock-sidebar { width: 52px; background: #0f172a; padding: 12px 8px; display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
.hc-mock-logo { width: 28px; height: 28px; background: #3b82f6; border-radius: 6px; margin-bottom: 10px; }
.hc-mock-nav-item { width: 28px; height: 28px; background: rgba(255,255,255,0.1); border-radius: 6px; }
.hc-mock-nav-item.active { background: #3b82f6; }
.hc-mock-main { flex: 1; display: flex; flex-direction: column; padding: 12px; gap: 10px; position: relative; min-width: 0; }
.hc-mock-topbar { display: flex; justify-content: space-between; align-items: center; background: white; border-radius: 8px; padding: 8px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.hc-mock-page-title { width: 100px; height: 10px; background: #1e293b; border-radius: 4px; }
.hc-mock-topbar-right { display: flex; gap: 8px; align-items: center; }
.hc-mock-search { width: 80px; height: 10px; background: #e2e8f0; border-radius: 4px; }
.hc-mock-avatar { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #1e40af); }
.hc-mock-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.hc-mock-stat-card { background: white; border-radius: 8px; padding: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.hc-mock-stat-num { width: 50px; height: 14px; background: #1e293b; border-radius: 3px; margin-bottom: 6px; }
.hc-mock-stat-label { width: 36px; height: 8px; background: #e2e8f0; border-radius: 3px; }
.hc-mock-content { flex: 1; }
.hc-mock-table { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.hc-mock-table-header { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 8px; padding: 8px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
.hc-mock-th { height: 8px; background: #94a3b8; border-radius: 3px; }
.hc-mock-table-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 8px; padding: 8px 12px; border-bottom: 1px solid #f1f5f9; align-items: center; }
.hc-mock-table-row:last-child { border-bottom: none; }
.hc-mock-td { height: 8px; background: #e2e8f0; border-radius: 3px; }
.hc-mock-td-name { background: #1e293b; width: 80%; }
.hc-mock-badge { width: 40px; height: 16px; background: #dbeafe; border-radius: 20px; }
.hc-screen-label-overlay {
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(15,23,42,0.75);
    backdrop-filter: blur(8px);
    border-radius: 20px;
    padding: 5px 12px;
    color: rgba(255,255,255,0.85);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    pointer-events: none;
}
.hc-screen-label-overlay svg { width: 12px; height: 12px; }

/* ==========================================
   VIDEO SECTION
   ========================================== */
.hc-video-section {
    padding: var(--spacing-24) 0;
    background: #f8fafc;
}
.hc-video-wrapper { max-width: 900px; margin: 0 auto; }
.hc-video-placeholder {
    aspect-ratio: 16/9;
    border-radius: var(--radius-2xl);
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-5);
    box-shadow: var(--shadow-xl);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.05);
}
.hc-video-placeholder:hover { transform: scale(1.01); box-shadow: 0 24px 64px rgba(0,0,0,0.15); }
.hc-video-play {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    transition: all 0.3s ease;
}
.hc-video-placeholder:hover .hc-video-play { background: var(--color-accent-blue); transform: scale(1.1); }
.hc-video-play svg { width: 32px; height: 32px; margin-left: 4px; }
.hc-video-text { font-size: var(--text-base); color: rgba(255,255,255,0.4); font-weight: var(--font-medium); }
.hc-video-cta { text-align: center; margin-top: var(--spacing-8); }

/* ==========================================
   ROI NUMBERS
   ========================================== */
.hc-roi {
    padding: var(--spacing-24) 0;
    background: var(--color-white);
}
.hc-roi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-6);
}
.hc-roi-card {
    text-align: center;
    padding: var(--spacing-8);
    background: var(--color-bg);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-gray-100);
    transition: all 0.3s ease;
}
.hc-roi-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-soft-blue);
}
.hc-roi-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent-blue);
    margin: 0 auto var(--spacing-4);
}
.hc-roi-number {
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.03em;
    margin-bottom: var(--spacing-2);
}
.hc-roi-label { font-size: var(--text-base); font-weight: var(--font-semibold); color: var(--color-text); margin-bottom: var(--spacing-1); }
.hc-roi-sub { font-size: var(--text-sm); color: var(--color-text-muted); }
.hc-roi-tagline { text-align: center; font-size: var(--text-lg); font-weight: var(--font-semibold); color: var(--color-accent-blue); margin-top: var(--spacing-10); }

/* ==========================================
   AUDIENCE — dark background, 3 cards
   ========================================== */
.hc-audience {
    padding: var(--spacing-24) 0;
    background: #080d16;
}
.hc-audience-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-6);
}
.hc-audience-card {
    background: rgba(255,255,255,0.04);
    border-radius: var(--radius-xl);
    padding: var(--spacing-10);
    border: 1px solid rgba(255,255,255,0.07);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}
.hc-audience-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent);
}
.hc-audience-card:hover {
    background: rgba(255,255,255,0.07);
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.hc-audience-icon {
    width: 52px;
    height: 52px;
    background: rgba(59,130,246,0.12);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    margin-bottom: var(--spacing-5);
}
.hc-audience-card h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: rgba(255,255,255,0.9);
    margin-bottom: var(--spacing-3);
    letter-spacing: -0.01em;
}
.hc-audience-card p {
    font-size: 14px;
    color: rgba(148,163,184,0.7);
    line-height: 1.65;
}

/* ==========================================
   EXCLUSIVITY SECTION
   ========================================== */
.hc-exclusivity {
    padding: var(--spacing-24) 0;
    background: #0f172a;
}
.hc-excl-intro {
    font-size: var(--text-lg);
    color: rgba(148,163,184,0.8);
    max-width: 680px;
    margin: 0 auto 3.5rem;
    line-height: 1.75;
    text-align: left;
}
.hc-excl-intro strong {
    color: rgba(255,255,255,0.9);
    font-weight: 600;
}
.hc-excl-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-12);
}
.hc-excl-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-10);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}
.hc-excl-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--color-accent-blue), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.hc-excl-card:hover::after { opacity: 1; }
.hc-excl-card:hover {
    background: rgba(255,255,255,0.07);
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.hc-excl-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(59,130,246,0.12);
    border: 1px solid rgba(59,130,246,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    margin: 0 auto var(--spacing-5);
}
.hc-excl-card h3 {
    font-size: var(--text-lg);
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    margin-bottom: var(--spacing-3);
    letter-spacing: -0.01em;
    text-align: center;
}
.hc-excl-card p {
    font-size: 14px;
    color: rgba(148,163,184,0.7);
    line-height: 1.65;
    text-align: left;
}
.hc-excl-cities {
    font-size: var(--text-base);
    color: rgba(148,163,184,0.6);
    margin-bottom: var(--spacing-10);
    text-align: center;
}
.hc-excl-cta {
    text-align: center;
}
.hc-excl-cities strong { color: rgba(255,255,255,0.85); }
.hc-cities-sep { margin: 0 10px; opacity: 0.4; }
.hc-cities-soon { color: rgba(148,163,184,0.5); }
.hc-excl-cta .btn-primary {
    background: var(--color-accent-blue);
    color: white;
}

/* ==========================================
   TESTIMONIAL
   ========================================== */
.hc-testimonial {
    padding: var(--spacing-24) 0;
    background: linear-gradient(180deg, #EBF5FF 0%, #F8FBFE 100%);
}
.hc-testimonial-card {
    max-width: 780px;
    margin: 0 auto;
    text-align: center;
    background: var(--color-white);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-12) var(--spacing-12);
    box-shadow: 0 20px 60px rgba(0,0,0,0.07);
    border: 1px solid rgba(0,0,0,0.04);
}
.hc-testimonial-stars { display: flex; justify-content: center; gap: 4px; margin-bottom: var(--spacing-6); }
.hc-testimonial-card blockquote {
    font-size: var(--text-xl);
    color: var(--color-text-secondary);
    line-height: 1.75;
    font-style: italic;
    margin-bottom: var(--spacing-8);
    letter-spacing: -0.01em;
}
.hc-testimonial-author { display: flex; align-items: center; justify-content: center; gap: var(--spacing-4); }
.hc-testimonial-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-accent-blue) 0%, #1e40af 100%);
    color: var(--color-white);
    font-weight: var(--font-semibold);
    font-size: var(--text-base);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.hc-testimonial-name { font-weight: var(--font-semibold); color: var(--color-text); font-size: var(--text-base); }
.hc-testimonial-role { font-size: var(--text-sm); color: var(--color-text-secondary); }
.hc-testimonial-location { font-size: var(--text-xs); color: var(--color-text-muted); }
.hc-testimonial-author > div:last-child { text-align: left; }

/* ==========================================
   PRICING — 3 tiers, no price
   ========================================== */
.hc-pricing {
    padding: var(--spacing-24) 0;
    background: var(--color-white);
}
.hc-pricing-tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-6);
    margin-top: 20px;
    margin-bottom: var(--spacing-12);
    align-items: stretch;
}
.hc-tier-card {
    background: var(--color-bg);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-10);
    border: 1px solid var(--color-gray-100);
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
}
.hc-tier-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}
.hc-tier-featured {
    background: var(--color-white);
    border: 2px solid var(--color-accent-blue);
    box-shadow: 0 12px 40px rgba(59,130,246,0.1);
    padding-top: 3rem;
}
.hc-tier-featured:hover {
    box-shadow: 0 20px 60px rgba(59,130,246,0.15);
}
.hc-tier-badge {
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-accent-blue);
    color: white;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 16px;
    border-radius: 999px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
}
.hc-tier-name {
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--spacing-1);
    letter-spacing: -0.02em;
}
.hc-tier-sub {
    font-size: 13px;
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-6);
    padding-bottom: var(--spacing-6);
    border-bottom: 1px solid var(--color-gray-100);
}
.hc-tier-features {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-6);
}
.hc-tier-features li {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-3);
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.5;
}
.hc-tier-ideal {
    font-size: 13px;
    color: var(--color-accent-blue);
    font-weight: var(--font-medium);
    padding-top: var(--spacing-4);
    border-top: 1px solid var(--color-gray-100);
}
.hc-pricing-footer {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-6);
}
.hc-pricing-footer p {
    font-size: var(--text-base);
    color: var(--color-text-muted);
}
.hc-pricing-footer strong { color: var(--color-text); }

/* ==========================================
   FINAL CTA
   ========================================== */
.hc-final-cta {
    padding: var(--spacing-20) 0;
    background: var(--color-gray-900);
}
.hc-cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-6); }
.hc-cta-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-10);
    text-align: left;
}
.hc-cta-card h3 { font-size: var(--text-2xl); font-weight: 700; color: var(--color-white); margin-bottom: var(--spacing-3); }
.hc-cta-card p { font-size: var(--text-base); color: var(--color-gray-400); margin-bottom: var(--spacing-6); line-height: 1.6; }
.hc-cta-card .btn-primary { background: var(--color-white); color: var(--color-black); }
.hc-cta-card .btn-primary:hover { background: var(--color-gray-100); }
.hc-wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 28px;
    background: #25D366;
    color: var(--color-white);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    border-radius: 8px;
    transition: all 0.2s ease;
}
.hc-wa-btn:hover { background: #20bd5a; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(37,211,102,0.3); }

/* ==========================================
   SCROLL REVEAL
   ========================================== */
.hc-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
}
.hc-visible { opacity: 1; transform: translateY(0); }

/* ==========================================
   RESPONSIVE
   ========================================== */
@media (max-width: 1024px) {
    .hc-hero-grid { grid-template-columns: 1fr; gap: var(--spacing-10); }
    .hc-hero-content { max-width: 100%; text-align: center; }
    .hc-hero-cta { justify-content: center; }
    .hc-hero-visual { margin-right: 0; justify-content: center; align-items: center; }
    .hc-hero-img-wrap { transform: none; max-width: 700px; margin: 0 auto; filter: drop-shadow(0 24px 50px rgba(0,0,0,0.18)); }
    .hc-problems-grid { grid-template-columns: repeat(2, 1fr); }
    .hc-comparison-grid { grid-template-columns: 1fr; }
    .hc-comp-vs { writing-mode: horizontal-tb; padding: var(--spacing-4); height: auto; }
    .hc-comp-vs span { writing-mode: horizontal-tb; }
    .hc-feature-row { grid-template-columns: 1fr; gap: var(--spacing-10); }
    .hc-feature-reversed .hc-feature-text { order: 1; }
    .hc-feature-reversed .hc-feature-image { order: 2; }
    .hc-img-tilt { transform: none !important; }
    .hc-roi-grid { grid-template-columns: repeat(2, 1fr); }
    .hc-audience-grid { grid-template-columns: repeat(3, 1fr); }
    .hc-excl-cards { grid-template-columns: repeat(3, 1fr); }
    .hc-pricing-tiers { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; }
    .hc-cta-grid { grid-template-columns: 1fr; }
    .hc-journey-flow { gap: var(--spacing-1); }
    .hc-journey-arrow { width: 16px; }
}

@media (max-width: 768px) {
    .hc-hero { padding: 130px 0 0; }
    .hc-problems-grid { grid-template-columns: 1fr; }
    .hc-roi-grid { grid-template-columns: 1fr 1fr; }
    .hc-audience-grid { grid-template-columns: 1fr; }
    .hc-excl-cards { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto var(--spacing-12); }
    .hc-hero-cta { flex-direction: column; align-items: center; }
    .hc-trust-logos { gap: var(--spacing-5); }
    .hc-journey-flow { flex-direction: column; gap: 4px; }
    .hc-journey-arrow { width: 2px; height: 20px; }
    .hc-journey-arrow { background: repeating-linear-gradient(180deg, var(--color-accent-blue) 0px, var(--color-accent-blue) 3px, transparent 3px, transparent 7px); }
    .hc-journey-arrow::after { right: -3px; top: auto; bottom: -1px; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 6px solid var(--color-accent-blue); border-bottom: none; }
    .hc-cta-card { padding: var(--spacing-8); text-align: center; }
    .hc-testimonial-card { padding: var(--spacing-8) var(--spacing-6); }
    .hc-comparison-grid { border-radius: var(--radius-xl); }
    .hc-comp-negative, .hc-comp-positive { padding: var(--spacing-8); }
    .hc-testimonial-card blockquote { font-size: var(--text-base); }
}

@media (max-width: 480px) {
    .hc-roi-grid { grid-template-columns: 1fr; }
    .hc-badge-left, .hc-badge-right { font-size: 10px; padding: 8px 12px; }
    .hc-badge-count { font-size: 12px; }
}

            `}</style>
        </main>
    );
}
