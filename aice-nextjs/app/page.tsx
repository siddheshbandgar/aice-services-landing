import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import StickyScroll from '@/components/StickyScroll';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Logos from '@/components/Logos';

export const metadata: Metadata = {
  title: 'AICE - AI Services for Enterprise',
  description: 'AICE - Enterprise AI Solutions for Real Estate, Jewelry, Healthcare, Business Services, and Manufacturing. Transform your business with intelligent automation.',
};

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* What AICE Can Do - Sticky Scroll Section */}
      <StickyScroll />

      {/* Why Choose AICE - Glass Cards Section */}
      <section className="glass-cards-section" id="why-aice">
        <div className="glass-cards-container">
          <div className="glass-cards-header">
            <span className="glass-cards-label">Why Choose Us</span>
            <h2 className="glass-cards-title">Why Choose AICE</h2>
            <p className="glass-cards-subtitle">Built for enterprises that demand excellence in AI automation</p>
          </div>

          <div className="glass-cards-grid">
            <div className="glass-card">
              <div className="glass-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="glass-card-title">Speed</h3>
              <p className="glass-card-desc">Faster time-to-value with our enterprise AI solutions and AI agent marketplace.</p>
            </div>

            <div className="glass-card">
              <div className="glass-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3 className="glass-card-title">Control</h3>
              <p className="glass-card-desc">The power of a standardized platform built for the demands of the enterprise.</p>
            </div>

            <div className="glass-card">
              <div className="glass-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <h3 className="glass-card-title">Flexibility</h3>
              <p className="glass-card-desc">Take control with seamless connection to any AI model, data source, enterprise app, or company infrastructure you need.</p>
            </div>

            <div className="glass-card">
              <div className="glass-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                  <polyline points="7.5 19.79 7.5 14.6 3 12" />
                  <polyline points="21 12 16.5 14.6 16.5 19.79" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="glass-card-title">Deep Capabilities</h3>
              <p className="glass-card-desc">An agent platform with the depth to adapt to every interaction, workflow, behavior, and enterprise ecosystem it&apos;s deployed into.</p>
            </div>

            <div className="glass-card">
              <div className="glass-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4" />
                  <path d="m6.41 6.41-2.83-2.83" />
                  <path d="M2 12h4" />
                  <path d="m6.41 17.59-2.83 2.83" />
                  <path d="M12 18v4" />
                  <path d="m17.59 17.59 2.83 2.83" />
                  <path d="M18 12h4" />
                  <path d="m17.59 6.41 2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <h3 className="glass-card-title">Proven Experience</h3>
              <p className="glass-card-desc">We are an AI-first company that has built its technology and success hand-in-hand with global enterprise customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <Logos />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
