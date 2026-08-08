import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";

/**
 * Inner-page opening. Marked `data-hero` so the page-load timeline choreographs
 * it and the generic scroll pass leaves it alone — inner pages get the same
 * entrance sequence as the homepage, minus the full-bleed image.
 */
export function PageHero({
  breadcrumb,
  label,
  lines,
  standfirst,
  meta,
  tone = "dark",
}: {
  breadcrumb?: { label: string; href: string }[];
  label: string;
  lines: string[];
  standfirst?: string;
  meta?: { label: string; value: string }[];
  tone?: "dark" | "light";
}) {
  const onDark = tone === "dark";

  return (
    <section
      data-hero
      className={clsx(
        "pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-40",
        onDark ? "bg-charcoal" : "border-b border-border bg-cream"
      )}
    >
      <Container>
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className={clsx(
              "mb-10 flex flex-wrap items-center gap-2 text-[0.8125rem]",
              onDark ? "text-muted" : "text-muted"
            )}
          >
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                <Link
                  href={crumb.href}
                  className={clsx(
                    "transition-colors",
                    onDark ? "hover:text-cream" : "hover:text-charcoal"
                  )}
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <p
          data-hero-item="eyebrow"
          className={clsx(
            "flex items-center gap-3 text-label uppercase",
            onDark ? "text-muted-light" : "text-muted"
          )}
        >
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          {label}
        </p>

        <h1
          className={clsx(
            "mt-8 max-w-[24ch] font-display text-display-xl",
            onDark ? "text-cream" : "text-charcoal"
          )}
        >
          <DisplayLines lines={lines} />
        </h1>

        {standfirst && (
          <p
            data-hero-item="body"
            className={clsx(
              "mt-9 max-w-[52ch] text-[1.0625rem] leading-relaxed",
              onDark ? "text-muted-light" : "text-muted"
            )}
          >
            {standfirst}
          </p>
        )}

        {meta && (
          <dl
            data-hero-item="cta"
            className={clsx(
              "mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t pt-10 sm:grid-cols-4",
              onDark ? "border-border-dark" : "border-border"
            )}
          >
            {meta.map((item) => (
              <div key={item.label}>
                <dt className={clsx("text-label uppercase", onDark ? "text-muted" : "text-muted")}>
                  {item.label}
                </dt>
                <dd
                  className={clsx(
                    "mt-3 text-[0.9375rem]",
                    onDark ? "text-cream" : "text-charcoal"
                  )}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
