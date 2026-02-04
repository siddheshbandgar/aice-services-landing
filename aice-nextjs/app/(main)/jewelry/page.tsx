'use client';

import Link from 'next/link';

export default function JewelryPage() {
    return (
        <main>
            <section className="vertical-hero">
                <div className="container">
                    <h1>AI for Jewelry</h1>
                    <p>Enhance customer engagement with intelligent AI that assists with catalog browsing, personalized recommendations, and seamless purchasing experiences.</p>
                    <button className="btn btn-primary btn-lg">Get Started</button>
                </div>
            </section>

            <section className="coming-soon">
                <span className="coming-soon-badge">Coming Soon</span>
                <h2>Interactive Demo</h2>
                <p>Experience our AI-powered jewelry catalog assistant in action.</p>
                <Link href="/" className="btn btn-secondary">Back to Home</Link>
            </section>

            <style jsx>{`
        .vertical-hero { padding: 180px 0 100px; text-align: center; background: linear-gradient(135deg, #E8F4FD 0%, #FFFFFF 100%); }
        .vertical-hero h1 { font-size: var(--text-5xl); margin-bottom: var(--spacing-4); }
        .vertical-hero p { font-size: var(--text-lg); color: var(--color-gray-600); max-width: 600px; margin: 0 auto var(--spacing-8); }
        .coming-soon { padding: var(--spacing-24); text-align: center; }
        .coming-soon-badge { display: inline-block; padding: var(--spacing-3) var(--spacing-6); background: var(--color-light-blue); color: var(--color-accent-blue); border-radius: var(--radius-full); font-weight: var(--font-medium); margin-bottom: var(--spacing-6); }
        .coming-soon h2 { font-size: var(--text-2xl); margin-bottom: var(--spacing-4); }
        .coming-soon p { color: var(--color-gray-500); margin-bottom: var(--spacing-8); }
      `}</style>
        </main>
    );
}
