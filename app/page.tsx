import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { MetricStrip } from "@/components/sections/MetricStrip";
import { BuildWhatMatters } from "@/components/sections/BuildWhatMatters";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { PromisePanel, ScriptureQuote } from "@/components/sections/PromisePanel";
import { KingdomValues } from "@/components/sections/KingdomValues";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { ServicesTicker } from "@/components/sections/ServicesTicker";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `${site.fullName} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Section order follows the brand board, which reads as a single narrative:
 * who we are, what we build, how we work, what we believe, proof, invitation.
 *
 * Grounds alternate paper / deeper paper / red / ink so nothing sits on the
 * same surface for more than two consecutive sections.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricStrip />
      <BuildWhatMatters />
      <ApproachSection />
      <PromisePanel />
      <ScriptureQuote />
      <KingdomValues />
      <ServicesTicker />
      <CaseStudyGrid />
      <TestimonialSection />
      <TrustedBy />
      <FinalCTA />
    </>
  );
}
