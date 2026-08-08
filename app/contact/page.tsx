import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a strategy call with Halyard — tell us what's slowing your business down.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
        eyebrow="Get in touch"
        title="Let's look at where your business is losing time."
        description="Tell us a bit about the operation and we'll reply within one business day to schedule a call."
      />
      <section className="bg-background py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal className="space-y-8">
              <ContactDetail icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactDetail icon={Phone} label="Phone" value={site.phone} href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} />
              <ContactDetail icon={MapPin} label="Location" value={site.location} />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 border-t border-border pt-6">
      <Icon size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-label text-muted">{label}</p>
        <p className="mt-1 text-[15px] text-foreground">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-70">
      {content}
    </a>
  ) : (
    content
  );
}
