import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Results from systems Halyard has designed and implemented across healthcare, real estate, and professional services.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }]}
        eyebrow="Case studies"
        title="Results, not promises."
        description="A look at how specific operational problems became working systems — and what changed once they did."
      />
      <section className="bg-background py-20 lg:py-28">
        <Container>
          <p className="mb-14 max-w-lg text-[13px] text-muted">
            Figures below are illustrative composites built from patterns
            across real engagements, used here to represent the scale of
            outcome each project type can deliver.
          </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 90}>
                <CaseStudyCard study={study} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
