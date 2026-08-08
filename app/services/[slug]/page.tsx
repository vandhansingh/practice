import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { PlaceholderVisual } from "@/components/visuals/PlaceholderVisual";
import { services, getServiceBySlug } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short,
    provider: { "@type": "Organization", name: site.name },
    areaServed: "Global",
  };

  const testimonial = testimonials[0];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        eyebrow={`Service ${service.number}`}
        title={service.title}
        description={service.intro}
      />

      <section className="border-b border-border bg-background pb-20 lg:pb-28">
        <Container>
          <RevealImage className="aspect-[21/9] w-full rounded-sm">
            <PlaceholderVisual tone="moss" pattern="nodes" className="h-full" label={`${service.title} system diagram`} />
          </RevealImage>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-label text-muted">
                What&rsquo;s included
              </span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {service.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="border-t border-border pt-6">
                <h3 className="text-[18px] font-medium text-foreground">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Process steps={service.process} eyebrow="Process" title="How this engagement runs." />

      <section className="border-y border-border bg-background py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="text-[22px] font-medium tracking-tightest text-foreground">
                Deliverables
              </h2>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-muted">
                    <Check size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <h2 className="text-[22px] font-medium tracking-tightest text-foreground">
                Who it&rsquo;s for
              </h2>
              <ul className="mt-6 space-y-4">
                {service.whoItsFor.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-[15px] text-muted">
                    <Check size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <FAQ items={service.faq} eyebrow="FAQ" />

      <section className="bg-cream py-20 lg:py-28">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p
              className="font-serif italic leading-[1.3] tracking-tight text-foreground text-balance"
              style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-6 text-[14px] text-muted">
              <span className="font-medium text-foreground">{testimonial.name}</span> ·{" "}
              {testimonial.role}, {testimonial.company}
            </p>
          </Reveal>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
