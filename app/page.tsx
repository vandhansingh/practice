import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Positioning } from "@/components/sections/Positioning";
import { Services } from "@/components/sections/Services";
import { FeaturedSystem } from "@/components/sections/FeaturedSystem";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Build a business that runs better`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <Positioning />
      <Services />
      <FeaturedSystem />
      <LeadMagnet />
      <CaseStudies />
      <Testimonials />
      <About />
      <Team />
      <FinalCTA />
    </>
  );
}
