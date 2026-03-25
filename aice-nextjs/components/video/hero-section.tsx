"use client";

import { motion } from "framer-motion";
import { BOOKING_LINK } from "@/lib/video-booking-link";
import { Navbar } from "./navbar";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen overflow-hidden px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:pb-24 lg:pt-10">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="https://firebasestorage.googleapis.com/v0/b/supercx-ai.firebasestorage.app/o/v23.mp4?alt=media&token=0790ada2-abb7-4f69-985a-c639ddf9c7a9"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Navbar />
        </motion.div>

        <div className="mt-20 flex flex-1 items-center justify-center sm:mt-24 lg:mt-0">
          <div className="mx-auto max-w-5xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mx-auto max-w-4xl text-[2.5rem] font-medium leading-[1.12] tracking-[-0.05em] text-stone-100 sm:text-6xl lg:text-[5.2rem]"
            >
              Videos that{" "}
              <span className="font-serif font-medium italic text-[#d6a056]">
                make
              </span>
              <br />
              <span className="font-serif font-medium italic text-[#d6a056]">
                people follow you.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-400 sm:mt-8 sm:text-xl sm:leading-9"
            >
              Coco Studios creates AI-powered ads, trend-led reels, and social
              video systems that gives your brand more visibility, more views,
              and a much stronger presence online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
              className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-stone-100 px-7 py-4 text-base font-medium text-stone-950 transition hover:bg-white"
              >
                Book Demo
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full border border-stone-700 bg-stone-900/60 px-7 py-4 text-base font-medium text-stone-200 transition hover:border-stone-500 hover:bg-stone-800"
              >
                View work
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
