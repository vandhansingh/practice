import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${site.name} website and engagement of our services.`,
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "Use of this site",
    body: "This website is provided for informational purposes. Content may be updated without notice and is not a substitute for a formal proposal or statement of work.",
  },
  {
    title: "Engagements",
    body: "Services described on this site are subject to a separate signed agreement outlining scope, timeline and fees for each specific engagement.",
  },
  {
    title: "Intellectual property",
    body: `All content on this site, including copy, design and visuals, is the property of ${site.legalName} unless otherwise noted.`,
  },
  {
    title: "Limitation of liability",
    body: `${site.legalName} is not liable for any indirect or consequential loss arising from use of this website.`,
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of the jurisdiction in which our studio is registered.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms", href: "/terms" }]}
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated August 2026."
      />
      <section className="bg-background py-20 lg:py-28">
        <Container className="max-w-3xl">
          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.title} className="border-t border-border pt-6">
                <h2 className="text-[19px] font-medium text-foreground">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
