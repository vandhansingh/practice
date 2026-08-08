import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { metrics } from "@/lib/data/metrics";

function parseMetric(value: string) {
  const match = value.match(/[\d.]+/);
  const num = match ? parseFloat(match[0]) : 0;
  const prefix = value.slice(0, match?.index ?? 0);
  const suffix = value.slice((match?.index ?? 0) + (match?.[0].length ?? 0));
  const decimals = match?.[0].includes(".") ? 1 : 0;
  return { num, prefix, suffix, decimals };
}

export function Metrics() {
  return (
    <section className="border-y border-border bg-cream">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-0">
          {metrics.map((m, i) => {
            const { num, prefix, suffix, decimals } = parseMetric(m.value);
            return (
              <Reveal
                key={m.label}
                delay={i * 90}
                className={
                  i > 0
                    ? "lg:border-l lg:border-border lg:pl-8"
                    : undefined
                }
              >
                <p
                  className="font-medium tracking-tightest text-foreground"
                  style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}
                >
                  <Counter value={num} prefix={prefix} suffix={suffix} decimals={decimals} />
                </p>
                <p className="mt-3 max-w-[22ch] text-[14px] leading-snug text-muted">{m.label}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
