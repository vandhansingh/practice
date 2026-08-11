import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { HeroCollage } from "@/components/visuals/HeroCollage";
import { site } from "@/lib/data/site";

/**
 * Cream hero built around the collage.
 *
 * The artwork carries its own large area of empty paper at the upper left, so
 * the type is set into that space rather than over the image — no scrim, no
 * darkening, nothing fighting the illustration. On desktop the two share a
 * 12-column grid; below lg the type stacks above the artwork so the head and
 * staircase are never cropped to a sliver.
 *
 * `data-hero` marks the subtree so the generic scroll pass skips it — the
 * page-load timeline choreographs everything here.
 */
export function Hero() {
  return (
    <section data-hero className="relative overflow-hidden bg-cream pt-28 sm:pt-32 lg:pt-24">
      <Container>
        <div
          data-hero-content
          className="grid grid-cols-1 items-end gap-10 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12 lg:gap-8"
        >
          <div className="pb-4 lg:col-span-6 lg:pb-24 xl:col-span-5">
            <p
              data-hero-item="eyebrow"
              className="flex items-center gap-3 text-label uppercase text-muted"
            >
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              {site.discipline}
            </p>

            <h1 className="mt-8 font-display text-display-hero text-charcoal">
              <DisplayLines lines={["Scale is a", "systems", "problem."]} />
            </h1>

            <p
              data-hero-item="body"
              className="mt-8 max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted sm:text-[1.125rem]"
            >
              One constraint is limiting your business more than everything else
              combined. We find it, design the operating system that removes it,
              and stay until the numbers hold.
            </p>

            <div data-hero-item="cta" className="mt-10 flex flex-wrap items-center gap-6">
              <Button href={site.ctaLong.href} variant="primary">
                {site.ctaLong.label}
              </Button>
              <span>
                <a
                  href="#services"
                  className="link-underline text-[0.875rem] font-medium text-charcoal"
                >
                  See how we work
                </a>
              </span>
            </div>
          </div>

          <div
            data-hero-item="visual"
            className="relative lg:col-span-6 lg:col-start-7 xl:col-span-7"
          >
            <div data-hero-visual-drift>
              <div data-hero-visual-inner>
                <HeroCollage className="relative mx-auto h-[62vh] max-h-[760px] w-full max-w-[560px] lg:mx-0 lg:h-[calc(100svh-8rem)] lg:max-h-none lg:max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
