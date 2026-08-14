import { Marquee } from "@/components/ui/Marquee";
import { RedSquare } from "@/components/visuals/Motifs";
import { services } from "@/lib/data/services";

/**
 * Ink band of service names on a loop, between the approach and the work.
 *
 * Earns its place two ways. It carries real content — the five service names,
 * which is exactly what someone scanning for "do they do branding?" is looking
 * for — and it gives the page its one moment of continuous motion, breaking up
 * a long run of sections that all arrive the same way on scroll.
 *
 * No fade mask at the edges: the strip is hard-clipped by the band. A gradient
 * fade is the soft treatment the rest of the system refuses.
 */
export function ServicesTicker() {
  return (
    <section
      data-dark
      aria-label="What we do"
      className="border-y-2 border-charcoal bg-charcoal py-7"
    >
      <Marquee speed={34}>
        {services.map((service) => (
          <span key={service.slug} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-display text-[1.5rem] font-medium tracking-[-0.02em] text-cream sm:text-[1.875rem]">
              {service.title}
            </span>
            <RedSquare size={9} />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
