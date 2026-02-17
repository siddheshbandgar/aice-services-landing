import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AICE x India AI Impact Summit 2026',
    description: 'Chat with our AI agent at the India AI Impact Summit 2026, Bharat Mandapam, New Delhi. Powered by AICE & MagicalCX.',
};

export default function SummitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className} style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
                {children}
            </body>
        </html>
    );
}
