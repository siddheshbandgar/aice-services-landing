import { ContactSection } from "@/components/video/contact-section";
import { HeroSection } from "@/components/video/hero-section";
import { ProblemSection } from "@/components/video/problem-section";
import { ServicesSection } from "@/components/video/services-section";
import { SolutionSection } from "@/components/video/solution-section";
import { TestimonialsSection } from "@/components/video/testimonials-section";
import { WorkSection } from "@/components/video/work-section";

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#141110_0%,#0c0a09_46%,#111010_100%)] text-stone-100">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
