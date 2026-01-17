'use client';

import { useRef, useEffect, type MouseEvent } from 'react';
import { useModal } from './ModalContext';

export default function HeroSection() {
    const { openModal } = useModal();
    const videoRef = useRef<HTMLVideoElement>(null);

    // Ensure video plays on any interaction if it was paused
    useEffect(() => {
        const handleInteraction = () => {
            if (videoRef.current && videoRef.current.paused) {
                videoRef.current.play().catch(e => console.log("Auto-play prevented (interaction needed):", e));
            }
        };

        // Attach listener to the section or document. 
        // User asked for "mouse click", so we'll listen on the hero section primarily.
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('click', handleInteraction);
        }

        return () => {
            if (heroSection) {
                heroSection.removeEventListener('click', handleInteraction);
            }
        };
    }, []);

    const scrollToSolutions = (e: MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the video play (though it wouldn't hurt)

        // Find the AI Solutions nav item and trigger hover/click
        const navItem = document.querySelector('.nav-item');
        if (navItem) {
            // Scroll to the sticky scroll section
            const stickySection = document.getElementById('what-we-do');
            if (stickySection) {
                stickySection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-bg"></div>

            <div className="hero-video-container">
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-transcode.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>

            <div className="hero-content">
                <h1 className="hero-title">
                    Reimagine Your<br />Business with AI
                </h1>
                <p className="hero-subtitle">
                    Accelerate operations with AICE&apos;s intelligent AI solutions. Automate customer interactions, streamline
                    workflows, and unlock the full potential of your enterprise.
                </p>
                <div className="hero-cta">
                    <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo</button>
                    <button className="btn btn-secondary btn-lg" onClick={scrollToSolutions}>Learn More</button>
                </div>
            </div>

            <div className="hero-scroll">
                <div className="hero-scroll-icon"></div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
}
