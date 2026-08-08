import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { MetricStrip } from "@/components/sections/MetricStrip";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { PlaybookSection } from "@/components/sections/PlaybookSection";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Operations Consulting`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Section order and background rhythm are deliberate:
 *
 *   Hero          charcoal (photographic)
 *   Metrics       cream
 *   Why           cream-dark
 *   Services      cream
 *   Playbook      charcoal        ← first hard tonal break
 *   Case studies  cream-dark
 *   Testimonial   charcoal
 *   About         cream
 *   Final CTA     charcoal        ← runs straight into the footer
 *
 * Nothing sits on the same ground for more than two consecutive sections, so
 * the page reads as one editorial sequence rather than a stack of blocks.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricStrip />

      <EditorialSplit
        uid="why"
        label={`Why ${site.name}`}
        lines={["Companies rarely", "outgrow their strategy.", "They outgrow their", "operations."]}
        body={[
          "The processes that carried a business to twenty million rarely carry it to a hundred. Handoffs multiply, decisions queue behind people who are already at capacity, and information ends up spread across tools that don't talk to each other.",
          "None of this shows up as a strategy problem. It shows up as missed dates, rising overtime, and a leadership team arguing about departments instead of throughput.",
        ]}
        cta={{ label: "View services", href: "/services" }}
        imageSide="right"
        tone="stone"
        motif="colonnade"
        imageLabel="Receding concrete arcade"
        background="cream-dark"
      />

      <ServiceGrid />
      <PlaybookSection />
      <CaseStudyGrid />
      <TestimonialSection />

      <EditorialSplit
        uid="about"
        label={`About ${site.name}`}
        lines={["Small by design.", "Senior by default."]}
        body={[
          "Four partners, no analyst layer. The person who diagnoses your operation is the person who designs the fix and the person who is still there at go-live.",
          "That caps how many clients we take at once, which is the point. Operational work rewards depth over leverage — you cannot diagnose a constraint from a status call.",
        ]}
        cta={{ label: "Meet the team", href: "/about" }}
        imageSide="left"
        tone="sand"
        motif="interior"
        imageLabel="Light raking across a studio interior"
        aspect="aspect-[4/5]"
        background="cream"
      />

      <FinalCTA />
    </>
  );
}
