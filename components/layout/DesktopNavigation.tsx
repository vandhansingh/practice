"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { site } from "@/lib/data/site";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
      {site.nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={clsx(
              "relative py-1 text-[0.8125rem] font-medium transition-colors duration-300",
              active ? "text-cream" : "text-muted-light hover:text-cream"
            )}
          >
            {item.label}
            {/* Active state is carried by a rule as well as colour, so it
                doesn't depend on hue alone. */}
            <span
              aria-hidden="true"
              className={clsx(
                "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-500 ease-expo",
                active ? "w-full" : "w-0"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
