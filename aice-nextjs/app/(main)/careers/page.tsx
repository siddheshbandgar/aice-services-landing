'use client';

import { useState } from 'react';

const openings = [
    {
        title: 'AI/ML Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'Design and ship production-grade AI/ML systems powering our voice, video, and healthcare products. Deep work in LLMs, fine-tuning, and inference optimization.',
    },
    {
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'Own full-stack features across our Next.js frontend and Node/Python backends. Work on real-time systems, API design, and integrations that enterprise customers depend on.',
    },
    {
        title: 'DevOps / Cloud Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'Build and maintain the infrastructure that runs AICE at scale — Kubernetes, CI/CD pipelines, observability, and multi-cloud deployments across AWS and GCP.',
    },
    {
        title: 'Product Designer (UI/UX)',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        description: 'Translate complex AI capabilities into clean, intuitive interfaces. Own the design system, run user research, and collaborate directly with engineering to ship polished products.',
    },
    {
        title: 'Enterprise Sales Executive',
        department: 'Sales',
        location: 'Mumbai / Remote',
        type: 'Full-time',
        description: 'Drive new enterprise revenue by identifying and closing strategic accounts in healthcare, retail, and manufacturing verticals. Own the full sales cycle from discovery to contract.',
    },
    {
        title: 'Customer Success Manager',
        department: 'Operations',
        location: 'Bangalore / Remote',
        type: 'Full-time',
        description: 'Partner with customers post-sale to ensure they get maximum value from AICE products. Own onboarding, QBRs, expansion revenue, and churn prevention for a portfolio of enterprise accounts.',
    },
    {
        title: 'Technical Content Writer',
        department: 'Marketing',
        location: 'Remote',
        type: 'Contract',
        description: 'Write developer docs, case studies, and thought-leadership content that makes enterprise AI accessible. Requires comfort with technical subject matter and a clean, direct writing style.',
    },
];

const departments = ['All', 'Engineering', 'Design', 'Sales', 'Operations', 'Marketing'];

const values = [
    {
        icon: '⚡',
        title: 'Move Fast',
        description: 'We ship weekly. Ideas go from conversation to production in days, not quarters.',
    },
    {
        icon: '🧠',
        title: 'Think Deep',
        description: 'Surface-level solutions don\'t survive here. We go first-principles on every hard problem.',
    },
    {
        icon: '🎯',
        title: 'Own the Outcome',
        description: 'No hand-offs, no excuses. You own your work end-to-end, including the results.',
    },
    {
        icon: '🌍',
        title: 'Build for Impact',
        description: 'We\'re automating millions of conversations across healthcare, retail, and beyond. The scale is real.',
    },
];

export default function CareersPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All'
        ? openings
        : openings.filter(job => job.department === activeFilter);

    return (
        <main>
            {/* Hero */}
            <section className="careers-hero">
                <div className="careers-hero-content">
                    <div className="careers-badge">We&apos;re Hiring</div>
                    <h1 className="careers-hero-title">Build the future of<br />enterprise AI</h1>
                    <p className="careers-hero-subtitle">
                        Join a team that&apos;s moving fast, thinking deep, and shipping AI that enterprises actually use.
                    </p>
                    <div className="careers-hero-stats">
                        <div className="careers-stat">
                            <span className="careers-stat-value">50+</span>
                            <span className="careers-stat-label">Enterprise Clients</span>
                        </div>
                        <div className="careers-stat-divider" />
                        <div className="careers-stat">
                            <span className="careers-stat-value">3</span>
                            <span className="careers-stat-label">Product Lines</span>
                        </div>
                        <div className="careers-stat-divider" />
                        <div className="careers-stat">
                            <span className="careers-stat-value">100%</span>
                            <span className="careers-stat-label">Remote Friendly</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="careers-values-section">
                <div className="careers-container">
                    <div className="careers-section-header">
                        <h2 className="careers-section-title">How we work</h2>
                        <p className="careers-section-subtitle">Four principles that shape every decision we make.</p>
                    </div>
                    <div className="careers-values-grid">
                        {values.map(v => (
                            <div key={v.title} className="careers-value-card">
                                <span className="careers-value-icon">{v.icon}</span>
                                <h3 className="careers-value-title">{v.title}</h3>
                                <p className="careers-value-desc">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Roles */}
            <section className="careers-roles-section">
                <div className="careers-container">
                    <div className="careers-section-header">
                        <h2 className="careers-section-title">Open positions</h2>
                        <p className="careers-section-subtitle">{openings.length} roles across {departments.length - 1} teams.</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="careers-filter-tabs">
                        {departments.map(dept => (
                            <button
                                key={dept}
                                className={`careers-filter-tab ${activeFilter === dept ? 'active' : ''}`}
                                onClick={() => setActiveFilter(dept)}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>

                    {/* Job Cards */}
                    <div className="careers-jobs-list">
                        {filtered.map(job => (
                            <div key={job.title} className="careers-job-card">
                                <div className="careers-job-main">
                                    <div className="careers-job-meta">
                                        <span className="careers-job-dept">{job.department}</span>
                                        <span className="careers-job-dot" />
                                        <span className="careers-job-loc">{job.location}</span>
                                        <span className="careers-job-dot" />
                                        <span className={`careers-job-type ${job.type === 'Contract' ? 'contract' : ''}`}>{job.type}</span>
                                    </div>
                                    <h3 className="careers-job-title">{job.title}</h3>
                                    <p className="careers-job-desc">{job.description}</p>
                                </div>
                                <div className="careers-job-action">
                                    <a
                                        href={`mailto:careers@aice.ai?subject=Application: ${encodeURIComponent(job.title)}`}
                                        className="btn btn-primary careers-apply-btn"
                                    >
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="careers-empty">
                            <p>No open roles in this department right now.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="careers-cta-section">
                <div className="careers-cta-inner">
                    <h2 className="careers-cta-title">Don&apos;t see the right role?</h2>
                    <p className="careers-cta-desc">
                        We&apos;re always looking for exceptional people. Send us your CV and tell us how you&apos;d contribute.
                    </p>
                    <a
                        href="mailto:careers@aice.ai?subject=General Application"
                        className="btn btn-primary"
                    >
                        Send an open application
                    </a>
                </div>
            </section>
        </main>
    );
}
