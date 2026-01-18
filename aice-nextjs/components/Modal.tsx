'use client';

import { useState, useEffect, useCallback } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CALENDAR_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ01_DJwKqViHa2S8W4NZOfBXDI6hE-cS4v3fhtMWxsa5G3q49qdzED-3uqVD370bEIQg8c1imh3?gv=true";

export default function Modal({ isOpen, onClose }: ModalProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const close = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsLoading(true);
            setHasError(false);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [close]);

    // Timeout to detect if iframe doesn't load
    useEffect(() => {
        if (isOpen && isLoading) {
            const timeout = setTimeout(() => {
                if (isLoading) {
                    setHasError(true);
                    setIsLoading(false);
                }
            }, 10000); // 10 second timeout
            return () => clearTimeout(timeout);
        }
    }, [isOpen, isLoading]);

    if (!isOpen) return null;

    return (
        <>
            <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={close}></div>
            <div className={`modal ${isOpen ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Book a Demo</h2>
                    <button className="modal-close" aria-label="Close" onClick={close}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="modal-body" style={{ padding: 0, height: '600px', overflow: 'hidden', position: 'relative' }}>
                    {isLoading && !hasError && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', zIndex: 20, gap: '16px' }}>
                            <div style={{ width: 40, height: 40, border: '4px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Loading calendar...</p>
                        </div>
                    )}
                    {hasError && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', zIndex: 20, gap: '16px', padding: '24px', textAlign: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <p style={{ color: '#374151', fontSize: '16px', margin: 0, fontWeight: 500 }}>Unable to load calendar</p>
                            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Your browser may be blocking the embedded calendar.</p>
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    marginTop: '8px',
                                    padding: '12px 24px',
                                    background: '#3b82f6',
                                    color: 'white',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={e => (e.target as HTMLElement).style.background = '#2563eb'}
                                onMouseOut={e => (e.target as HTMLElement).style.background = '#3b82f6'}
                            >
                                Open Calendar in New Tab
                            </a>
                        </div>
                    )}
                    <iframe
                        src={CALENDAR_URL}
                        style={{ border: 0, width: '100%', height: '100%', position: 'relative', zIndex: 10 }}
                        title="Book a Demo"
                        onLoad={() => {
                            setIsLoading(false);
                            setHasError(false);
                        }}
                        onError={() => {
                            setHasError(true);
                            setIsLoading(false);
                        }}
                    ></iframe>
                </div>
            </div>
        </>
    );
}
