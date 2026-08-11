import type { Metadata } from "next";
import clsx from "clsx";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { engagements, comparison } from "@/lib/data/pricing";
import { faq } from "@/lib/data/faq";
import { testimonials } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three engagement models: a fixed-fee Operations Audit, a full Design & Install programme, or an ongoing retained partnership.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const testimonial = testimonials[1];

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Pricing", href: "/pricing" },
        ]}
        label="Engagements"
        lines={["Fixed scope.", "Fixed fee."]}
        standfirst="We price engagements, not hours. You'll have a scope and a number before work starts, and we don't bill change requests for things we should have anticipated."
      />

      {/* Engagement options — editorial columns, not a SaaS pricing table */}
      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <div data-reveal-group className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {engagements.map((engagement) => (
              <div
                key={engagement.name}
                data-reveal
                className={clsx(
                  "flex flex-col justify-between p-8 lg:p-10",
                  engagement.featured
                    ? "bg-charcoal text-cream"
                    : "border border-border bg-cream-dark/40 text-charcoal"
                )}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2
                      className={clsx(
                        "font-display text-display-sm",
                        engagement.featured ? "text-cream" : "text-charcoal"
                      )}
                    >
                      {engagement.name}
                    </h2>
                    {engagement.featured && (
                      <span className="shrink-0 rounded-[2px] bg-cream px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-charcoal">
                        Most common
                      </span>
                    )}
                  </div>

                  <p
                    className={clsx(
                      "mt-3 text-[0.9375rem]",
                      engagement.featured ? "text-muted-light" : "text-muted"
                    )}
                  >
                    {engagement.positioning}
                  </p>

                  <div
                    className={clsx(
                      "mt-8 border-t pt-8",
                      engagement.featured ? "border-border-dark" : "border-border"
                    )}
                  >
                    <p
                      className={clsx(
                        "tabular font-display text-[clamp(2rem,2.6vw,2.5rem)] leading-none",
                        engagement.featured ? "text-cream" : "text-charcoal"
                      )}
                    >
                      {engagement.price}
                    </p>
                    <p className="mt-3 text-[0.8125rem] text-muted">{engagement.priceNote}</p>
                  </div>

                  <p
                    className={clsx(
                      "mt-8 text-[0.875rem] leading-relaxed",
                      engagement.featured ? "text-muted-light" : "text-muted"
                    )}
                  >
                    {engagement.idealFor}
                  </p>

                  <ul className="mt-8 flex flex-col gap-3">
                    {engagement.included.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.875rem]">
                        <Check
                          size={15}
                          className="mt-1 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span className={engagement.featured ? "text-cream" : "text-charcoal"}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <Button
                    href="/contact"
                    variant={engagement.featured ? "light" : "outline"}
                  >
                    {engagement.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="border-y border-border bg-cream-dark py-24 lg:py-32">
        <Container>
          <Label className="mb-7">Compare</Label>
          <h2 className="max-w-[20ch] font-display text-display-lg text-charcoal">
            <DisplayLines lines={["What's in", "each engagement."]} />
          </h2>

          <div data-reveal className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Comparison of what is included in each engagement model
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-5 pr-4 text-label uppercase text-muted">
                    Included
                  </th>
                  {engagements.map((engagement) => (
                    <th
                      key={engagement.name}
                      scope="col"
                      className="py-5 pr-4 text-[0.875rem] font-medium text-charcoal"
                    >
                      {engagement.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-border">
                    <th
                      scope="row"
                      className="py-4 pr-4 text-[0.9375rem] font-normal text-charcoal"
                    >
                      {row.feature}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={`${row.feature}-${i}`}
                        className={clsx(
                          "py-4 pr-4 text-[0.875rem]",
                          value === "—" ? "text-muted/50" : "text-muted"
                        )}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <FaqSection items={faq} background="cream" />

      <section className="bg-charcoal py-24 lg:py-32">
        <Container>
          <div data-reveal className="max-w-[40ch]">
            <p className="font-display text-display-md text-cream">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-8 text-[0.875rem] text-muted">
              <span className="text-cream">{testimonial.role}</span> — {testimonial.company}
            </p>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
