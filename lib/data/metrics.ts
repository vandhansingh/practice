export type Metric = {
  display: string;
  counter?: { value: number; prefix?: string; suffix?: string; decimals?: number };
  label: string;
  illustrative?: boolean;
};

/**
 * Headline figures for the strip below the hero.
 *
 * `display` renders server-side so the correct value is always in the HTML;
 * `counter` only drives the count-up while it is in flight. Figures marked
 * illustrative are composites — replace with audited numbers before launch.
 */
export const metrics: Metric[] = [
  {
    display: "120+",
    counter: { value: 120, suffix: "+" },
    label: "Websites and brands built since 2018",
    illustrative: true,
  },
  {
    display: "2.8x",
    counter: { value: 2.8, suffix: "x", decimals: 1 },
    label: "Median lift in enquiries after launch",
    illustrative: true,
  },
  {
    display: "94%",
    counter: { value: 94, suffix: "%" },
    label: "Of clients return for a second project",
    illustrative: true,
  },
  {
    display: "0.9s",
    counter: { value: 0.9, suffix: "s", decimals: 1 },
    label: "Average load time across sites we ship",
    illustrative: true,
  },
];

/** Re-exported for pages that show the engagement arc. */
export { approach as processSteps } from "./site";
