import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessList } from "@/components/sections/ProcessList";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { BrandImage } from "@/components/visuals/BrandImage";
import { services } from "@/lib/data/services";
import { faq } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, branding, digital strategy, SEO and content — five services that build on each other.",
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
        lines={["Everything we make,", "built to last."]}
        standfirst="Five services that work on their own and work better together. Most clients start with a website or a brand, then keep us on for the growth work afterwards."
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
                    <div data-hover-image className="hidden h-20 w-28 shrink-0 lg:block">
                      <BrandImage slot={service.slot} underlay="none" aspect="h-full w-full" alt="" />
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
