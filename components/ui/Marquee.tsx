import clsx from "clsx";

/**
 * Infinite ticker frame.
 *
 * The children are rendered twice. That is not a mistake and not a hack: the
 * track is translated by exactly -50%, so at the loop point the second copy is
 * sitting precisely where the first began and the seam is invisible. The
 * duplicate is `aria-hidden`, so assistive tech reads the list once.
 *
 * Server Component — `lib/gsap/marquee.ts` picks it up by attribute.
 * Without JS the strip simply sits still, showing the first copy.
 */
export function Marquee({
  children,
  speed = 26,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  /** Seconds for one full pass. Longer is slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      data-marquee
      data-marquee-speed={speed}
      {...(reverse ? { "data-marquee-reverse": true } : {})}
      className={clsx("relative w-full overflow-hidden", className)}
    >
      <div data-marquee-track className="flex w-max items-center">
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
