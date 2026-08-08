import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "What we collect",
    body: `We collect what you send us: your name, email address, company and the details of your enquiry submitted through the contact form. We also collect aggregate analytics about how this site is used.`,
  },
  {
    title: "How we use it",
    body: `Enquiry details are used to respond to you and, if an engagement begins, to deliver the work. We do not sell, rent or share personal information with third parties for their own marketing.`,
  },
  {
    title: "Client information",
    body: `Operational data encountered during an engagement is treated as confidential and governed by the engagement agreement and any applicable NDA. Case studies on this site are anonymised and published only with client consent.`,
  },
  {
    title: "Retention",
    body: `Enquiry records are kept for two years. Client records are kept for the period required by our professional and legal obligations, then securely deleted.`,
  },
  {
    title: "Cookies and analytics",
    body: `This site uses privacy-respecting analytics to understand aggregate traffic. We do not use advertising or cross-site tracking cookies.`,
  },
  {
    title: "Your rights",
    body: `You may request access to, correction of, or deletion of your personal information at any time by writing to ${site.email}. We will respond within one month.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
        label="Legal"
        lines={["Privacy Policy"]}
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
