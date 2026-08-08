import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/buttons/Button";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { caseStudies } from "@/lib/data/case-studies";

export function CaseStudies() {
  return (
    <section className="bg-background py-24 lg:py-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading eyebrow="Selected work" title="Results, not promises." />
          </Reveal>
          <Reveal delay={100}>
            <Button href="/case-studies" variant="secondary" className="w-fit">
              All case studies
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 90}>
              <CaseStudyCard study={study} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
