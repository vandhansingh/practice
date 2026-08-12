import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessList } from "@/components/sections/ProcessList";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { BrandImage } from "@/components/visuals/BrandImage";
import { services, getServiceBySlug } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.summary },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const next = services[(index + 1) % services.length];
  const testimonial = testimonials[index % testimonials.length];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.label,
    provider: { "@type": "ProfessionalService", name: site.name },
    areaServed: "Global",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        label={`${service.number} — ${service.label}`}
        lines={[service.title]}
        standfirst={service.intro}
      />

      {/* Full-bleed image bridging the dark hero into the light body */}
      <section className="bg-charcoal">
        <Container>
          <BrandImage
            slot={service.slot}
            underlay="corner"
            aspect="aspect-[21/9]"
            alt={`${service.title} — Cornerstone`}
          />
        </Container>
        <div className="h-24 lg:h-32" />
      </section>

      {/* Overview */}
      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Label className="mb-7">Overview</Label>
            </div>
            <div data-reveal className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6">
                {service.overview.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.125rem] leading-relaxed text-charcoal first:font-display first:text-display-sm first:leading-snug"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included — four capabilities */}
      <section className="bg-cream-dark py-24 lg:py-32">
        <Container>
          <Label className="mb-7">What&rsquo;s included</Label>
          <h2 className="max-w-[20ch] font-display text-display-lg text-charcoal">
            <DisplayLines lines={["Four parts to", "the engagement."]} />
          </h2>

          <div
            data-reveal-group
            className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2"
          >
            {service.capabilities.map((capability, i) => (
              <div key={capability.title} data-reveal className="border-t border-border pt-6">
                <span className="tabular text-label uppercase text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-display-sm text-charcoal">
                  {capability.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ProcessList label="Process" lines={["How the work", "actually runs."]} />

      {/* Deliverables + who it's for */}
      <section className="border-y border-border bg-cream-dark py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div data-reveal className="lg:col-span-5">
              <Label className="mb-8">Deliverables</Label>
              <ul className="flex flex-col">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-t border-border py-4 text-[0.9375rem] text-charcoal"
                  >
                    <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="lg:col-span-5 lg:col-start-8">
              <Label className="mb-8">Who it&rsquo;s for</Label>
              <ul className="flex flex-col">
                {service.whoItsFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-t border-border py-4 text-[0.9375rem] text-charcoal"
                  >
                    <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection
        items={service.faq}
        label="FAQ"
        lines={["Common", "questions."]}
        background="cream"
      />

      {/* Testimonial */}
      <section className="bg-charcoal py-24 lg:py-32">
        <Container>
          <div data-reveal className="max-w-[42ch]">
            <p className="font-display text-display-md text-cream">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-8 text-[0.875rem] text-muted">
              <span className="text-cream">{testimonial.role}</span> — {testimonial.company}
            </p>
          </div>
        </Container>
      </section>

      {/* Next service */}
      <section className="bg-cream py-20 lg:py-24">
        <Container>
          <Link
            href={`/services/${next.slug}`}
            data-hover-card
            className="group flex flex-col justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-label uppercase text-muted">Next service</p>
              <h2 className="mt-4 font-display text-display-md text-charcoal">{next.title}</h2>
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
