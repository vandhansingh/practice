import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { processSteps } from "@/lib/data/metrics";

/**
 * The engagement arc as a numbered editorial list.
 *
 * Numbering is used here because the content genuinely is a sequence — each step
 * depends on the one before it, so the figures carry information rather than
 * decorating the layout.
 */
export function ProcessList({
  label = "How we work",
  lines = ["From bottleneck", "to system."],
}: {
  label?: string;
  lines?: string[];
}) {
  return (
    <section className="bg-cream py-24 lg:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Label className="mb-7">{label}</Label>
            <h2 className="font-display text-display-lg text-charcoal">
              <DisplayLines lines={lines} />
            </h2>
          </div>

          <ol data-reveal-group className="lg:col-span-7 lg:col-start-6">
            {processSteps.map((step) => (
              <li
                key={step.number}
                data-reveal
                className="grid grid-cols-[auto_1fr] gap-x-8 border-t border-border py-8 first:border-t-0 first:pt-0 sm:gap-x-12"
              >
                <span className="tabular font-display text-[1.75rem] leading-none text-accent">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-display-sm text-charcoal">{step.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
