import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandImage } from "@/components/visuals/BrandImage";
import { CornerBracket, AmberDot } from "@/components/visuals/Motifs";
import { site } from "@/lib/data/site";

/**
 * Closing triptych from the board: the oversized C over a skyline, the
 * "trusted by" line against the tower, and the wordmark panel.
 *
 * Rendered as one three-column band on desktop and stacked below, so the
 * relationship between the three panels survives the breakpoint.
 */
export function TrustedBy() {
  return (
    <section className="border-t border-border bg-cream">
      <Container className="px-0 sm:px-0 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Oversized C over the skyline */}
          <div className="relative flex min-h-[340px] items-end overflow-hidden border-border lg:min-h-[440px] lg:border-r">
            <AmberDot className="absolute right-10 top-12 z-20" size={16} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-[58%] font-display text-[13rem] font-medium leading-none text-accent lg:text-[15rem]"
            >
              C
            </span>
            <div className="relative z-0 w-full">
              <BrandImage
                slot="skyline"
                underlay="none"
                aspect="aspect-[3/2]"
                alt="A city skyline"
              />
            </div>
          </div>

          {/* Trusted-by copy */}
          <div className="relative flex flex-col justify-between gap-10 border-border px-[var(--gutter)] py-16 lg:border-r lg:px-10">
            <CornerBracket className="absolute left-[var(--gutter)] top-8 lg:left-10" size={24} weight={7} draw />
            <div className="pt-12">
              <h2 className="max-w-[14ch] font-display text-display-md text-charcoal">
                Trusted by businesses that build{" "}
                <span className="text-accent">what&rsquo;s next.</span>
              </h2>
              <p data-reveal className="mt-10 max-w-[26ch] text-[0.9375rem] leading-relaxed text-muted">
                Let&rsquo;s build your cornerstone.
              </p>
              <Link
                href={site.cta.href}
                aria-label="Start a project"
                className="group mt-8 inline-flex items-center text-accent transition-colors hover:text-accent-deep"
              >
                <ArrowRight
                  size={30}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 ease-expo group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="w-full">
              <BrandImage
                slot="tower"
                underlay="corner"
                aspect="aspect-[3/4]"
                alt="A tower photographed from below"
              />
            </div>
          </div>

          {/* Wordmark panel */}
          <div className="relative flex flex-col justify-center px-[var(--gutter)] py-20 lg:px-10">
            <CornerBracket className="absolute left-[var(--gutter)] top-10 lg:left-10" size={30} weight={8} draw />
            <AmberDot className="absolute bottom-12 right-10" size={16} />
            <p className="font-display text-[clamp(2.25rem,3.4vw,3rem)] font-normal leading-none tracking-[-0.03em] text-charcoal">
              {site.name}
            </p>
            <p className="mt-2 text-[0.9375rem] text-muted">{site.discipline}</p>
            <a
              href={`https://${site.domain}`}
              className="link-underline mt-10 w-fit text-[0.875rem] font-medium text-accent-deep"
            >
              {site.domain}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
