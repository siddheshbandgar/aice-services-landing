'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
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
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
          <ModalWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}
