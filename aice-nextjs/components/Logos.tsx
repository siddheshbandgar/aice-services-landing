'use client';

export default function Logos() {
    return (
        <section className="logos-section" id="customers">
            <div className="logos-container">
                <div className="logos-header">
                    <span className="logos-label">Trusted by leading enterprises</span>
                </div>

                <div className="logos-marquee">
                    <div className="logos-track">
                        <div className="logo-item"><span className="logo-placeholder">TechCorp</span></div>
                        <div className="logo-item"><span className="logo-placeholder">InnovateCo</span></div>
                        <div className="logo-item"><span className="logo-placeholder">GlobalTech</span></div>
                        <div className="logo-item"><span className="logo-placeholder">FutureSoft</span></div>
                        <div className="logo-item"><span className="logo-placeholder">DataFlow</span></div>
                        <div className="logo-item"><span className="logo-placeholder">CloudNine</span></div>
                        <div className="logo-item"><span className="logo-placeholder">NextGen</span></div>
                        <div className="logo-item"><span className="logo-placeholder">SmartBiz</span></div>
                    </div>
                    {/* Duplicate for infinite scroll effect */}
                    <div className="logos-track">
                        <div className="logo-item"><span className="logo-placeholder">TechCorp</span></div>
                        <div className="logo-item"><span className="logo-placeholder">InnovateCo</span></div>
                        <div className="logo-item"><span className="logo-placeholder">GlobalTech</span></div>
                        <div className="logo-item"><span className="logo-placeholder">FutureSoft</span></div>
                        <div className="logo-item"><span className="logo-placeholder">DataFlow</span></div>
                        <div className="logo-item"><span className="logo-placeholder">CloudNine</span></div>
                        <div className="logo-item"><span className="logo-placeholder">NextGen</span></div>
                        <div className="logo-item"><span className="logo-placeholder">SmartBiz</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
