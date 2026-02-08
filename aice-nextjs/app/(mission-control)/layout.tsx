import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./mission-control.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mission Control — AICE",
  description: "AI Agent Squad Dashboard for AICE Services",
};

export default function MissionControlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen bg-[#FAF9F6] text-[#1a1a1a] antialiased`}>
        {children}
      </body>
    </html>
  );
}
