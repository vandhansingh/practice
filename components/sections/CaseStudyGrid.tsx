import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { TextLink } from "@/components/ui/Button";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { caseStudies } from "@/lib/data/caseStudies";

/**
 * Case studies on the cream-dark ground, deliberately staggered: the first card
 * sits a column wider and the following two offset downward, so the row reads as
 * a composition rather than three equal tiles.
 */
export function CaseStudyGrid() {
  const [lead, ...rest] = caseStudies;

  return (
    <section className="bg-cream-dark py-24 lg:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Label className="mb-7">Selected work</Label>
            <h2 className="max-w-[20ch] font-display text-display-xl text-charcoal">
              <DisplayLines lines={["Built to last.", "Built to work."]} />
            </h2>
          </div>
          <div data-reveal className="shrink-0">
            <TextLink href="/case-studies">See all work</TextLink>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <CaseStudyCard study={lead} aspect="aspect-[16/11]" />
          </div>

          <div className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 lg:col-span-5 lg:mt-20 lg:grid-cols-1">
            {rest.map((study) => (
              <CaseStudyCard key={study.slug} study={study} aspect="aspect-[3/2]" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
