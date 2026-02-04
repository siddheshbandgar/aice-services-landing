import Link from "next/link";
import Hero from "@/components/openclaw/Hero";
import Pricing from "@/components/openclaw/Pricing";
import StarBackground from "@/components/openclaw/StarBackground";
import StickyPricingBar from "@/components/openclaw/StickyPricingBar";
import Testimonials from "@/components/openclaw/Testimonials";
import UseCases from "@/components/openclaw/UseCases";

export default function OpenClawPage() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <StarBackground />

            {/* Back to Home Button */}
            <Link
                href="/"
                className="absolute left-6 top-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                </svg>
                Back to Home
            </Link>

            <main className="relative z-10">
                <Hero />
                <Pricing />
                <UseCases />
                <Testimonials />
            </main>

            <StickyPricingBar />
        </div>
    );
}
