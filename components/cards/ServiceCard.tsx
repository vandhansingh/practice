import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      data-cursor="view"
      className="group flex flex-col justify-between border border-border p-8 transition-colors duration-500 hover:border-accent hover:bg-cream sm:p-10"
    >
      <div>
        <span className="text-[13px] font-medium text-muted">{service.number}</span>
        <h3
          className="mt-6 text-balance font-medium leading-tight tracking-tightest text-foreground"
          style={{ fontSize: "clamp(1.5rem, 2vw, 1.9rem)" }}
        >
          {service.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{service.short}</p>
      </div>
      <div className="mt-10 flex items-center gap-2 text-[13px] font-semibold text-foreground">
        <span>Learn more</span>
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 ease-power3-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  );
}
