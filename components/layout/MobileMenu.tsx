"use client";

import Link from "next/link";
import clsx from "clsx";
import { site } from "@/lib/data/site";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-menu"
      className={clsx(
        "fixed inset-x-0 top-[76px] bottom-0 z-40 flex flex-col justify-between bg-cream px-6 pb-10 pt-6 transition-all duration-500 ease-power3-out lg:hidden",
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
      )}
    >
      <nav className="flex flex-col" aria-label="Mobile">
        {site.nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={clsx(
              "border-b border-border py-5 text-[13vw] font-medium leading-none tracking-tightest text-foreground transition-all duration-500 ease-power3-out sm:text-[44px]",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        className={clsx(
          "flex flex-col gap-6 pt-8 transition-all duration-500 ease-power3-out",
          open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
        style={{ transitionDelay: open ? "420ms" : "0ms" }}
      >
        <Link
          href={site.ctaPrimary.href}
          onClick={onClose}
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-[15px] font-semibold text-cream"
        >
          {site.ctaPrimary.label}
        </Link>
        <div className="flex items-center justify-between text-[13px] text-muted">
          <span>{site.email}</span>
          <span>{site.location}</span>
        </div>
      </div>
    </div>
  );
}
