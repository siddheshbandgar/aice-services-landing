'use client';

import React, { useState, useEffect, useRef } from 'react';

const scrollItems = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
        title: 'Automated Calling Agents',
        desc: 'Deploy AI-powered calling agents that handle customer outreach, appointment scheduling, and follow-ups 24/7. Perfect for real estate, healthcare, and sales teams.',
        animation: 'phone'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        title: 'Lead Qualification AI',
        desc: 'Automatically score and qualify leads based on behavior, demographics, and engagement. Focus your sales team on high-value prospects.',
        animation: 'leads'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
        title: 'Document Processing',
        desc: 'Extract, analyze, and process documents at scale. From contracts to invoices, our AI handles it all with enterprise-grade accuracy.',
        animation: 'docs'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
        title: 'Customer Support Bots',
        desc: 'Intelligent chatbots that understand context, handle complex queries, and escalate when needed. Available across web, WhatsApp, and more.',
        animation: 'chat'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>,
        title: 'Workflow Automation',
        desc: 'Connect your existing tools and automate repetitive tasks. From data entry to report generation, free your team for high-value work.',
        animation: 'workflow'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
        title: 'Analytics & Insights',
        desc: 'Real-time dashboards and AI-powered insights. Understand customer behavior, track performance, and make data-driven decisions.',
        animation: 'analytics'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
        title: 'Custom AI Solutions',
        desc: 'Have a unique requirement? We design and build custom AI solutions tailored specifically to your business needs and workflows.',
        animation: 'custom'
    },
];

function PhoneAnimation() {
    return (
        <div className="anim-phone">
            <div className="anim-phone-wave"></div>
            <div className="anim-phone-wave"></div>
            <div className="anim-phone-wave"></div>
            <div className="anim-phone-device">
                <div className="anim-phone-screen">
                    <div className="anim-phone-avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </div>
                    <div className="anim-phone-name">AI Agent</div>
                    <div className="anim-phone-status">Call in progress</div>
                </div>
            </div>
        </div>
    );
}

function LeadsAnimation() {
    return (
        <div className="anim-leads">
            <div className="anim-lead-card">
                <div className="anim-lead-avatar">JS</div>
                <div className="anim-lead-info">
                    <div className="anim-lead-name">John Smith</div>
                    <div className="anim-lead-company">Acme Corp</div>
                </div>
                <span className="anim-lead-score high">92%</span>
            </div>
            <div className="anim-lead-card">
                <div className="anim-lead-avatar">SP</div>
                <div className="anim-lead-info">
                    <div className="anim-lead-name">Sarah Patel</div>
                    <div className="anim-lead-company">Tech Inc</div>
                </div>
                <span className="anim-lead-score medium">67%</span>
            </div>
            <div className="anim-lead-card">
                <div className="anim-lead-avatar">MK</div>
                <div className="anim-lead-info">
                    <div className="anim-lead-name">Mike Kumar</div>
                    <div className="anim-lead-company">StartupXYZ</div>
                </div>
                <span className="anim-lead-score low">34%</span>
            </div>
        </div>
    );
}

function DocsAnimation() {
    return (
        <div className="anim-docs">
            <div className="anim-doc-stack">
                <div className="anim-doc"><div className="anim-doc-line"></div><div className="anim-doc-line"></div><div className="anim-doc-line"></div></div>
                <div className="anim-doc"><div className="anim-doc-line"></div><div className="anim-doc-line"></div><div className="anim-doc-line"></div></div>
                <div className="anim-doc"><div className="anim-doc-line"></div><div className="anim-doc-line"></div><div className="anim-doc-line"></div></div>
            </div>
            <div className="anim-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
            </div>
            <div className="anim-result">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Processed</span>
            </div>
        </div>
    );
}

function ChatAnimation() {
    return (
        <div className="anim-chat">
            <div className="anim-chat-messages">
                <div className="anim-chat-msg user">Hi, I need help with my order</div>
                <div className="anim-chat-msg bot">Hello! I&apos;d be happy to help. Could you share your order number?</div>
                <div className="anim-chat-msg user">#ORD-2024-5847</div>
            </div>
            <div className="anim-chat-typing"><span></span><span></span><span></span></div>
        </div>
    );
}

function WorkflowAnimation() {
    return (
        <div className="anim-workflow">
            <div className="anim-workflow-node active">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
            </div>
            <div className="anim-workflow-line"></div>
            <div className="anim-workflow-node">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09" />
                </svg>
            </div>
            <div className="anim-workflow-line"></div>
            <div className="anim-workflow-node">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
        </div>
    );
}

function AnalyticsAnimation() {
    return (
        <div className="anim-analytics">
            <div className="anim-bar"></div>
            <div className="anim-bar"></div>
            <div className="anim-bar"></div>
            <div className="anim-bar"></div>
            <div className="anim-bar"></div>
            <div className="anim-bar"></div>
        </div>
    );
}

const animations: { [key: string]: React.ReactNode } = {
    phone: <PhoneAnimation />,
    leads: <LeadsAnimation />,
    docs: <DocsAnimation />,
    chat: <ChatAnimation />,
    workflow: <WorkflowAnimation />,
    analytics: <AnalyticsAnimation />,
    custom: <CustomAnimation />,
};

function CustomAnimation() {
    return (
        <div className="anim-custom">
            <div className="anim-custom-circle"></div>
            <div className="anim-custom-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            </div>
            <div className="anim-custom-orbit">
                <div className="anim-custom-planet"></div>
            </div>
            <div className="anim-custom-orbit outer">
                <div className="anim-custom-planet"></div>
            </div>
            <div className="anim-custom-label">Tailored for You</div>
        </div>
    );
}

export default function StickyScroll() {
    const [activeIndex, setActiveIndex] = useState(0);
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-30% 0px -50% 0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index') || '0');
                    if (!isNaN(index)) {
                        setActiveIndex(index);
                    }
                }
            });
        }, options);

        panelRefs.current.forEach(panel => {
            if (panel) observer.observe(panel);
        });

        return () => observer.disconnect();
    }, []);

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
        panelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <section className="sticky-scroll-section section" id="what-we-do">
            <div className="sticky-scroll-container">
                <div className="sticky-scroll-nav">
                    <h2 className="sticky-scroll-title">What AICE can do for you.</h2>

                    <div className="sticky-scroll-items">
                        {scrollItems.map((item, index) => (
                            <div
                                key={index}
                                className={`sticky-scroll-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => handleItemClick(index)}
                            >
                                <div className="sticky-scroll-item-icon">{item.icon}</div>
                                <span className="sticky-scroll-item-text">{item.title}</span>
                                <svg className="sticky-scroll-item-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sticky-scroll-content">
                    <div className="sticky-scroll-panels">
                        {scrollItems.map((item, index) => (
                            <div
                                key={index}
                                ref={el => { panelRefs.current[index] = el; }}
                                className={`sticky-scroll-panel ${activeIndex === index ? 'active' : ''}`}
                                data-index={index}
                            >
                                <div className="sticky-scroll-panel-content">
                                    <h3 className="sticky-scroll-panel-title">{item.title}</h3>
                                    <p className="sticky-scroll-panel-desc">{item.desc}</p>
                                </div>
                                <div className="sticky-scroll-animation">
                                    <div className="anim-container">
                                        {animations[item.animation]}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
