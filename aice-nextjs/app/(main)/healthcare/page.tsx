'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/* ==========================================
   SCROLL REVEAL HOOK
   ========================================== */
function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('hc-visible');
                    }
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
   PATIENT JOURNEY ANIMATION HOOK
   ========================================== */
function useJourneyAnimation() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('hc-journey-animate');
                    }
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
   SVG ICONS
   ========================================== */
const Icons = {
    smartphone: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
        </svg>
    ),
    fileText: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
        </svg>
    ),
    messageCircle: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    ),
    penTool: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
        </svg>
    ),
    users: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    heart: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    ),
    calendar: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
        </svg>
    ),
    clipboard: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
        </svg>
    ),
    pill: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" />
        </svg>
    ),
    receipt: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" />
        </svg>
    ),
    megaphone: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 11 18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
    ),
    play: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    ),
    arrowRight: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    ),
    check: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    whatsapp: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    ),
    star: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    trendingUp: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
        </svg>
    ),
    clock: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    target: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
    ),
    indianRupee: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" />
        </svg>
    ),
    sparkles: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
        </svg>
    ),
    scissors: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" /><path d="M8.12 8.12 12 12" /><path d="M20 4 8.12 15.88" /><circle cx="6" cy="18" r="3" /><path d="M14.8 14.8 20 20" />
        </svg>
    ),
    building: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
        </svg>
    ),
};

/* ==========================================
   PLACEHOLDER COMPONENT — looks like a real app UI
   ========================================== */
