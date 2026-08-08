import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx(align === "center" && "text-center", className)}>
      {eyebrow && (
        <div className={clsx("mb-5 flex items-center gap-3", align === "center" && "justify-center")}>
          <span className={clsx("h-[6px] w-[6px] rounded-full", light ? "bg-cream" : "bg-accent")} aria-hidden />
          <span
            className={clsx(
              "text-[11px] font-semibold uppercase tracking-label",
              light ? "text-cream/70" : "text-muted"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={clsx(
          "text-balance font-medium leading-[1.05] tracking-tightest",
          light ? "text-cream" : "text-foreground"
        )}
        style={{ fontSize: "clamp(2.4rem, 4.6vw, 4.5rem)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-6 max-w-xl text-balance",
            align === "center" && "mx-auto",
            light ? "text-cream/70" : "text-muted"
          )}
          style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.2rem)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
