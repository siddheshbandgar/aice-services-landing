"use client";

import { Animate, StaggerContainer, StaggerItem } from "./animate";

const testimonials = [
  {
    quote:
      "We went from posting once a month to four times a week. Our Instagram reach jumped 340% in the first two months. Coco just gets it.",
    name: "Priya Sharma",
    role: "Founder",
    company: "Aura Skincare",
  },
  {
    quote:
      "I was skeptical about outsourcing our video content but the very first reel they made outperformed everything we had done in-house for six months.",
    name: "Daniel Osei",
    role: "Marketing Director",
    company: "Kloud Fitness",
  },
  {
    quote:
      "They turned around our entire launch campaign in 10 days. Three ad films, twelve reels. All on brand. Our ROAS doubled that quarter.",
    name: "Arjun Mehta",
    role: "Co-founder & CEO",
    company: "BrewBox Coffee",
  },
  {
    quote:
      "Working with Coco feels like having a creative team in-house without the overhead. They understand our tone better than agencies three times their size.",
    name: "Sarah Chen",
    role: "Brand Manager",
    company: "Noma Interiors",
  },
  {
    quote:
      "The AI influencer they built for us was a game changer. We post daily now without shooting a single thing. Engagement is up 5x.",
    name: "Rohit Kapoor",
    role: "Head of Digital",
    company: "VoltEdge Electronics",
  },
  {
    quote:
      "Honestly the best investment we made last year. The content system they set up runs on autopilot and our DMs have never been busier.",
    name: "Emma Lindqvist",
    role: "Owner",
    company: "Studio Fika",
  },
];

export function TestimonialsSection() {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Animate variant="fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            What they say
          </p>
          <h2 className="mt-3 text-3xl font-medium leading-[1.15] tracking-[-0.03em] text-stone-100 sm:text-5xl">
            Don&apos;t just take our{" "}
            <span className="font-serif text-[2rem] italic text-[#d6a056] sm:text-[3.2rem]">word</span> for it
          </h2>
        </Animate>

        <StaggerContainer className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3" stagger={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name} variant="fade-up">
              <article
                className="mb-5 break-inside-avoid rounded-[1.5rem] border border-stone-800/80 bg-stone-900/40 p-5 sm:rounded-[2rem] sm:p-7"
              >
                {/* Stars */}
                <div className="flex gap-0.5 text-[#d6a056]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="mt-4 text-base leading-7 text-stone-300">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-800 text-sm font-medium text-stone-400">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-200">
                      {t.name}
                    </p>
                    <p className="text-xs text-stone-500">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
