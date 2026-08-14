import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { metrics } from "@/lib/data/metrics";

/**
 * Light warm strip immediately after the hero.
 *
 * Figures are set in the display serif at metric scale with tabular numerals,
 * separated by hairline rules rather than boxed into cards.
 */
export function MetricStrip() {
  return (
    <section className="border-b border-border bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Label className="mb-6">Track record</Label>
            <h2 className="font-display text-display-md text-charcoal">
              <DisplayLines lines={["Results that", "compound."]} />
            </h2>
          </div>

          <div
            data-reveal-group
            className="grid grid-cols-2 gap-x-6 gap-y-12 lg:col-span-8 lg:grid-cols-4 lg:gap-x-0"
          >
            {metrics.map((metric, i) => (
              <div
                key={metric.label}
                data-reveal="scale"
                className={
                  i > 0 ? "lg:border-l lg:border-border lg:pl-7" : "lg:pr-7"
                }
              >
                <p
                  className="tabular font-display text-metric font-semibold text-charcoal"
                  {...(metric.counter
                    ? {
                        "data-counter": metric.counter.value,
                        "data-counter-prefix": metric.counter.prefix ?? "",
                        "data-counter-suffix": metric.counter.suffix ?? "",
                        "data-counter-decimals": metric.counter.decimals ?? 0,
                      }
                    : {})}
                >
                  {metric.display}
                </p>
                <p className="mt-4 max-w-[24ch] text-[0.875rem] leading-snug text-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
