import type { Metadata } from "next";
import { Geist_Mono, Inter, STIX_Two_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const stixTwoText = STIX_Two_Text({
  variable: "--font-stix-two-text",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Coco Studios | AI Video Marketing Agency",
  description:
    "Coco Studios is an AI video-driven marketing agency creating ads, reels, and social content that helps brands earn more visibility and grow faster.",
};

export default function VideoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${stixTwoText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
