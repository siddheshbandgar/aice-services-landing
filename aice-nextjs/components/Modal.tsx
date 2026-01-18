'use client';

import { useState, useEffect, useCallback } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
    const [isLoading, setIsLoading] = useState(true);

    const close = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsLoading(true);
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
                    {isLoading && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', zIndex: 0, gap: '16px' }}>
                            <div style={{ width: 40, height: 40, border: '4px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Loading calendar...</p>
                        </div>
                    )}
                    <iframe
                        src="https://calendar.app.google/P2SCwX7kfkqxnUJn9"
                        style={{ border: 0, width: '100%', height: '100%', position: 'relative', zIndex: 10 }}
                        title="Book a Demo"
                        onLoad={() => setIsLoading(false)}
                    ></iframe>
                </div>
            </div>
        </>
    );
}
