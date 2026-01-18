'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const testimonials = [
    {
        quote: "AICE transformed our real estate operations. The automated calling agents increased our lead conversion by 40% while reducing our operational costs significantly.",
        name: "Rajesh Sharma",
        role: "CEO, Corporate Stays",
        location: "Pune, India",
        initials: "RS"
    },
    {
        quote: "The AI customer support bots handle 80% of our patient inquiries automatically. This has allowed our staff to focus on providing better in-person care.",
        name: "Dr. Priya Menon",
        role: "Director, MediVoyage International",
        location: "Chennai, India",
        initials: "PM"
    },
    {
        quote: "Implementing AICE's document processing AI saved our finance team 30 hours per week. The accuracy is remarkable and the ROI was immediate.",
        name: "Vivek Krishnamurthy",
        role: "CFO, CaratLounge",
        location: "Singapore",
        initials: "VK"
    },
    {
        quote: "AICE's workflow automation has streamlined our manufacturing processes. We're now able to predict and prevent issues before they impact production.",
        name: "Ananya Desai",
        role: "COO, Precision Tech Manufacturing",
        location: "Mumbai, India",
        initials: "AD"
    }
];

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// Create extended array for infinite scroll effect
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [itemWidth, setItemWidth] = useState(0);

    // Calculate item width on mount and resize
    useEffect(() => {
        const updateWidth = () => {
            if (trackRef.current && trackRef.current.children.length > 0) {
                const firstCard = trackRef.current.children[0] as HTMLElement;
                const style = window.getComputedStyle(trackRef.current);
                const gap = parseFloat(style.gap || '0');
                setItemWidth(firstCard.offsetWidth + gap);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const goTo = useCallback((index: number) => {
        if (isAnimating) return;

        // Circular navigation
        let newIndex = index;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        if (newIndex >= testimonials.length) newIndex = 0;

        setIsAnimating(true);
        setActiveIndex(newIndex);

        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    // Apply transform - offset by testimonials.length to start in the middle set
    useEffect(() => {
        if (trackRef.current && itemWidth > 0) {
            const offset = (activeIndex + testimonials.length) * itemWidth;
            trackRef.current.style.transform = `translateX(-${offset}px)`;
        }
    }, [activeIndex, itemWidth]);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            goTo(activeIndex + 1);
        }, 6000);
        return () => clearInterval(interval);
    }, [activeIndex, goTo]);

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <span className="testimonials-label">Customer Stories</span>
                    <h2 className="testimonials-title">What Our Customers Say</h2>
                </div>

                <div className="testimonials-carousel">
                    <div className="testimonials-track" ref={trackRef}>
                        {extendedTestimonials.map((t, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="testimonial-rating">
                                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                                </div>
                                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.initials}</div>
                                    <div className="testimonial-info">
                                        <div className="testimonial-name">{t.name}</div>
                                        <div className="testimonial-role">{t.role}</div>
                                        <div className="testimonial-location">{t.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="testimonials-nav">
                    <button
                        className="testimonial-arrow"
                        onClick={() => goTo(activeIndex - 1)}
                        aria-label="Previous testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <div className="testimonials-dots">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`testimonial-dot ${activeIndex === i ? 'active' : ''}`}
                                onClick={() => goTo(i)}
                            />
                        ))}
                    </div>
                    <button
                        className="testimonial-arrow"
                        onClick={() => goTo(activeIndex + 1)}
                        aria-label="Next testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

