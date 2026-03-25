"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animate, StaggerContainer, StaggerItem } from "./animate";

const portfolio = [
  { label: "Launch Reel", category: "Ad Film", video: "/launch-reel.mp4", format: "cinematic" as const },
  { label: "Brand Story", category: "Cinematic", video: "/brand-story.mp4", format: "cinematic" as const },
  { label: "UGC Ad Cut", category: "Paid Creative", video: "/UGC Ad Cut.mp4", format: "reel" as const },
  { label: "Retargeting Spot", category: "Ad Film", video: "/retargeting.mp4", format: "reel" as const },
  { label: "Trend Reel", category: "Organic", video: "/trend-reel.mp4", format: "reel" as const },
  { label: "Product Drop", category: "Paid Creative", video: "/product drop serum.mp4", format: "reel" as const },
];

function useCanHover() {
  return useMemo(() => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches, []);
}

const LOADER_MIN_MS = 400;

function WorkVideoCard({ item }: { item: (typeof portfolio)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mountedAt = useRef(0);
  useEffect(() => { mountedAt.current = Date.now(); }, []);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(item.format === "reel" ? 9 / 16 : 16 / 9);
  const canHover = useCanHover();

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { setMuted(false); v.play().catch(() => { /* play blocked */ }); }
    else v.pause();
  };

  const hideLoader = useCallback(() => {
    const start = mountedAt.current || Date.now();
    const elapsed = Date.now() - start;
    setTimeout(() => setLoading(false), Math.max(0, LOADER_MIN_MS - elapsed));
  }, []);

  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if ((el?.readyState ?? 0) >= 2) hideLoader();
  }, [hideLoader]);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-stone-800/80 bg-stone-900/40 transition-all duration-300 sm:rounded-[1.5rem] lg:rounded-[2rem] hover:border-stone-700">
      <div
        className="relative w-full cursor-pointer overflow-hidden bg-[linear-gradient(135deg,#1c1917_0%,#0c0a09_100%)]"
        style={{ aspectRatio }}
        onClick={handleClick}
        onMouseEnter={() => { if (canHover) videoRef.current?.play().catch(() => {}); }}
        onMouseLeave={() => { if (canHover) videoRef.current?.pause(); }}
      >
        <video ref={setVideoRef} src={item.video} preload="auto" className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          playsInline muted={muted} loop
          onLoadedMetadata={(e) => { if (item.format === "cinematic") setAspectRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight); if (e.currentTarget.readyState >= 2) hideLoader(); }}
          onLoadedData={hideLoader}
          onCanPlay={hideLoader}
          onError={hideLoader} />
        {loading && (
          <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-stone-950/90">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-500 border-t-[#d6a056]" aria-hidden />
          </div>
        )}
        <button onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }} aria-label={muted ? "Unmute" : "Mute"}
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-stone-600/80 bg-stone-900/80 text-stone-300 backdrop-blur-sm transition active:scale-95 sm:h-9 sm:w-9 hover:border-[#d6a056]/50 hover:text-[#d6a056]">
          {muted ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          )}
        </button>
      </div>
      <div className="flex items-center justify-between px-3 py-3 sm:px-6 sm:py-5">
        <h3 className="text-sm font-medium tracking-[-0.01em] text-stone-200 sm:text-base">{item.label}</h3>
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-stone-600">{item.category}</span>
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Animate variant="fade-up">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                Our work
              </p>
              <h2 className="mt-3 text-2xl font-medium leading-[1.18] tracking-[-0.03em] text-stone-100 sm:text-5xl">
                Experience the{" "}
                <span className="font-serif text-[1.75rem] italic text-[#d6a056] sm:text-[3.2rem]">magic</span>{" "}
                we&apos;ve created
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-stone-500">
              Every project is a story. Here are some of our favourites from brands we have helped grow.
            </p>
          </div>
        </Animate>

        <StaggerContainer className="mt-8 grid grid-cols-1 items-start gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4" stagger={0.08}>
          {portfolio.map((item) => (
            <StaggerItem key={item.label} variant="scale-in" className={item.format === "cinematic" ? "sm:col-span-2" : ""}>
              <WorkVideoCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
