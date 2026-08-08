import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  description,
}: {
  breadcrumb?: { label: string; href: string }[];
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-background pb-16 pt-[calc(76px+64px)] lg:pb-20 lg:pt-[calc(76px+88px)]">
      <Container>
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[13px] text-muted">
            {breadcrumb.map((b, i) => (
              <span key={b.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                <Link href={b.href} className="hover:text-foreground">
                  {b.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-label text-muted">
              {eyebrow}
            </span>
          </div>
          <h1
            className="max-w-3xl text-balance font-medium leading-[1.02] tracking-tightest text-foreground"
            style={{ fontSize: "clamp(2.6rem, 5.2vw, 5rem)" }}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-7 max-w-xl text-balance text-[17px] leading-relaxed text-muted">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
