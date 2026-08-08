import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/faq/Accordion";
import type { FaqItem } from "@/lib/data/faq";

export function FAQ({ items, eyebrow = "Questions" }: { items: FaqItem[]; eyebrow?: string }) {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading eyebrow={eyebrow} title="Common questions." />
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={100}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
