"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { site } from "@/lib/data/site";
import { getGsap, prefersReducedMotion } from "@/lib/animations/gsap-utils";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      root.querySelectorAll<HTMLElement>("[data-hero-el]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    let ctx: any;
    getGsap().then(({ gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.fromTo(
            '[data-hero-el="eyebrow"]',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.15
          )
          .fromTo(
            '[data-hero-el="line"]',
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 },
            0.25
          )
          .fromTo(
            '[data-hero-el="sub"]',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7 },
            0.55
          )
          .fromTo(
            '[data-hero-el="cta"]',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
            0.65
          )
          .fromTo(
            '[data-hero-el="visual"]',
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 1.1 },
            0.35
          );
      }, root);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-background pt-[76px]">
      <Container className="grid min-h-[calc(90vh-76px)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-6 lg:py-20">
        <div className="lg:col-span-7">
          <div data-hero-el="eyebrow" className="mb-7 flex items-center gap-3">
            <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-label text-muted">
              AI Systems &amp; Automation
            </span>
          </div>

          <h1
            className="max-w-2xl text-balance font-medium leading-[0.98] tracking-tightest text-foreground"
            style={{ fontSize: "clamp(3rem, 6.4vw, 6.4rem)" }}
          >
            <span data-hero-el="line" className="block overflow-hidden">
              Build a business
            </span>
            <span data-hero-el="line" className="block overflow-hidden">
              that runs better.
            </span>
          </h1>

          <p
            data-hero-el="sub"
            className="mt-8 max-w-lg text-balance text-[17px] leading-relaxed text-muted sm:text-[19px]"
          >
            We design AI-powered systems that remove operational friction,
            automate repetitive work, and help growing businesses scale
            without adding unnecessary complexity.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              data-hero-el="cta"
              href={site.ctaPrimary.href}
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-[14px] font-semibold text-cream transition-colors duration-300 hover:bg-foreground"
            >
              {site.ctaPrimary.label}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 ease-power3-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              data-hero-el="cta"
              href={site.ctaSecondary.href}
              className="text-[14px] font-semibold text-foreground underline decoration-border decoration-1 underline-offset-[6px] transition-colors hover:decoration-foreground"
            >
              {site.ctaSecondary.label}
            </Link>
          </div>
        </div>

        <div data-hero-el="visual" className="lg:col-span-5">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
