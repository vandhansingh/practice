import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { BrandImage } from "@/components/visuals/BrandImage";
import { CornerBracket, AmberDot } from "@/components/visuals/Motifs";
import { services } from "@/lib/data/services";

/**
 * The board's second panel: a headline with one word carried in red, the service
 * list set small beneath it as a plain index, and the blocks image alongside.
 */
export function BuildWhatMatters() {
  return (
    <section className="relative border-t border-border bg-cream py-24 lg:py-32">
      <CornerBracket className="absolute left-[var(--gutter)] top-12 hidden lg:block" size={26} weight={7} />

      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="max-w-[12ch] font-display text-display-xl text-charcoal">
              <DisplayLines lines={["We help", "businesses build"]} />
              <span className="block">
                what <span className="text-accent">matters.</span>
              </span>
            </h2>

            <ul data-reveal className="mt-12 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="link-underline text-[0.9375rem] text-muted transition-colors hover:text-charcoal"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <AmberDot className="absolute -left-6 bottom-10 z-10 hidden lg:block" size={16} />
            <BrandImage
              slot="blocks"
              underlay="none"
              aspect="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[5/6]"
              alt="A hand placing a red block on top of a stack of stone blocks"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
