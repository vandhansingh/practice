import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { BrandImage } from "@/components/visuals/BrandImage";
import { CornerBracket, AmberDot } from "@/components/visuals/Motifs";
import { site } from "@/lib/data/site";

/**
 * Hero, following the brand board's opening panel: the wordmark and tagline set
 * against open paper on the left, the red-backed workspace image filling the
 * right, and the value line anchored to the bottom of the type column.
 *
 * `data-hero` marks the subtree so the generic scroll pass skips it — the
 * page-load timeline choreographs everything here.
 */
export function Hero() {
  return (
    <section data-hero className="relative overflow-hidden bg-cream pt-28 sm:pt-32 lg:pt-24">
      <CornerBracket className="absolute left-[var(--gutter)] top-24 hidden lg:block" size={34} weight={9} />
      <AmberDot className="absolute right-[calc(var(--gutter)+8px)] top-28 hidden lg:block" size={16} />

      <Container>
        <div
          data-hero-content
          className="grid grid-cols-1 items-center gap-12 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-5 lg:py-16">
            <h1 className="font-display text-display-hero font-normal text-charcoal">
              <DisplayLines lines={["Cornerstone", "Digital Agency"]} />
            </h1>

            <p
              data-hero-item="body"
              className="mt-8 flex max-w-[28ch] items-start gap-2 text-[1.0625rem] leading-relaxed text-muted sm:text-[1.1875rem]"
            >
              <span>
                {site.tagline}
                <span aria-hidden="true" className="ml-1.5 inline-block h-[7px] w-[7px] translate-y-[-2px] bg-accent" />
              </span>
            </p>

            <div data-hero-item="cta" className="mt-12 flex flex-wrap items-center gap-6">
              <Button href={site.cta.href} variant="primary">
                {site.cta.label}
              </Button>
              <span>
                <a
                  href="#approach"
                  className="link-underline text-[0.875rem] font-medium text-charcoal"
                >
                  See how we work
                </a>
              </span>
            </div>

            <p
              data-hero-item="eyebrow"
              className="mt-16 text-[0.8125rem] font-medium tracking-[0.02em] text-charcoal lg:mt-24"
            >
              {site.values}
            </p>
          </div>

          <div data-hero-item="visual" className="lg:col-span-7">
            <div data-hero-visual-drift>
              <div data-hero-visual-inner>
                <BrandImage
                  slot="workspace"
                  underlay="silhouette"
                  aspect="aspect-[4/3] lg:aspect-[16/11]"
                  priority
                  reveal={false}
                  alt="A designer at work on a brand strategy layout"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
