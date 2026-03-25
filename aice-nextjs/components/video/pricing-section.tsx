"use client";

import { useState } from "react";
import { BOOKING_LINK } from "@/lib/video-booking-link";
import { Animate, StaggerContainer, StaggerItem } from "./animate";

const plans = [
  {
    label: "Product Motion Films",
    title: "Turn Images into Films",
    description:
      "Bring product listings to life. We transform your existing images into short, cinematic, scroll-stopping films that work wonders for online catalogs.",
    features: [
      "Works from site or marketplace images",
      "Optimized for web & social media",
      "Bulk-volumes only (min. 25 film)",
    ],
    priceINR: "950",
    priceUSD: "10",
    unit: "video",
    gradient: "from-[#3d2510]",
  },
  {
    label: "Conceptual Brand Films",
    title: "Stories that Build Brands",
    description:
      "When you want to say more, we craft a concept around your brand's voice and bring it to life with cinematic visuals built for recall.",
    features: [
      "Strategy-led concept & creative",
      "Cinematic world-building",
      "Ideal for awareness & launches",
    ],
    priceINR: "20,000",
    priceUSD: "250",
    unit: "film",
    gradient: "from-[#1e2840]",
    featured: true,
  },
  {
    label: "Hero Product Films",
    title: "Put your product center stage",
    description:
      "Launching a hero line? We keep the product (and model, when used) consistent across every frame for a cohesive, campaign-ready film.",
    features: [
      "Cohesive product & look across shots",
      "Concept, look-dev & cinematic finish",
      "Built for launches & hero pushes",
    ],
    priceINR: "35,000",
    priceUSD: "400",
    unit: "film",
    gradient: "from-[#1a3822]",
  },
];

export function PricingSection() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  return (
    <section id="pricing" className="px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Animate variant="fade-up" delay={0.2}>
          <div className="text-center">
            <h2 className="text-4xl font-medium tracking-[-0.04em] text-stone-100 sm:text-6xl">
              Pricing
            </h2>

            <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em] text-stone-100 sm:text-3xl">
              Your Ideas Turned into{" "}
              <span className="font-serif italic text-[#d6a056]">Films</span>
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-400">
              Cinematic videos for modern marketing, from e-commerce visuals to
              full-blown brand stories. Pick the format that fits your next
              campaign.
            </p>

            <p className="mt-4 text-sm text-stone-500">
              All pricing is based on{" "}
              <span className="underline decoration-stone-600 underline-offset-2">
                15-second films
              </span>
              . Need longer cuts or multiple ratios? We&apos;ll quote to fit the
              brief.
            </p>

            {/* Currency Toggle */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <span
                className={`text-sm font-medium transition ${currency === "INR" ? "text-stone-100" : "text-stone-500"}`}
              >
                INR
              </span>
              <button
                onClick={() =>
                  setCurrency(currency === "INR" ? "USD" : "INR")
                }
                className="relative h-7 w-12 rounded-full border border-stone-700 bg-stone-900 transition-colors hover:border-stone-600"
                aria-label="Toggle currency"
              >
                <span
                  className={`absolute top-0.5 h-5.5 w-5.5 rounded-full bg-[#d6a056] shadow transition-all duration-300 ${
                    currency === "USD"
                      ? "left-[calc(100%-1.625rem)]"
                      : "left-0.5"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium transition ${currency === "USD" ? "text-stone-100" : "text-stone-500"}`}
              >
                USD
              </span>
            </div>
          </div>
        </Animate>

        {/* Cards */}
        <StaggerContainer className="mt-14 grid gap-5 lg:grid-cols-3" stagger={0.12}>
          {plans.map((plan) => (
            <StaggerItem key={plan.title} variant="fade-up">
              <article
                className={`group relative overflow-hidden rounded-[1.5rem] border bg-gradient-to-br ${plan.gradient} to-stone-950 p-6 transition-all duration-300 sm:rounded-[2rem] sm:p-8 ${
                  plan.featured
                    ? "border-[#c48d45]/50 shadow-[0_0_60px_rgba(214,160,86,0.1)]"
                    : "border-stone-800/80 hover:border-[#c48d45]/40 hover:shadow-[0_0_40px_rgba(214,160,86,0.08)]"
                }`}
              >
                {/* Subtle shine */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/[0.02] blur-2xl transition-all duration-500 group-hover:bg-white/[0.04]" />

                <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-stone-500">
                  {plan.label}
                </p>

                <h4 className="mt-4 text-xl font-medium tracking-[-0.03em] text-stone-100 sm:text-2xl">
                  {plan.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-stone-400">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-stone-400"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#d6a056]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-[-0.03em] text-[#d6a056] sm:text-4xl">
                    {currency === "INR" ? "₹" : "$"}
                    {currency === "INR" ? plan.priceINR : plan.priceUSD}
                  </span>
                  <span className="text-sm text-stone-500">/ {plan.unit}</span>
                </div>

                {/* CTA */}
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition bg-[#d6a056] text-stone-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] hover:bg-[#c48d45]"
                >
                  Get Started
                </a>

                <a
                  href="/video#work"
                  className="mt-3 flex w-full items-center justify-center py-2 text-sm font-medium text-stone-400 transition hover:text-stone-200"
                >
                  View Samples
                </a>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
