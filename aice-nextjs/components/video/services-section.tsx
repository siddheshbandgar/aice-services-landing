"use client";

import { Animate, StaggerContainer, StaggerItem } from "./animate";

const services = [
  {
    number: "01",
    title: "Cinematic Ad Films",
    blurb:
      "High-impact short films that sell. Story-driven, beautifully shot, built to convert on every platform.",
    gradient: "from-[#3d2510] to-stone-950",
  },
  {
    number: "02",
    title: "Trend Led Reels",
    blurb:
      "Scroll-stopping reels that ride the wave. We spot the trends early and turn them into content for your brand.",
    gradient: "from-[#1e2840] to-stone-950",
  },
  {
    number: "03",
    title: "AI Influencer for Your Business",
    blurb:
      "A virtual brand ambassador powered by AI. Always on, always on-brand, always creating.",
    gradient: "from-[#1a3822] to-stone-950",
  },
  {
    number: "04",
    title: "Social Presence System",
    blurb:
      "A done-for-you content engine. Strategy, creation, and publishing on autopilot every single week.",
    gradient: "from-[#3a1a2a] to-stone-950",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Animate variant="fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Our services
          </p>
          <h2 className="mt-3 text-3xl font-medium leading-[1.15] tracking-[-0.03em] text-stone-100 sm:text-5xl">
            Not just content. Content that{" "}
            <span className="font-serif text-[2rem] italic text-[#d6a056] sm:text-[3.2rem]">works.</span>
          </h2>
        </Animate>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.1}>
          {services.map((service) => (
            <StaggerItem key={service.title} variant="scale-in">
              <article
                className={`group relative overflow-hidden rounded-[1.5rem] border border-stone-800/80 bg-gradient-to-br ${service.gradient} p-6 transition-all duration-300 sm:rounded-[2rem] sm:p-8 hover:border-[#c48d45]/40 hover:shadow-[0_0_40px_rgba(214,160,86,0.08)]`}
              >
                {/* Subtle shine effect */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/[0.02] blur-2xl transition-all duration-500 group-hover:bg-white/[0.04]" />

                <div className="relative flex items-start justify-between">
                  <p className="font-serif text-4xl font-medium italic text-[#d6a056]/20 transition-colors duration-300 sm:text-5xl group-hover:text-[#d6a056]/40">
                    {service.number}
                  </p>
                </div>

                <h3 className="relative mt-4 text-xl font-medium leading-[1.25] tracking-[-0.03em] text-stone-100 sm:mt-6 sm:text-2xl">
                  {service.title}
                </h3>

                <p className="relative mt-3 max-w-md text-base leading-7 text-stone-500 transition-colors duration-300 group-hover:text-stone-400">
                  {service.blurb}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-12 bg-[#d6a056]/20 transition-all duration-300 group-hover:w-20 group-hover:bg-[#d6a056]/40" />
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