function ScreenPlaceholder({ label, aspectRatio = '16/9' }: { label: string; aspectRatio?: string }) {
    return (
        <div className="hc-screen-placeholder" style={{ aspectRatio }}>
            {/* Browser chrome frame */}
            <div className="hc-browser-chrome">
                <div className="hc-browser-dots">
                    <span /><span /><span />
                </div>
                <div className="hc-browser-bar">
                    <span>arna-leadgen-crm-emr.vercel.app</span>
                </div>
                <div className="hc-browser-actions">
                    <span className="hc-browser-btn" /><span className="hc-browser-btn" />
                </div>
            </div>
            {/* Fake UI mockup */}
            <div className="hc-screen-body">
                {/* Left sidebar */}
                <div className="hc-mock-sidebar">
                    <div className="hc-mock-logo" />
                    {[0,1,2,3,4,5].map(i => (
                        <div key={i} className={`hc-mock-nav-item ${i === 1 ? 'active' : ''}`} />
                    ))}
                </div>
                {/* Main content */}
                <div className="hc-mock-main">
                    {/* Top bar */}
                    <div className="hc-mock-topbar">
                        <div className="hc-mock-page-title" />
                        <div className="hc-mock-topbar-right">
                            <div className="hc-mock-search" />
                            <div className="hc-mock-avatar" />
                        </div>
                    </div>
                    {/* Stats row */}
                    <div className="hc-mock-stats">
                        {[0,1,2,3].map(i => (
                            <div key={i} className="hc-mock-stat-card">
                                <div className="hc-mock-stat-num" />
                                <div className="hc-mock-stat-label" />
                            </div>
                        ))}
                    </div>
                    {/* Content area */}
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
                    {/* Label overlay */}
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
   JOURNEY NODE COMPONENT
   ========================================== */
function JourneyNode({ icon, label, delay }: { icon: React.ReactNode; label: string; delay: number }) {
    return (
        <div className="hc-journey-node" style={{ animationDelay: `${delay}ms` }}>
            <div className="hc-journey-icon">{icon}</div>
            <span className="hc-journey-label">{label}</span>
        </div>
    );
}

/* ==========================================
   FEATURE ROW COMPONENT
   ========================================== */
function FeatureRow({
    heading,
    bullets,
    screenshotLabel,
    screenshotComment,
    icon,
    reversed,
}: {
    heading: string;
    bullets: string[];
    screenshotLabel: string;
    screenshotComment: string;
    icon: React.ReactNode;
    reversed?: boolean;
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
                {/* REPLACE: {screenshotComment} */}
                <ScreenPlaceholder label={screenshotLabel} />
            </div>
        </div>
    );
}

/* ==========================================
   MAIN PAGE COMPONENT
   ========================================== */
export default function HealthcarePage() {
    useScrollReveal();
    useJourneyAnimation();

    return (
        <main>
            {/* ========== SECTION 1: HERO ========== */}
            <section className="hc-hero">
                <div className="hc-hero-bg" />
                <div className="container">
                    <div className="hc-hero-grid">
                        <div className="hc-hero-content">
                            <span className="hc-hero-badge">AI-Powered Clinic Management</span>
                            <h1>The Complete Clinic Operating System</h1>
                            <p>
                                One AI-powered platform to manage your leads, patients, appointments,
                                prescriptions, billing, and WhatsApp campaigns — so you can focus on
                                your patients, not paperwork.
                            </p>
                            <div className="hc-hero-cta">
                                <a
                                    href="https://wa.me/919959953888?text=Hi%2C%20I%27d%20like%20a%20demo%20of%20the%20AICE%20Healthcare%20platform"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-lg"
                                >
                                    Book a Demo {Icons.arrowRight}
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
                            {/* REPLACE: Dashboard overview screenshot */}
                            <ScreenPlaceholder label="Dashboard Overview" />
                        </div>
                    </div>
                </div>

                {/* Trust bar */}
                <div className="hc-trust-bar">
                    <span className="hc-trust-label">Trusted by clinics across Hyderabad</span>
                    <div className="hc-trust-logos">
                        <span className="hc-trust-logo">Arna Skin Clinic</span>
                        <span className="hc-trust-logo">DermaCare</span>
                        <span className="hc-trust-logo">SmileDent</span>
                        <span className="hc-trust-logo">GlowSkin Studio</span>
                        <span className="hc-trust-logo">HairRevive</span>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 2: PROBLEM STATEMENT ========== */}
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
                            {
                                icon: Icons.smartphone,
                                title: 'Leads Lost in DMs',
                                desc: 'Instagram and Facebook ad leads come in, but they\'re scattered across platforms. No one follows up. Money wasted.',
                            },
                            {
                                icon: Icons.fileText,
                                title: 'Patient Records on Paper',
                                desc: 'Paper forms, physical files, handwritten notes. Finding a patient\'s history means digging through cabinets.',
                            },
                            {
                                icon: Icons.messageCircle,
                                title: 'Manual WhatsApp, One by One',
                                desc: 'Your staff sends appointment reminders, offers, and prescriptions to patients one message at a time.',
                            },
                            {
                                icon: Icons.penTool,
                                title: 'Consent Forms in Filing Cabinets',
                                desc: 'Printed consent forms signed with pen, stored in folders. No digital backup. Hard to retrieve.',
                            },
                        ].map((card, i) => (
                            <div key={i} className={`hc-problem-card hc-reveal`} style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="hc-problem-icon">{card.icon}</div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== SECTION 3: PATIENT JOURNEY FLOW ========== */}
            <section className="hc-journey">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">The Solution</span>
                        <h2>One Platform. Everything Connected.</h2>
                        <p className="hc-section-subtitle">
                            From first ad click to repeat visit — every step automated, every record digital, every message on WhatsApp.
                        </p>
                    </div>
                    <div className="hc-journey-flow">
                        <JourneyNode icon={Icons.megaphone} label="Ad Click" delay={0} />
                        <div className="hc-journey-arrow" style={{ animationDelay: '200ms' }} />
                        <JourneyNode icon={Icons.users} label="Lead Captured" delay={300} />
                        <div className="hc-journey-arrow" style={{ animationDelay: '500ms' }} />
                        <JourneyNode icon={Icons.messageCircle} label="WhatsApp Bot Books" delay={600} />
                        <div className="hc-journey-arrow" style={{ animationDelay: '800ms' }} />
                        <JourneyNode icon={Icons.clipboard} label="Digital Form Filled" delay={900} />
                        <div className="hc-journey-arrow" style={{ animationDelay: '1100ms' }} />
                        <JourneyNode icon={Icons.heart} label="Doctor Consultation" delay={1200} />
                        <div className="hc-journey-arrow" style={{ animationDelay: '1400ms' }} />
                        <JourneyNode icon={Icons.pill} label="Rx via WhatsApp" delay={1500} />
                        <div className="hc-journey-arrow" style={{ animationDelay: '1700ms' }} />
                        <JourneyNode icon={Icons.receipt} label="Bill & Loyalty" delay={1800} />
                        <div className="hc-journey-arrow" style={{ animationDelay: '2000ms' }} />
                        <JourneyNode icon={Icons.trendingUp} label="Patient Returns" delay={2100} />
                    </div>
                </div>
            </section>

            {/* ========== SECTION 4: FEATURE SHOWCASE ========== */}
            <section className="hc-features">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Features</span>
                        <h2>What&apos;s Inside</h2>
                        <p className="hc-section-subtitle">
                            Every tool your clinic needs — built into one unified platform.
                        </p>
                    </div>

                    <FeatureRow
                        heading="Every Lead, One Dashboard"
                        icon={Icons.users}
                        bullets={[
                            'Capture leads from Instagram, Facebook & Google ads automatically',
                            'See lead source, interest, status — at a glance',
                            'AI-generated lead summaries and engagement scoring',
                            'Follow up via WhatsApp directly from the dashboard',
                        ]}
                        screenshotLabel="Lead CRM Dashboard"
                        screenshotComment="Lead CRM screenshot"
                    />

                    <FeatureRow
                        heading="Patient Records, Fully Digital"
                        icon={Icons.heart}
                        reversed
                        bullets={[
                            'Complete patient profiles — history, allergies, medications, treatment tags',
                            'Visit-by-visit timeline with diagnosis, treatment, and notes',
                            'Before/after photos attached to each visit',
                            'Search patients by name, phone, or treatment type',
                        ]}
                        screenshotLabel="Patient Records (EHR)"
                        screenshotComment="Patient records screenshot"
                    />

                    <FeatureRow
                        heading="Appointments That Manage Themselves"
                        icon={Icons.calendar}
                        bullets={[
                            'Patients book via WhatsApp — AI handles scheduling',
                            'Automatic reminders 24 hours and 2 hours before',
                            'No-show tracking and rebooking suggestions',
                            'Calendar view for the doctor to see the full day',
                        ]}
                        screenshotLabel="Smart Appointments"
                        screenshotComment="Appointments calendar screenshot"
                    />

                    <FeatureRow
                        heading="Forms on WhatsApp. Signatures on iPad."
                        icon={Icons.clipboard}
                        reversed
                        bullets={[
                            'Send client data forms to patients on WhatsApp before they arrive',
                            'Patient fills medical history, allergies, treatment interest — digitally',
                            'Consent forms with digital signature capture on iPad at the clinic',
                            'Everything stored in the patient\'s record — no paper, no filing',
                        ]}
                        screenshotLabel="Digital Forms & Consent"
                        screenshotComment="Consent form screenshot"
                    />

                    <FeatureRow
                        heading="Prescriptions, Sent in One Click"
                        icon={Icons.pill}
                        bullets={[
                            'Create prescriptions with medicine name, dosage, frequency, duration',
                            'Send directly to patient\'s WhatsApp — instantly',
                            'Stored in patient\'s digital record permanently',
                            'Searchable — find all patients prescribed a specific medicine',
                        ]}
                        screenshotLabel="Prescription Management"
                        screenshotComment="Prescription page screenshot"
                    />

                    <FeatureRow
                        heading="Billing That Builds Loyalty"
                        icon={Icons.receipt}
                        reversed
                        bullets={[
                            'Consultation, service, and medicine billing — all in one place',
                            'Built-in loyalty points system — patients earn and redeem points',
                            'Bills sent to patients via WhatsApp automatically',
                            'Track revenue by service type, doctor, and time period',
                        ]}
                        screenshotLabel="Billing & Loyalty Points"
                        screenshotComment="Billing page screenshot"
                    />

                    <FeatureRow
                        heading="Right Message. Right Patients. Right Time."
                        icon={Icons.megaphone}
                        bullets={[
                            'Segment patients by treatment type — Laser, Botox, Acne, Hair Fall',
                            'Send targeted offers only to relevant patients',
                            'No more manual one-by-one messaging',
                            'Track delivery, read receipts, and responses',
                        ]}
                        screenshotLabel="WhatsApp Campaigns"
                        screenshotComment="Campaign builder screenshot"
                    />
                </div>
            </section>

            {/* ========== SECTION 5: VIDEO / INTERACTIVE DEMO ========== */}
            <section className="hc-video-section">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Demo</span>
                        <h2>See It In Action</h2>
                        <p className="hc-section-subtitle">
                            Watch how AICE transforms a clinic&apos;s daily operations in 90 seconds.
                        </p>
                    </div>
                    <div className="hc-video-wrapper hc-reveal">
                        {/* REPLACE: Product walkthrough video — change src for YouTube embed, iframe, or video file */}
                        <div className="hc-video-placeholder" data-video-type="youtube" data-video-src="">
                            <div className="hc-video-play">{Icons.play}</div>
                            <span className="hc-video-text">Product Walkthrough — Coming Soon</span>
                        </div>
                    </div>
                    <div className="hc-video-cta">
                        <a
                            href="https://arna-leadgen-crm-emr.vercel.app/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            Try the Live Demo Yourself {Icons.arrowRight}
                        </a>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 6: ROI NUMBERS ========== */}
            <section className="hc-roi">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Impact</span>
                        <h2>The Math Works</h2>
                    </div>
                    <div className="hc-roi-grid hc-reveal">
                        {[
                            { icon: Icons.trendingUp, number: '40%', label: 'Reduction in No-Shows', sub: 'with automated WhatsApp reminders' },
                            { icon: Icons.clock, number: '3 hrs/day', label: 'Staff Time Saved', sub: 'on manual messaging and record-keeping' },
                            { icon: Icons.target, number: '100%', label: 'Lead Capture', sub: 'from Instagram, Facebook & Google ads' },
                            { icon: Icons.indianRupee, number: '\u20B925K-35K', label: 'Extra Monthly Revenue', sub: 'from recovered no-shows and WhatsApp orders' },
                        ].map((stat, i) => (
                            <div key={i} className="hc-roi-card">
                                <div className="hc-roi-icon">{stat.icon}</div>
                                <div className="hc-roi-number">{stat.number}</div>
                                <div className="hc-roi-label">{stat.label}</div>
                                <div className="hc-roi-sub">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                    <p className="hc-roi-tagline hc-reveal">Pays for itself with just 5 patients per month.</p>
                </div>
            </section>

            {/* ========== SECTION 7: WHO IT'S FOR ========== */}
            <section className="hc-audience">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Built For You</span>
                        <h2>Who It&apos;s For</h2>
                    </div>
                    <div className="hc-audience-grid hc-reveal">
                        {[
                            {
                                icon: Icons.sparkles,
                                title: 'Dermatology & Aesthetic Clinics',
                                desc: 'Manage laser, Botox, chemical peel patients. Track sessions, send targeted offers, build loyalty.',
                            },
                            {
                                icon: Icons.heart,
                                title: 'Dental Clinics',
                                desc: 'Appointment booking, treatment records, recall campaigns for checkups and cleanings.',
                            },
                            {
                                icon: Icons.scissors,
                                title: 'Hair & Beauty Salons',
                                desc: 'Product catalog on WhatsApp, appointment booking, loyalty points for repeat clients.',
                            },
                            {
                                icon: Icons.building,
                                title: 'Multi-Specialty Clinics',
                                desc: 'Multiple doctors, multiple services — one unified patient management system.',
                            },
                        ].map((card, i) => (
                            <div key={i} className="hc-audience-card">
                                <div className="hc-audience-icon">{card.icon}</div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== SECTION 8: TESTIMONIAL ========== */}
            <section className="hc-testimonial">
                <div className="container">
                    <div className="hc-testimonial-card hc-reveal">
                        <div className="hc-testimonial-stars">
                            {Icons.star}{Icons.star}{Icons.star}{Icons.star}{Icons.star}
                        </div>
                        {/* REPLACE: Real testimonial from Dr. Mounika once available */}
                        <blockquote>
                            &ldquo;AICE gave us exactly what HealthPlix couldn&apos;t — a simple system that our staff
                            actually uses. Patient records are digital, campaigns are automated, and everything
                            happens through WhatsApp which our patients already use.&rdquo;
                        </blockquote>
                        <div className="hc-testimonial-author">
                            <div className="hc-testimonial-avatar">PM</div>
                            <div>
                                <div className="hc-testimonial-name">Dr. Priya Menon</div>
                                <div className="hc-testimonial-role">Director, Skin &amp; Hair Clinic</div>
                                <div className="hc-testimonial-location">Hyderabad, India</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 9: PRICING ========== */}
            <section className="hc-pricing">
                <div className="container">
                    <div className="hc-section-header hc-reveal">
                        <span className="hc-section-label">Pricing</span>
                        <h2>Simple, Transparent Pricing</h2>
                    </div>
                    <div className="hc-pricing-card hc-reveal">
                        <div className="hc-pricing-amount">
                            Starting at <strong>{'\u20B9'}7,999/month</strong>
                        </div>
                        <div className="hc-pricing-includes">
                            <p>Includes: CRM + EHR + WhatsApp Bot + Campaigns + Billing</p>
                        </div>
                        <ul className="hc-pricing-perks">
                            <li>{Icons.check} No setup fee</li>
                            <li>{Icons.check} 2-week free trial</li>
                            <li>{Icons.check} Cancel anytime</li>
                        </ul>
                        <p className="hc-pricing-note">Custom plans available for multi-location clinics</p>
                        <a
                            href="https://wa.me/919959953888?text=Hi%2C%20I%27d%20like%20to%20start%20a%20free%20trial%20of%20AICE%20Healthcare"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            Start Free Trial {Icons.arrowRight}
                        </a>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 10: FINAL CTA ========== */}
            <section className="hc-final-cta">
                <div className="container">
                    <div className="hc-cta-grid">
                        <div className="hc-cta-card">
                            <h3>Ready to Modernize Your Clinic?</h3>
                            <p>Join clinics across Hyderabad that are automating their operations with AI.</p>
                            <a
                                href="https://wa.me/919959953888?text=Hi%2C%20I%27d%20like%20a%20demo%20of%20the%20AICE%20Healthcare%20platform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-lg"
                            >
                                Book a Demo {Icons.arrowRight}
                            </a>
                        </div>
                        <div className="hc-cta-card hc-cta-whatsapp">
                            <h3>Prefer to Chat?</h3>
                            <p>Message us directly on WhatsApp. We&apos;ll set up your free trial in 24 hours.</p>
                            <a
                                href="https://wa.me/919959953888"
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
   HERO
   ========================================== */
.hc-hero {
    position: relative;
    padding: 160px 0 0;
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
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-16);
    align-items: center;
}
.hc-hero-content { max-width: 560px; }
.hc-hero-badge {
    display: inline-block;
    padding: 8px 16px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: var(--color-accent-blue);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    border-radius: var(--radius-full);
    margin-bottom: var(--spacing-6);
    letter-spacing: 0.02em;
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
    justify-content: center;
    align-items: center;
}

/* ==========================================
   TRUST BAR
   ========================================== */
.hc-trust-bar {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: var(--spacing-16) 0 var(--spacing-12);
    border-top: 1px solid var(--color-gray-100);
    margin-top: var(--spacing-16);
}
.hc-trust-label {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    font-weight: var(--font-medium);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    display: block;
    margin-bottom: var(--spacing-6);
}
.hc-trust-logos {
    display: flex;
    justify-content: center;
    gap: var(--spacing-10);
    flex-wrap: wrap;
}
.hc-trust-logo {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--color-gray-300);
    letter-spacing: -0.01em;
}

/* ==========================================
   SECTION HEADERS
   ========================================== */
.hc-section-header {
    text-align: center;
    margin-bottom: var(--spacing-16);
}
.hc-section-label {
    display: inline-block;
    padding: 6px 14px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: var(--color-accent-blue);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    border-radius: var(--radius-full);
    margin-bottom: var(--spacing-4);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}
.hc-section-header h2 {
    font-size: var(--text-4xl);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: var(--spacing-4);
}
.hc-section-subtitle {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
}

/* ==========================================
   PROBLEM CARDS
   ========================================== */
.hc-problems {
    padding: var(--spacing-24) 0;
    background: var(--color-white);
}
.hc-problems-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-6);
}
.hc-problem-card {
    background: var(--color-gray-900);
    border-radius: var(--radius-xl);
    padding: var(--spacing-8);
    transition: all 0.25s ease;
    border: 1px solid var(--color-gray-800);
}
.hc-problem-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}
.hc-problem-icon {
    width: 48px;
    height: 48px;
    background: rgba(59, 130, 246, 0.15);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-5);
    color: var(--color-accent-blue);
}
.hc-problem-card h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--color-white);
    margin-bottom: var(--spacing-3);
    letter-spacing: -0.01em;
}
.hc-problem-card p {
    font-size: 14px;
    color: var(--color-gray-400);
    line-height: 1.65;
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
    transform: scale(0.8);
    transition: opacity 0.5s ease, transform 0.5s ease;
}
.hc-journey-animate .hc-journey-node {
    opacity: 1;
    transform: scale(1);
    transition-delay: var(--delay, 0ms);
}
.hc-journey-node:nth-child(1)  { --delay: 0ms; }
.hc-journey-node:nth-child(3)  { --delay: 300ms; }
.hc-journey-node:nth-child(5)  { --delay: 600ms; }
.hc-journey-node:nth-child(7)  { --delay: 900ms; }
.hc-journey-node:nth-child(9)  { --delay: 1200ms; }
.hc-journey-node:nth-child(11) { --delay: 1500ms; }
.hc-journey-node:nth-child(13) { --delay: 1800ms; }
.hc-journey-node:nth-child(15) { --delay: 2100ms; }
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
.hc-journey-arrow {
    width: 24px;
    height: 2px;
    background: var(--color-gray-300);
    position: relative;
    opacity: 0;
    transition: opacity 0.4s ease;
    flex-shrink: 0;
}
.hc-journey-arrow::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 0;
    height: 0;
    border-left: 6px solid var(--color-gray-300);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
}
.hc-journey-animate .hc-journey-arrow {
    opacity: 1;
}
.hc-journey-arrow:nth-child(2)  { transition-delay: 200ms; }
.hc-journey-arrow:nth-child(4)  { transition-delay: 500ms; }
.hc-journey-arrow:nth-child(6)  { transition-delay: 800ms; }
.hc-journey-arrow:nth-child(8)  { transition-delay: 1100ms; }
.hc-journey-arrow:nth-child(10) { transition-delay: 1400ms; }
.hc-journey-arrow:nth-child(12) { transition-delay: 1700ms; }
.hc-journey-arrow:nth-child(14) { transition-delay: 2000ms; }

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
    width: 22px;
    height: 22px;
    min-width: 22px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent-blue);
    margin-top: 2px;
}

