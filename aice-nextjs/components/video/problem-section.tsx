"use client";

import { Animate } from "./animate";

const problems = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: "You have ideas but nothing goes out",
    blurb: "It is stuck in edits, waiting on approvals, or sitting in a folder somewhere. Meanwhile your competitors posted three times today",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
    title: "You keep saying you will post more. It never happens",
    blurb: "Not because you do not care. Because no one is owning it",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    ),
    title: "Their videos get shared. Yours get ignored",
    blurb: "It is not the budget. Their content was just built to stop the scroll. Yours was not",
  },
];

export function ProblemSection() {
  return (
    <section className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <Animate variant="fade-up" duration={0.8}>
        <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-stone-800 bg-[linear-gradient(180deg,rgba(28,25,23,0.7),rgba(20,17,15,0.94))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:rounded-[2rem] sm:p-10 lg:rounded-[2.5rem] lg:p-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Left: headline */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                The problem
              </p>
              <h2 className="mt-3 text-2xl font-medium leading-[1.15] tracking-[-0.03em] text-stone-100 sm:text-3xl lg:text-[2.75rem]">
                You keep seeing smaller brands go viral online.
                <span className="text-stone-500">
                  {" "}And wondering why yours has not.
                </span>
              </h2>
            </div>

            {/* Right: pain points */}
            <div className="flex flex-col gap-4">
              {problems.map((problem) => (
                <div
                  key={problem.title}
                  className="flex items-start gap-4 rounded-2xl border border-stone-800 bg-stone-900/60 px-5 py-4"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-[#d6a056]">
                    {problem.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-medium tracking-[-0.01em] text-stone-100">
                      {problem.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-stone-500">
                      {problem.blurb}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Animate>
    </section>
  );
}
