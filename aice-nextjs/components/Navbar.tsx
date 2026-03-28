'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useModal } from './ModalContext';

export default function Navbar() {
    const { openModal } = useModal();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleMobileDemoClick = () => {
        closeMobileMenu();
        openModal();
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link href="/" className="navbar-logo" onClick={closeMobileMenu}>AICE</Link>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/healthcare" className="nav-link">Healthcare</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/video" className="nav-link">Video</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/openclaw" className="nav-link">OpenClaw</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/founders" className="nav-link">Meet the Founders</Link>
                    </li>
                    <li className="nav-item">
                        <a href="https://aice.education" target="_blank" rel="noreferrer" className="nav-link">Education</a>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <Link href="/hackathon" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}>Hackathon</Link>
                    <button className="btn btn-primary" onClick={openModal}>Book a Demo</button>
                </div>

                <button
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    aria-label="Toggle menu"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-nav-item">
                    <Link href="/healthcare" className="mobile-nav-link" onClick={closeMobileMenu} style={{ display: 'block', padding: '12px 0', fontSize: '18px' }}>Healthcare</Link>
                </div>
                <div className="mobile-nav-item">
                    <Link href="/video" className="mobile-nav-link" onClick={closeMobileMenu} style={{ display: 'block', padding: '12px 0', fontSize: '18px' }}>Video</Link>
                </div>
                <div className="mobile-nav-item">
                    <Link href="/openclaw" className="mobile-nav-link" onClick={closeMobileMenu} style={{ display: 'block', padding: '12px 0', fontSize: '18px' }}>OpenClaw</Link>
                </div>
                <div className="mobile-nav-item">
                    <Link href="/hackathon" className="mobile-nav-link" onClick={closeMobileMenu} style={{ display: 'block', padding: '12px 0', fontSize: '18px' }}>Hackathon</Link>
                </div>
                <div className="mobile-nav-item">
                    <Link href="/founders" className="mobile-nav-link" onClick={closeMobileMenu} style={{ display: 'block', padding: '12px 0', fontSize: '18px' }}>Meet the Founders</Link>
                </div>
                <div className="mobile-nav-item">
                    <a href="https://aice.education" target="_blank" rel="noreferrer" className="mobile-nav-link" onClick={closeMobileMenu} style={{ display: 'block', padding: '12px 0', fontSize: '18px' }}>Education</a>
                </div>
                <div style={{ padding: '24px 0' }}>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleMobileDemoClick}>
                        Book a Demo
                    </button>
                </div>
            </div>
        </nav>
    );
}