/* ==========================================
   SCREEN PLACEHOLDER — Detailed UI Mockup
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
/* Browser chrome */
.hc-browser-chrome {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    padding: 9px 14px;
    background: #e8ecf0;
    border-bottom: 1px solid #d1d9e0;
    flex-shrink: 0;
}
.hc-browser-dots {
    display: flex;
    gap: 5px;
    flex-shrink: 0;
}
.hc-browser-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
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
.hc-browser-actions {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
}
.hc-browser-btn {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background: rgba(255,255,255,0.5);
    display: block;
}
/* App body */
.hc-screen-body {
    display: flex;
    flex: 1;
    min-height: 260px;
    background: #f1f5f9;
}
/* Sidebar */
.hc-mock-sidebar {
    width: 52px;
    background: #0f172a;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-shrink: 0;
}
.hc-mock-logo {
    width: 28px;
    height: 28px;
    background: #3b82f6;
    border-radius: 6px;
    margin-bottom: 10px;
}
.hc-mock-nav-item {
    width: 28px;
    height: 28px;
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
}
.hc-mock-nav-item.active {
    background: #3b82f6;
}
/* Main area */
.hc-mock-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 10px;
    position: relative;
    min-width: 0;
}
/* Top bar */
.hc-mock-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius: 8px;
    padding: 8px 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.hc-mock-page-title {
    width: 100px;
    height: 10px;
    background: #1e293b;
    border-radius: 4px;
}
.hc-mock-topbar-right {
    display: flex;
    gap: 8px;
    align-items: center;
}
.hc-mock-search {
    width: 80px;
    height: 10px;
    background: #e2e8f0;
    border-radius: 4px;
}
.hc-mock-avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #1e40af);
}
/* Stats row */
.hc-mock-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
.hc-mock-stat-card {
    background: white;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.hc-mock-stat-num {
    width: 50px;
    height: 14px;
    background: #1e293b;
    border-radius: 3px;
    margin-bottom: 6px;
}
.hc-mock-stat-label {
    width: 36px;
    height: 8px;
    background: #e2e8f0;
    border-radius: 3px;
}
/* Table */
.hc-mock-content {
    flex: 1;
}
.hc-mock-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.hc-mock-table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 8px;
    padding: 8px 12px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}
