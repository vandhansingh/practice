import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { BrandImage } from "@/components/visuals/BrandImage";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.outcome,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: { title: study.title, description: study.outcome },
  };
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: study.category, href: `/case-studies/${study.slug}` },
        ]}
        label={study.category}
        lines={[study.title]}
        standfirst={study.overview}
        meta={[
          { label: "Client", value: study.client },
          { label: "Sector", value: study.category },
          { label: "Services", value: study.services.join(", ") },
          { label: "Outcome", value: study.outcome },
        ]}
      />

      <section data-dark className="bg-charcoal">
        <Container>
          <BrandImage
            slot={study.slot}
            underlay="corner"
            aspect="aspect-[21/9]"
            frame="cream"
            alt={`${study.category} — ${study.title}`}
          />
        </Container>
        <div className="h-24 lg:h-32" />
      </section>

      {/* Editorial body — narrative, not a dashboard */}
      <article className="bg-cream py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col gap-16 lg:col-span-7">
              <Block label="The challenge" paragraphs={study.challenge} lead />
              <Block label="Our approach" paragraphs={study.approach} />
              <Block label="Implementation" paragraphs={study.implementation} />
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div data-reveal className="sticky top-28 flex flex-col gap-12">
                <div>
                  <Label className="mb-8">Results</Label>
                  <dl className="flex flex-col">
                    {study.results.map((result) => (
                      <div key={result.label} className="border-t border-border py-6">
                        <dt className="sr-only">{result.label}</dt>
                        <dd>
                          <span className="tabular block font-display text-[clamp(2rem,3vw,2.75rem)] leading-none text-charcoal">
                            {result.metric}
                          </span>
                          <span className="mt-3 block text-[0.875rem] leading-snug text-muted">
                            {result.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <Label className="mb-6">Services applied</Label>
                  <ul className="flex flex-wrap gap-2">
                    {study.services.map((service) => (
                      <li
                        key={service}
                        className="border-2 border-charcoal px-3 py-1.5 text-[0.8125rem] font-medium text-charcoal"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {/* Client quote */}
      <section data-dark className="bg-charcoal py-24 lg:py-32">
        <Container>
          <div data-reveal className="max-w-[40ch]">
            <p className="font-display text-display-md text-cream">
              &ldquo;{study.testimonial.quote}&rdquo;
            </p>
            <p className="mt-8 text-[0.875rem] text-muted">
              <span className="text-cream">{study.testimonial.name}</span> —{" "}
              {study.testimonial.role}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <Container>
          <Link
            href={`/case-studies/${next.slug}`}
            data-hover-card
            className="group flex flex-col justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-label uppercase text-muted">Next case study</p>
              <h2 className="mt-4 max-w-[28ch] font-display text-display-md text-charcoal">
                {next.title}
              </h2>
            </div>
            <span data-hover-arrow className="text-charcoal">
              <ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </Link>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}

function Block({
  label,
  paragraphs,
  lead = false,
}: {
  label: string;
  paragraphs: string[];
  lead?: boolean;
}) {
  return (
    <section data-reveal>
      <Label className="mb-7">{label}</Label>
      <div className="space-y-6">
        {paragraphs.map((paragraph, i) => (
          <p
            key={paragraph}
            className={
              lead && i === 0
                ? "font-display text-display-sm leading-snug text-charcoal"
                : "text-[1.0625rem] leading-relaxed text-muted"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
