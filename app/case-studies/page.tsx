import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { caseStudies } from "@/lib/data/caseStudies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites, brands and growth programmes we have built, and what changed as a result.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
        ]}
        label="Selected work"
        lines={["Work that earns", "its keep."]}
        standfirst="Three projects, written up properly: what was actually wrong, what we changed, and what moved as a result."
      />

      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <p className="mb-16 max-w-[54ch] text-[0.8125rem] leading-relaxed text-muted">
            Client names are withheld under NDA and the figures shown are
            illustrative composites drawn from patterns across engagements —
            they represent the scale of outcome each project type delivers
            rather than a single audited account.
          </p>

          <div data-reveal-group className="grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-2">
            {caseStudies.map((study, i) => (
              <div
                key={study.slug}
                data-reveal
                // Offsetting alternate cards keeps the grid from reading as
                // matched tiles and gives the page an editorial rhythm.
                className={i % 2 === 1 ? "lg:mt-24" : undefined}
              >
                <CaseStudyCard
                  headingLevel={2}
                  study={study}
                  aspect={i % 2 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
