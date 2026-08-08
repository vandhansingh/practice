import Link from "next/link";
import { site } from "@/lib/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-20 lg:py-28">
        <div className="grid grid-cols-2 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-2 lg:col-span-5">
            <Link href="/" className="text-[22px] font-semibold tracking-tightest text-foreground">
              {site.name}
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              {site.description}
            </p>
            <p className="mt-8 text-[13px] uppercase tracking-label text-muted">
              {site.location}
            </p>
          </div>

          <FooterColumn title="Services" links={site.footerNav.services} className="lg:col-span-3" />
          <FooterColumn title="Company" links={site.footerNav.company} className="lg:col-span-2" />

          <div className="col-span-2 lg:col-span-2">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-label text-muted">Connect</p>
            <ul className="flex flex-col gap-3 text-[15px] text-foreground/80">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
              </li>
              <li className="flex gap-4 pt-2">
                <a href={site.social.linkedin} className="hover:text-accent" aria-label="LinkedIn">
                  LinkedIn
                </a>
                <a href={site.social.instagram} className="hover:text-accent" aria-label="Instagram">
                  Instagram
                </a>
                <a href={site.social.x} className="hover:text-accent" aria-label="X">
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-muted">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6 text-[13px] text-muted">
            {site.footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-label text-muted">{title}</p>
      <ul className="flex flex-col gap-3 text-[15px] text-foreground/80">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
