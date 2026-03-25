"use client";

import { Animate, StaggerContainer, StaggerItem } from "./animate";

const solutions = [
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
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>
    ),
    title: "We handle everything, you just approve",
    blurb: "From ideation to final cut. No more chasing freelancers or managing edits yourself",
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
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
    ),
    title: "New content goes out every single week",
    blurb: "A system, not a scramble. You will never wonder what to post again",
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
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        />
      </svg>
    ),
    title: "Creative that actually feels like your brand",
    blurb: "AI-powered production with a human eye. Built to stop the scroll, not blend into it",
  },
];

export function SolutionSection() {
  return (
    <section className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <Animate variant="scale-in">
        <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-[#c48d45]/30 bg-[linear-gradient(135deg,#3a2510_0%,#2a1a0a_50%,#0c0a09_100%)] p-6 shadow-[0_20px_60px_rgba(214,160,86,0.15)] sm:rounded-[2rem] sm:p-10 lg:rounded-[2.5rem] lg:p-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Left: headline */}
            <Animate variant="slide-left" delay={0.1}>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                  The solution
                </p>
                <h2 className="mt-3 text-2xl font-medium leading-[1.15] tracking-[-0.03em] text-white sm:text-3xl lg:text-[2.75rem]">
                  What if your content just{" "}
                  <span className="font-serif text-[1.7rem] italic text-[#d6a056] sm:text-[2.1rem] lg:text-[3.2rem]">
                    goes viral
                  </span>{" "}
                  every week
                </h2>
              </div>
            </Animate>

            {/* Right: solutions */}
            <StaggerContainer className="flex flex-col gap-4" stagger={0.15}>
              {solutions.map((solution) => (
                <StaggerItem key={solution.title} variant="slide-right">
                  <div className="flex items-start gap-4 rounded-2xl border border-[#c48d45]/20 bg-[#2a1a0a]/80 px-5 py-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3a2510] text-[#d6a056]">
                      {solution.icon}
                    </span>
                    <div>
                      <h3 className="text-base font-medium tracking-[-0.01em] text-white">
                        {solution.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-stone-400">
                        {solution.blurb}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </Animate>
    </section>
  );
}
