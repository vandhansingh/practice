import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "Use of this site",
    body: "This website is published for information. Content may change without notice and does not constitute a proposal, a statement of work, or professional advice for your specific circumstances.",
  },
  {
    title: "Engagements",
    body: "Services described here are delivered under a separate signed agreement setting out scope, timeline, fees and responsibilities for that specific engagement. Nothing on this site forms a contract.",
  },
  {
    title: "Illustrative figures",
    body: "Metrics and case-study results shown on this site are illustrative composites drawn from patterns across engagements. They indicate the scale of outcome a project type can deliver and are not a forecast of your result.",
  },
  {
    title: "Intellectual property",
    body: `All content on this site — copy, design, and visual material — belongs to ${site.legalName} unless stated otherwise.`,
  },
  {
    title: "Liability",
    body: `${site.legalName} accepts no liability for indirect or consequential loss arising from use of this website or reliance on its content.`,
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of England and Wales.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Terms of Use", href: "/terms" },
        ]}
        label="Legal"
        lines={["Terms of Use"]}
        standfirst="Last updated August 2026."
      />

      <section className="bg-cream py-24 lg:py-28">
        <Container narrow>
          <div className="flex flex-col">
            {sections.map((section) => (
              <div key={section.title} data-reveal className="border-t border-border py-10">
                <h2 className="font-display text-display-sm text-charcoal">{section.title}</h2>
                <p className="mt-4 max-w-[64ch] text-[1rem] leading-relaxed text-muted">
                  {section.body}
                </p>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </Container>
      </section>
    </>
  );
}