.hc-mock-th {
    height: 8px;
    background: #94a3b8;
    border-radius: 3px;
}
.hc-mock-table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 8px;
    padding: 8px 12px;
    border-bottom: 1px solid #f1f5f9;
    align-items: center;
}
.hc-mock-table-row:last-child { border-bottom: none; }
.hc-mock-td {
    height: 8px;
    background: #e2e8f0;
    border-radius: 3px;
}
.hc-mock-td-name {
    background: #1e293b;
    width: 80%;
}
.hc-mock-badge {
    width: 40px;
    height: 16px;
    background: #dbeafe;
    border-radius: 20px;
}
/* Label overlay at bottom of mockup */
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
    background: linear-gradient(180deg, #F8FBFE 0%, #FFFFFF 100%);
}
.hc-video-wrapper {
    max-width: 900px;
    margin: 0 auto;
}
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
.hc-video-placeholder:hover {
    transform: scale(1.01);
    box-shadow: 0 24px 64px rgba(0,0,0,0.15);
}
.hc-video-play {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    transition: all 0.3s ease;
}
.hc-video-placeholder:hover .hc-video-play {
    background: var(--color-accent-blue);
    transform: scale(1.1);
}
.hc-video-play svg { width: 32px; height: 32px; margin-left: 4px; }
.hc-video-text {
    font-size: var(--text-base);
    color: rgba(255,255,255,0.5);
    font-weight: var(--font-medium);
}
.hc-video-cta {
    text-align: center;
    margin-top: var(--spacing-8);
}

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
    transition: all 0.25s ease;
}
.hc-roi-card:hover {
    transform: translateY(-4px);
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
.hc-roi-label {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-1);
}
.hc-roi-sub {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
}
.hc-roi-tagline {
    text-align: center;
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--color-accent-blue);
    margin-top: var(--spacing-10);
}

