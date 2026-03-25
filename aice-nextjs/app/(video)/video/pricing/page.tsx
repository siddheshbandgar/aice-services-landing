"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/video/navbar";
import { PricingSection } from "@/components/video/pricing-section";
import { SiteFooter } from "@/components/video/site-footer";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function VideoPricingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#141110_0%,#0c0a09_46%,#111010_100%)] text-stone-100">
      <div className="px-6 pt-8 sm:px-10 lg:px-12 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Navbar />
          </motion.div>
        </div>
      </div>

      <PricingSection />
      <SiteFooter className="px-6 pb-10 sm:px-10 lg:px-12" />
    </main>
  );
}
