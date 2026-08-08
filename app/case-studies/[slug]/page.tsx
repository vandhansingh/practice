import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { PlaceholderVisual } from "@/components/visuals/PlaceholderVisual";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.result,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const tones = ["moss", "clay", "sand"] as const;
  const patterns = ["contour", "arc", "diagonal"] as const;

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: study.industry, href: `/case-studies/${study.slug}` },
        ]}
        eyebrow={study.industry}
        title={study.title}
        description={
          study.isIllustrative
            ? "An illustrative composite representing the scale of outcome this project type delivers."
            : undefined
        }
      />

      <section className="border-b border-border bg-background pb-16 lg:pb-24">
        <Container>
          <RevealImage className="aspect-[21/9] w-full rounded-sm">
            <PlaceholderVisual
              tone={tones[index % tones.length]}
              pattern={patterns[index % patterns.length]}
              className="h-full"
              label={study.title}
            />
          </RevealImage>
        </Container>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-14 lg:col-span-7">
            <Reveal>
              <h2 className="text-[13px] font-semibold uppercase tracking-label text-muted">
                Challenge
              </h2>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-foreground">
                {study.challenge}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[13px] font-semibold uppercase tracking-label text-muted">
                Approach
              </h2>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-foreground">
                {study.approach}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <h2 className="text-[13px] font-semibold uppercase tracking-label text-muted">
                System architecture
              </h2>
              <ul className="mt-5 space-y-3">
                {study.architecture.map((a) => (
                  <li key={a} className="border-t border-border pt-3 text-[15px] text-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={240}>
              <h2 className="text-[13px] font-semibold uppercase tracking-label text-muted">
                Implementation
              </h2>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-foreground">
                {study.implementation}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120} className="sticky top-28 space-y-10">
              <div className="border border-border p-8">
                <p className="text-[13px] font-semibold uppercase tracking-label text-muted">Results</p>
                <div className="mt-6 space-y-6">
                  {study.results.map((r) => (
                    <div key={r.label}>
                      <p className="font-medium tracking-tightest text-foreground" style={{ fontSize: "clamp(1.8rem, 2.6vw, 2.4rem)" }}>
                        {r.metric}
                      </p>
                      <p className="mt-1 text-[13px] text-muted">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border p-8">
                <p className="text-[13px] font-semibold uppercase tracking-label text-muted">Technology</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.technology.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1.5 text-[13px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <blockquote className="border-l-2 border-accent pl-6">
                <p className="font-serif italic leading-snug text-foreground" style={{ fontSize: "1.1rem" }}>
                  &ldquo;{study.testimonial.quote}&rdquo;
                </p>
                <footer className="mt-4 text-[13px] text-muted">
                  {study.testimonial.name}, {study.testimonial.role}
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