/* ==========================================
   AUDIENCE
   ========================================== */
.hc-audience {
    padding: var(--spacing-24) 0;
    background: var(--color-bg);
}
.hc-audience-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-6);
}
.hc-audience-card {
    background: var(--color-white);
    border-radius: var(--radius-xl);
    padding: var(--spacing-8);
    border: 1px solid var(--color-gray-100);
    transition: all 0.25s ease;
}
.hc-audience-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}
.hc-audience-icon {
    width: 52px;
    height: 52px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent-blue);
    margin-bottom: var(--spacing-5);
}
.hc-audience-card h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-3);
    letter-spacing: -0.01em;
}
.hc-audience-card p {
    font-size: 14px;
    color: var(--color-text-muted);
    line-height: 1.65;
}

/* ==========================================
   TESTIMONIAL
   ========================================== */
.hc-testimonial {
    padding: var(--spacing-24) 0;
    background: linear-gradient(180deg, #EBF5FF 0%, #F8FBFE 100%);
}
.hc-testimonial-card {
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
    background: var(--color-white);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-12) var(--spacing-10);
    box-shadow: var(--shadow-lg);
    border: 1px solid rgba(0,0,0,0.03);
}
.hc-testimonial-stars {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-bottom: var(--spacing-6);
}
.hc-testimonial-card blockquote {
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    line-height: 1.8;
    font-style: italic;
    margin-bottom: var(--spacing-8);
}
.hc-testimonial-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-4);
}
.hc-testimonial-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-accent-blue) 0%, var(--color-dark-blue) 100%);
    color: var(--color-white);
    font-weight: var(--font-semibold);
    font-size: var(--text-base);
    display: flex;
    align-items: center;
    justify-content: center;
}
.hc-testimonial-name {
    font-weight: var(--font-semibold);
    color: var(--color-text);
    font-size: var(--text-base);
}
.hc-testimonial-role {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
}
.hc-testimonial-location {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
}
.hc-testimonial-author > div:last-child { text-align: left; }

