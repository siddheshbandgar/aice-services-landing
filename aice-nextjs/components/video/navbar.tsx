import Link from "next/link";
import { BOOKING_LINK } from "@/lib/video-booking-link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "/video/pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="relative flex items-center gap-3 rounded-full border border-stone-800 bg-[linear-gradient(180deg,rgba(28,25,23,0.88),rgba(20,17,15,0.96))] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur sm:gap-4 sm:px-5">
      <Link
        href="/"
        className="shrink-0 hidden items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-stone-600 transition hover:text-stone-400 sm:flex"
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        aice.services
      </Link>
      <div className="hidden h-4 w-px bg-stone-800 sm:block" />
      <Link href="/video" className="shrink-0 pr-2">
        <p className="text-[1.9rem] font-medium leading-none tracking-[-0.05em] text-stone-100">
          <span className="font-serif">Coco</span>
          <span className="text-[#c47a3e]">.</span>
        </p>
      </Link>

      <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[0.73rem] font-medium uppercase tracking-[0.24em] text-stone-500 transition hover:text-stone-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <a
        href={BOOKING_LINK}
        target="_blank"
        rel="noreferrer"
        className="ml-auto inline-flex rounded-full bg-[#d6a056] px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-stone-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition hover:bg-[#c48d45] sm:px-5 sm:text-[0.73rem] lg:ml-0"
      >
        Book Demo
      </a>

      <details className="relative lg:hidden">
        <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-stone-700 bg-stone-900/80 text-stone-100 transition hover:border-stone-500 hover:bg-stone-800 [&::-webkit-details-marker]:hidden">
          <span className="sr-only">Open navigation menu</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 7.5h15m-15 4.5h15m-15 4.5h15"
            />
          </svg>
        </summary>

        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-[min(18rem,calc(100vw-3rem))] overflow-hidden rounded-[1.5rem] border border-stone-800 bg-[linear-gradient(180deg,rgba(28,25,23,0.98),rgba(20,17,15,0.98))] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-stone-300 transition hover:bg-stone-800/80 hover:text-stone-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </details>
    </header>
  );
}
