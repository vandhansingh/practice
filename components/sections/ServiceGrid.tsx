import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { TextLink } from "@/components/ui/Button";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";
import { services } from "@/lib/data/services";

/**
 * Services as an editorial three-column arrangement: tall image, hairline rule,
 * then numbered label, display title, description and a link. Not cards — no
 * container, no fill, no shadow. The rule and the image edge do the work of
 * separating one service from the next.
 */
export function ServiceGrid() {
  return (
    <section id="services" className="scroll-mt-32 bg-cream py-24 lg:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Label className="mb-7">What we do</Label>
            <h2 className="max-w-[22ch] font-display text-display-xl text-charcoal">
              <DisplayLines lines={["Three ways in.", "One operating system."]} />
            </h2>
          </div>
          <div data-reveal className="shrink-0">
            <TextLink href="/services">All services</TextLink>
          </div>
        </div>

        {/* Two columns at tablet rather than three: at 768 a third of the
            container leaves the images too narrow to carry the section. */}
        <div
          data-reveal-group
          className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <article key={service.slug} data-reveal>
              <Link
                href={`/services/${service.slug}`}
                data-hover-card
                className="group block"
              >
                <div data-image-reveal data-image-mask className="aspect-[4/5] w-full">
                  <div data-hover-image className="h-full w-full">
                    <ArchitecturalImage
                      uid={`svc-${service.slug}`}
                      tone={service.slug === "systems-design" ? "dusk" : "stone"}
                      motif={service.motif}
                      className="h-full w-full"
                      label={`${service.title} — architectural study`}
                    />
                  </div>
                </div>

                <div className="mt-7 flex items-baseline justify-between gap-4 border-t border-border pt-5">
                  <span className="tabular text-label uppercase text-muted">
                    {service.number} — {service.label}
                  </span>
                  <span data-hover-arrow className="text-charcoal">
                    <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>

                <div data-hover-shift>
                  <h3 className="mt-4 font-display text-display-sm text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
                    {service.summary}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