/* ==========================================
   PRICING
   ========================================== */
.hc-pricing {
    padding: var(--spacing-24) 0;
    background: var(--color-white);
}
.hc-pricing-card {
    max-width: 520px;
    margin: 0 auto;
    text-align: center;
    background: var(--color-bg);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-12) var(--spacing-10);
    border: 2px solid var(--color-soft-blue);
    box-shadow: var(--shadow-lg);
}
.hc-pricing-amount {
    font-size: var(--text-xl);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-3);
}
.hc-pricing-amount strong {
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.03em;
}
.hc-pricing-includes {
    margin-bottom: var(--spacing-6);
}
.hc-pricing-includes p {
    font-size: var(--text-base);
    color: var(--color-text-muted);
}
.hc-pricing-perks {
    display: flex;
    justify-content: center;
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-6);
    flex-wrap: wrap;
}
.hc-pricing-perks li {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--color-text-secondary);
}
.hc-pricing-perks li svg { color: #22c55e; }
.hc-pricing-note {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-8);
}

/* ==========================================
   FINAL CTA
   ========================================== */
.hc-final-cta {
    padding: var(--spacing-20) 0;
    background: var(--color-gray-900);
}
.hc-cta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-6);
}
.hc-cta-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-10);
}
.hc-cta-card h3 {
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: var(--spacing-3);
}
.hc-cta-card p {
    font-size: var(--text-base);
    color: var(--color-gray-400);
    margin-bottom: var(--spacing-6);
    line-height: 1.6;
}
.hc-cta-card .btn-primary {
    background: var(--color-white);
    color: var(--color-black);
}
.hc-cta-card .btn-primary:hover {
    background: var(--color-gray-100);
}
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
.hc-wa-btn:hover {
    background: #20bd5a;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
}

