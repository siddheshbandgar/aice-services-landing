'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyUpsell() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
            <div className="mx-auto max-w-4xl p-4">
                <div className="relative overflow-hidden rounded-xl border border-[#ff6b6b]/30 bg-[#0a0c14]/95 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b]/5 to-[#f97316]/5" />

                    <div className="relative flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-semibold text-white">
                                This looks like a lot of work...
                            </h3>
                            <p className="text-sm text-slate-400">
                                Skip the 4-8 hours of setup. We'll handle everything.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 md:items-end">
                            <a
                                href="https://buy.stripe.com/cNiaEZgYqf8Rg27bcbc3m07"
                                className="inline-flex whitespace-nowrap rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#f97316] px-6 py-2.5 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(255,107,107,0.25)] transition hover:translate-y-[-1px] hover:shadow-[0_8px_25px_rgba(255,107,107,0.35)]"
                            >
                                Let Us Set It Up for $99 →
                            </a>
                            <p className="text-[10px] text-slate-500">
                                100% money-back guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
