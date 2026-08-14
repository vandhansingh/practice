import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandImage } from "@/components/visuals/BrandImage";
import type { CaseStudy } from "@/lib/data/caseStudies";

/** Large editorial work card. The image is the primary element. */
export function CaseStudyCard({
  study,
  aspect = "aspect-[4/3]",
  headingLevel = 3,
}: {
  study: CaseStudy;
  aspect?: string;
  /**
   * The card's title level. 3 is right under a section h2 (the homepage grid);
   * the work index has no intervening h2, so there it must be 2 or the document
   * outline skips a level.
   */
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article>
      <Link href={`/case-studies/${study.slug}`} data-hover-card className="group block">
        <div data-hover-image>
          <BrandImage
            slot={study.slot}
            underlay="block"
            aspect={aspect}
            alt={`${study.category} — ${study.title}`}
          />
        </div>

        <div className="mt-7 flex items-baseline justify-between gap-4 border-t-2 border-charcoal pt-5">
          <span className="text-label uppercase text-muted">{study.category}</span>
          <span data-hover-arrow className="text-charcoal">
            <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>

        <div data-hover-shift>
          <Heading className="mt-4 max-w-[30ch] font-display text-display-sm text-charcoal">
            {study.title}
          </Heading>
          <p className="mt-3 text-[0.9375rem] text-muted">{study.outcome}</p>
        </div>
      </Link>
    </article>
  );
}
