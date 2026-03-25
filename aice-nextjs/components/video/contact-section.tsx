"use client";

import { BOOKING_LINK } from "@/lib/video-booking-link";
import { Animate } from "./animate";
import { SiteFooter } from "./site-footer";

export function ContactSection() {
  return (
    <section id="contact" className="px-6 pb-10 pt-16 sm:px-10 lg:px-12 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        {/* Main CTA block */}
        <Animate variant="scale-in" duration={0.7}>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-stone-800/60 bg-gradient-to-br from-[#3d2510] via-[#2a1a0e] to-[#1a1208] px-6 py-12 shadow-[0_40px_100px_rgba(0,0,0,0.35)] sm:rounded-[2rem] sm:px-14 sm:py-20 lg:rounded-[2.5rem] lg:px-20 lg:py-28">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#d6a056]/[0.06] blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#c47a3e]/[0.04] blur-[120px]" />

            <div className="relative flex flex-col items-center gap-5 text-center sm:gap-8">
              <Animate variant="fade-up" delay={0.15}>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d6a056] sm:text-sm">
                  Let&apos;s build something
                </p>
              </Animate>
              <Animate variant="fade-up" delay={0.25}>
                <h2 className="max-w-3xl text-[1.65rem] font-medium leading-[1.3] tracking-[-0.03em] text-stone-100 sm:text-[2.2rem] lg:text-[2.8rem]">
                  Let&apos;s make your brand
                  <br className="hidden lg:block" />{" "}
                  <span className="font-serif text-[2rem] italic text-[#d6a056] sm:text-[2.7rem] lg:text-[3.4rem]">
                    impossible to ignore.
                  </span>
                </h2>
              </Animate>
              <Animate variant="fade-up" delay={0.35}>
                <p className="max-w-xl text-base leading-7 text-stone-500 sm:text-lg sm:leading-8">
                  One call is all it takes to see if we&apos;re the right fit. No
                  hard sell. Just a real conversation about where you are and where
                  you want to go.
                </p>
              </Animate>

              <Animate variant="fade-up" delay={0.45}>
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d6a056] px-7 py-3.5 text-sm font-medium text-stone-950 sm:w-auto sm:px-8 sm:py-4 sm:text-base shadow-[0_4px_20px_rgba(214,160,86,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-[#e0ad64] hover:shadow-[0_6px_30px_rgba(214,160,86,0.35)]"
                >
                  Book Demo
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </Animate>
            </div>
          </div>
        </Animate>

        {/* Footer strip */}
        <Animate variant="fade-in" delay={0.2}>
          <SiteFooter className="mt-6 sm:mt-8" />
        </Animate>
      </div>
    </section>
  );
}
