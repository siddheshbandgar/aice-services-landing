'use client';

import { useModal } from './ModalContext';
import Link from 'next/link';

export default function CTASection() {
    const { openModal } = useModal();

    const scrollToAISolutions = () => {
        const section = document.getElementById('what-we-do');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-grid">
                    <div className="cta-card">
                        <div className="cta-card-content">
                            <h3 className="cta-card-title">Start using AI agents today</h3>
                            <p className="cta-card-desc">Browse and deploy our pre-built AI solutions.</p>
                        </div>
                        <button className="btn btn-primary" onClick={scrollToAISolutions}>View Solutions</button>
                    </div>

                    <div className="cta-card">
                        <div className="cta-card-content">
                            <h3 className="cta-card-title">Transform your business with us</h3>
                            <p className="cta-card-desc">Find out how AICE can help you today.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={openModal}>Talk to an Expert</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
