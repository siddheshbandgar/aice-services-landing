'use client';

import Image from 'next/image';

export default function GlobalAISummitPage() {
    return (
        <div className="summit-root">
            {/* Premium co-branded header */}
            <header className="summit-header">
                <div className="summit-header-glow"></div>
                <div className="summit-header-content">
                    <div className="summit-left">
                        <a href="https://aice.services" target="_blank" rel="noopener noreferrer" className="summit-aice">
                            AICE
                        </a>
                        <span className="summit-sep"></span>
                        <div className="summit-logo-badge">
                            <Image
                                src="/ai-summit-logo.png"
                                alt="India AI Impact Summit 2026"
                                width={100}
                                height={28}
                                priority
                                style={{ objectFit: 'contain', display: 'block' }}
                            />
                        </div>
                    </div>
                    <div className="summit-right">
                        <div className="summit-live-badge">
                            <span className="summit-dot"></span>
                            LIVE
                        </div>
                        <a href="https://aice.services" target="_blank" rel="noopener noreferrer" className="summit-home">
                            Home
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4.5 3L8 6L4.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                    </div>
                </div>
                {/* Gradient accent line */}
                <div className="summit-accent-line"></div>
            </header>

            {/* Full-screen chatbot */}
            <iframe
                src="https://www.magicalcx.com/share/ae6d032e-5bd3-4b96-90b2-b0106afa2ad6"
                title="AICE AI Agent — India AI Impact Summit 2026"
                className="summit-iframe"
                allow="microphone"
            />

            <style jsx>{`
                .summit-root {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    height: 100dvh;
                    width: 100%;
                    background: #060612;
                    overflow: hidden;
                }

                /* ---- Header ---- */
                .summit-header {
                    flex-shrink: 0;
                    position: relative;
                    background: rgba(10, 10, 30, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }

                .summit-header-glow {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 300px;
                    height: 100%;
                    background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
                    pointer-events: none;
                }

                .summit-header-content {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                    height: 46px;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .summit-accent-line {
                    height: 1px;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        #ff9933 20%,
                        #ffffff 40%,
                        #818cf8 60%,
                        #138808 80%,
                        transparent 100%
                    );
                    opacity: 0.4;
                }

                /* ---- Left section ---- */
                .summit-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .summit-aice {
                    font-size: 18px;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.85);
                    letter-spacing: -0.02em;
                    text-decoration: none;
                }

                .summit-sep {
                    width: 1px;
                    height: 18px;
                    background: linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent);
                }

                .summit-logo-badge {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 7px;
                    padding: 4px 10px;
                    height: 30px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05);
                }

                /* ---- Right section ---- */
                .summit-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .summit-live-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 10px;
                    font-weight: 700;
                    color: #34d399;
                    letter-spacing: 1.2px;
                }

                .summit-dot {
                    width: 6px;
                    height: 6px;
                    background: #34d399;
                    border-radius: 50%;
                    box-shadow: 0 0 6px rgba(52, 211, 153, 0.6);
                    animation: glow 2.5s ease-in-out infinite;
                }

                @keyframes glow {
                    0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(52, 211, 153, 0.6); }
                    50% { opacity: 0.5; box-shadow: 0 0 12px rgba(52, 211, 153, 0.3); }
                }

                .summit-home {
                    display: inline-flex;
                    align-items: center;
                    gap: 3px;
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.4);
                    text-decoration: none;
                }

                /* ---- Chatbot ---- */
                .summit-iframe {
                    flex: 1;
                    width: 100%;
                    border: none;
                    display: block;
                }

                /* ---- Mobile ---- */
                @media (max-width: 480px) {
                    .summit-header-content {
                        padding: 0 14px;
                        height: 42px;
                    }

                    .summit-left {
                        gap: 8px;
                    }

                    .summit-aice {
                        font-size: 16px;
                    }

                    .summit-sep {
                        height: 14px;
                    }

                    .summit-logo-badge {
                        height: 24px;
                        padding: 3px 7px;
                        border-radius: 5px;
                    }

                    .summit-live-badge {
                        font-size: 9px;
                    }

                    .summit-home {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}
