'use client';

import { useRef, useEffect, type MouseEvent } from 'react';
import { useModal } from './ModalContext';

export default function HeroSection() {
    const { openModal } = useModal();
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(e => console.log("Play failed:", e));
            } else {
                // Optional: pause on click? User said "clicking should play", usually implies if it's not playing.
                // But for background video, resetting to play is safer usually.
                // Keeping it play-only ensures we don't accidentally pause if they miss a button.
                videoRef.current.play().catch(e => console.log("Play failed:", e));
            }
        }
    };

    const scrollToSolutions = (e: MouseEvent) => {
        e.stopPropagation();
        const stickySection = document.getElementById('what-we-do');
        if (stickySection) {
            stickySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" id="hero" onClick={togglePlay} style={{ cursor: 'pointer' }}>
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
                    <button className="btn btn-primary btn-lg" onClick={(e) => { e.stopPropagation(); openModal(); }}>Request a Demo</button>
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
