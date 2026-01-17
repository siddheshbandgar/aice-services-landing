'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useModal } from './ModalContext';

const industries = [
    {
        href: '/real-estate',
        title: 'AI for Real Estate',
        desc: 'Automated calling agents & lead qualification',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        href: '/jewelry',
        title: 'AI for Jewelry',
        desc: 'Customer engagement & catalog assistance',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12l4 6-10 13L2 9Z" />
                <path d="M11 3 8 9l4 13 4-13-3-6" />
                <path d="M2 9h20" />
            </svg>
        ),
    },
    {
        href: '/healthcare',
        title: 'AI for Healthcare',
        desc: 'Medical tourism & patient support',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
    },
    {
        href: '/business',
        title: 'AI for Business',
        desc: 'Corporate & admin automation',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        ),
    },
    {
        href: '/manufacturing',
        title: 'AI for Manufacturing',
        desc: 'Process optimization & quality control',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            </svg>
        ),
    },
];

export default function Navbar() {
    const { openModal } = useModal();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link href="/" className="navbar-logo">AICE</Link>

                <ul className="navbar-nav">
                    <li className="nav-item" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleDropdown(); }} id="ai-solutions-link">
                            AI Solutions
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </a>
                        <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                            <div className="dropdown-header">Industries</div>
                            {industries.map((item) => (
                                <Link key={item.href} href={item.href} className="dropdown-item">
                                    <div className="dropdown-item-icon">{item.icon}</div>
                                    <div className="dropdown-item-content">
                                        <div className="dropdown-item-title">{item.title}</div>
                                        <div className="dropdown-item-desc">{item.desc}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link href="/founders" className="nav-link">Meet the Founders</Link>
                    </li>
                </ul>

                <div className="navbar-actions">
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
                    <a href="#" className="mobile-nav-link">
                        AI Solutions
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </a>
                    <div className="mobile-dropdown">
                        {industries.map((item) => (
                            <Link key={item.href} href={item.href} className="mobile-dropdown-item">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mobile-nav-item">
                    <Link href="/founders" className="mobile-nav-link">Meet the Founders</Link>
                </div>
                <div style={{ padding: '24px 0' }}>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={openModal}>
                        Book a Demo
                    </button>
                </div>
            </div>
        </nav>
    );
}
