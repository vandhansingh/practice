import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";
import type { CaseStudy } from "@/lib/data/caseStudies";

/** Large editorial case-study card. The image is the primary element. */
export function CaseStudyCard({
  study,
  aspect = "aspect-[4/3]",
}: {
  study: CaseStudy;
  aspect?: string;
}) {
  return (
    <article>
      <Link href={`/case-studies/${study.slug}`} data-hover-card className="group block">
        <div data-image-reveal data-image-mask className={`w-full ${aspect}`}>
          <div data-hover-image className="h-full w-full">
            <ArchitecturalImage
              uid={`cs-${study.slug}`}
              tone={study.tone}
              motif={study.motif}
              className="h-full w-full"
              label={`${study.category} — ${study.title}`}
            />
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-border pt-5">
          <span className="text-label uppercase text-muted">{study.category}</span>
          <span data-hover-arrow className="text-charcoal">
            <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>

        <div data-hover-shift>
          <h3 className="mt-4 max-w-[30ch] font-display text-display-sm text-charcoal">
            {study.title}
          </h3>
          <p className="mt-3 text-[0.9375rem] text-muted">{study.outcome}</p>
        </div>
      </Link>
    </article>
  );
}