/* ==========================================
   SCROLL REVEAL
   ========================================== */
.hc-reveal {
    opacity: 0;
    transform: translateY(25px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.hc-visible {
    opacity: 1;
    transform: translateY(0);
}

/* ==========================================
   RESPONSIVE
   ========================================== */
@media (max-width: 1024px) {
    .hc-hero-grid { grid-template-columns: 1fr; gap: var(--spacing-10); }
    .hc-hero-content { max-width: 100%; text-align: center; }
    .hc-hero-cta { justify-content: center; }
    .hc-problems-grid { grid-template-columns: repeat(2, 1fr); }
    .hc-feature-row { grid-template-columns: 1fr; gap: var(--spacing-10); }
    .hc-feature-reversed .hc-feature-text { order: 1; }
    .hc-feature-reversed .hc-feature-image { order: 2; }
    .hc-roi-grid { grid-template-columns: repeat(2, 1fr); }
    .hc-audience-grid { grid-template-columns: repeat(2, 1fr); }
    .hc-cta-grid { grid-template-columns: 1fr; }
    .hc-journey-flow { gap: var(--spacing-1); }
    .hc-journey-arrow { width: 16px; }
}

@media (max-width: 768px) {
    .hc-hero { padding: 130px 0 0; }
    .hc-problems-grid { grid-template-columns: 1fr; }
    .hc-roi-grid { grid-template-columns: 1fr 1fr; }
    .hc-audience-grid { grid-template-columns: 1fr; }
    .hc-hero-cta { flex-direction: column; align-items: center; }
    .hc-trust-logos { gap: var(--spacing-6); }
    .hc-pricing-perks { flex-direction: column; align-items: center; }
    .hc-journey-flow {
        flex-direction: column;
        gap: var(--spacing-1);
    }
    .hc-journey-arrow {
        width: 2px;
        height: 20px;
        transform: rotate(0);
    }
    .hc-journey-arrow::after {
        right: -3px;
        top: auto;
        bottom: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 6px solid var(--color-gray-300);
        border-bottom: none;
    }
    .hc-cta-card { padding: var(--spacing-8); text-align: center; }
    .hc-testimonial-card { padding: var(--spacing-8) var(--spacing-6); }
    .hc-pricing-card { padding: var(--spacing-8) var(--spacing-6); }
}

@media (max-width: 480px) {
    .hc-roi-grid { grid-template-columns: 1fr; }
}

            `}</style>
        </main>
    );
}
