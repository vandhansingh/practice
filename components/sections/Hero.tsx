import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";
import { site } from "@/lib/data/site";

/**
 * Full-bleed photographic hero with left-weighted content.
 *
 * Deliberately not a centred stack: the type sits in the left seven columns
 * against the bright side of the facade, and the composition breathes into the
 * darker right side rather than balancing symmetrically.
 *
 * `data-hero` marks this subtree so the generic scroll-reveal pass skips it —
 * everything here is choreographed by the page-load timeline instead.
 */
export function Hero() {
  return (
    <section data-hero className="relative isolate min-h-[92svh] overflow-hidden bg-charcoal">
      <div data-hero-item="visual" className="absolute inset-0" data-image-mask>
        {/* Two nested wrappers on purpose: the load timeline scales the inner
            one while the scroll-linked drift moves the outer one. Pointing both
            at a single element would make them compose transforms and fight. */}
        <div data-hero-visual-drift className="absolute inset-0">
          <div data-hero-visual-inner className="absolute inset-0">
            <ArchitecturalImage
              uid="hero"
              tone="dusk"
              motif="facade"
              className="h-full w-full"
              label="Louvred concrete facade in raking evening light"
            />
          </div>
        </div>
        {/* Legibility scrim — weighted to the left where the type sits, and
            kept light enough that the facade texture still reads through it. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/35 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal via-charcoal/55 to-transparent"
        />
      </div>

      <Container className="relative flex min-h-[92svh] flex-col justify-end pb-20 pt-40 lg:pb-28">
        <div data-hero-content className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-7">
            <p
              data-hero-item="eyebrow"
              className="flex items-center gap-3 text-label uppercase text-muted-light"
            >
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              {site.discipline}
            </p>

            <h1 className="mt-8 font-display text-display-hero text-cream">
              <DisplayLines lines={["Scale is a", "systems problem."]} />
            </h1>

            <p
              data-hero-item="body"
              className="mt-9 max-w-[48ch] text-[1.0625rem] leading-relaxed text-muted-light sm:text-[1.1875rem]"
            >
              One constraint is limiting your business more than everything else
              combined. We find it, design the operating system that removes it,
              and stay until the numbers hold.
            </p>

            <div data-hero-item="cta" className="mt-11 flex flex-wrap items-center gap-6">
              <Button href={site.ctaLong.href} variant="primary">
                {site.ctaLong.label}
              </Button>
              <span>
                <a
                  href="#services"
                  className="link-underline text-[0.875rem] font-medium text-cream"
                >
                  See how we work
                </a>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
