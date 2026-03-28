import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
    title: 'Sales Hackathon — AICE × Magical CX | April 4, 2026',
    description: "Hyderabad's first Sales Hackathon. Sell Magical CX. Earn 20% lifetime recurring commission. April 4th, Skyview 10, Gachibowli.",
};

export default function HackathonLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className} style={{ margin: 0, padding: 0 }}>
                {children}
            </body>
        </html>
    );
}
