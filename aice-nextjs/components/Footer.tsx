import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-bottom">
                    <p className="footer-copyright">© 2026 AICE. All rights reserved.</p>
                    <div className="footer-legal">
                        <Link href="/" className="footer-legal-link">Home</Link>
                        <a href="#" className="footer-legal-link">Privacy</a>
                        <a href="#" className="footer-legal-link">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
