'use client';

import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ModalProvider } from '@/components/ModalContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModalWrapper from '@/components/ModalWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
          <ModalWrapper />
        </ModalProvider>
        {/* MagicalCX Chatbot Widget */}
        <Script
          src="https://www.magicalcx.com/api/widget/c044c97b-7e01-401a-bcc8-9c16c19713ce"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

