import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealImage } from "@/components/motion/RevealImage";
import { PlaceholderVisual } from "@/components/visuals/PlaceholderVisual";
import type { CaseStudy } from "@/lib/data/case-studies";

const TONES = ["moss", "clay", "sand"] as const;
const PATTERNS = ["contour", "arc", "diagonal"] as const;

export function CaseStudyCard({ study, index = 0 }: { study: CaseStudy; index?: number }) {
  return (
    <Link href={`/case-studies/${study.slug}`} data-cursor="view" className="group block">
      <RevealImage className="aspect-[4/3] w-full rounded-sm">
        <PlaceholderVisual
          tone={TONES[index % TONES.length]}
          pattern={PATTERNS[index % PATTERNS.length]}
          className="h-full transition-transform duration-700 ease-power3-out group-hover:scale-[1.02]"
          label={study.title}
        />
      </RevealImage>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
            {study.industry}
          </p>
          <h3 className="mt-2 max-w-md text-balance text-[19px] font-medium leading-snug tracking-tightest text-foreground">
            {study.title}
          </h3>
        </div>
        <ArrowUpRight
          size={20}
          className="mt-1 shrink-0 text-foreground transition-transform duration-500 ease-power3-out group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden
        />
      </div>
    </Link>
  );
}
