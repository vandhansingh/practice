import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { BrandImage } from "@/components/visuals/BrandImage";
import { AmberDot } from "@/components/visuals/Motifs";
import { approach } from "@/lib/data/site";

/**
 * "Our Approach" — three numbered steps against the stone image.
 *
 * Numbering is used because the content genuinely is a sequence: you cannot
 * build before you understand, or grow before you have built.
 */
export function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative scroll-mt-28 border-t border-border bg-cream-dark py-24 lg:py-32"
    >
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-charcoal">
              <DisplayLines lines={["Our", "Approach"]} />
            </h2>
            <span aria-hidden="true" className="mt-8 block h-px w-14 bg-charcoal" />

            <ol data-reveal-group className="mt-12 flex flex-col">
              {approach.map((step) => (
                <li
                  key={step.number}
                  data-reveal
                  className="grid grid-cols-[auto_1fr] gap-x-8 border-t border-border py-7 first:border-t-0 first:pt-0"
                >
                  <span className="tabular pt-1 text-[0.8125rem] font-medium text-accent-deep">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold text-charcoal">{step.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-muted">{step.short}</p>
                    <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <AmberDot className="absolute -right-2 -top-6 z-10 hidden lg:block" size={16} />
            <BrandImage
              slot="stone"
              underlay="corner"
              aspect="aspect-[4/3] lg:aspect-[5/4]"
              alt="A single large stone, photographed as a cornerstone"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
