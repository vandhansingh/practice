import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects information.`,
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Information we collect",
    body: "We collect information you provide directly — such as your name, email address, company and project details submitted through our contact form — along with basic analytics about how visitors use this site.",
  },
  {
    title: "How we use information",
    body: "Information submitted through our contact form is used solely to respond to your enquiry and, if an engagement begins, to deliver our services. We do not sell or rent personal information to third parties.",
  },
  {
    title: "Data retention",
    body: "We retain enquiry and client information for as long as necessary to provide our services and meet legal or contractual obligations, after which it is securely deleted.",
  },
  {
    title: "Cookies & analytics",
    body: "This site may use privacy-respecting analytics to understand aggregate traffic patterns. No personally identifying advertising cookies are used.",
  },
  {
    title: "Your rights",
    body: `You may request access to, correction of, or deletion of your personal information at any time by contacting us at ${site.email}.`,
  },
  {
    title: "Contact",
    body: `Questions about this policy can be directed to ${site.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy", href: "/privacy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
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
