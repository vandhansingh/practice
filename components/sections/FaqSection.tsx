import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Accordion } from "@/components/faq/Accordion";
import type { FaqItem } from "@/lib/data/faq";

export function FaqSection({
  items,
  label = "Questions",
  lines = ["Before you", "get in touch."],
  background = "cream-dark",
}: {
  items: FaqItem[];
  label?: string;
  lines?: string[];
  background?: "cream" | "cream-dark";
}) {
  return (
    <section className={background === "cream" ? "bg-cream py-24 lg:py-32" : "bg-cream-dark py-24 lg:py-32"}>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Label className="mb-7">{label}</Label>
            <h2 className="font-display text-display-lg text-charcoal">
              <DisplayLines lines={lines} />
            </h2>
          </div>
          <div data-reveal className="lg:col-span-7 lg:col-start-6">
            <Accordion items={items} />
          </div>
        </div>
      </Container>
    </section>
  );
}
