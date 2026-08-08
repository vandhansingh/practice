import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessList } from "@/components/sections/ProcessList";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";
import { services } from "@/lib/data/services";
import { faq } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three engagements: an Operations Audit to find the constraint, Systems Design to remove it, and Organizational Alignment to make the change hold.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        label="Services"
        lines={["Diagnose. Design.", "Make it hold."]}
        standfirst="Three engagements that build on each other. Most clients start with an audit, because committing capital before naming the constraint is how expensive projects fix the wrong thing."
      />

      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <div data-reveal-group className="flex flex-col">
            {services.map((service) => (
              <article key={service.slug} data-reveal>
                <Link
                  href={`/services/${service.slug}`}
                  data-hover-card
                  className="group grid grid-cols-1 items-center gap-8 border-t border-border py-12 lg:grid-cols-12 lg:gap-10 lg:py-14"
                >
                  <div className="lg:col-span-1">
                    <span className="tabular font-display text-[1.75rem] leading-none text-accent">
                      {service.number}
                    </span>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="mb-4 text-label uppercase text-muted">{service.label}</p>
                    <h2 className="font-display text-display-md text-charcoal">{service.title}</h2>
                  </div>

                  <div data-hover-shift className="lg:col-span-4">
                    <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
                      {service.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 lg:col-span-2 lg:justify-end">
                    <div data-image-mask className="hidden h-20 w-28 shrink-0 lg:block">
                      <div data-hover-image className="h-full w-full">
                        <ArchitecturalImage
                          uid={`svc-list-${service.slug}`}
                          tone="stone"
                          motif={service.motif}
                          className="h-full w-full"
                          decorative
                        />
                      </div>
                    </div>
                    <span data-hover-arrow className="text-charcoal">
                      <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
            <div className="border-t border-border" />
          </div>
        </Container>
      </section>

      <ProcessList />
      <FaqSection items={faq.slice(0, 5)} />
      <FinalCTA />
    </>
  );
}
