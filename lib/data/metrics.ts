export type Metric = {
  display: string;
  counter?: { value: number; prefix?: string; suffix?: string; decimals?: number };
  label: string;
  illustrative?: boolean;
};

/**
 * Headline figures for the strip below the hero.
 *
 * `display` is what renders server-side, so the correct value is always in the
 * HTML; `counter` only drives the count-up tween while it's in flight. Figures
 * marked illustrative are composites — swap for audited numbers before launch.
 */
export const metrics: Metric[] = [
  {
    display: "$1.2B",
    counter: { value: 1.2, prefix: "$", suffix: "B", decimals: 1 },
    label: "Client revenue under active operating review",
    illustrative: true,
  },
  {
    display: "11 wks",
    counter: { value: 11, suffix: " wks" },
    label: "Median time to first measurable change",
    illustrative: true,
  },
  {
    display: "92%",
    counter: { value: 92, suffix: "%" },
    label: "Client retention beyond the first engagement",
    illustrative: true,
  },
  {
    display: "3.4x",
    counter: { value: 3.4, suffix: "x", decimals: 1 },
    label: "Median throughput gain in audited workflows",
    illustrative: true,
  },
];

/** Shared five-step engagement arc, used on the homepage and service pages. */
export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Two weeks inside the operation. We sit with the people doing the work and map how it actually moves — not how the process document says it should.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "We name the constraint. One thing is limiting throughput more than everything else combined, and it is rarely the thing the team is arguing about.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We design the future-state system: what runs automatically, what stays human, who owns each decision, and how the handoffs work.",
  },
  {
    number: "04",
    title: "Implement",
    description:
      "We build it alongside your team and run it in parallel with the existing process until the numbers hold. No big-bang cutover.",
  },
  {
    number: "05",
    title: "Optimize",
    description:
      "We stay on past go-live. Systems decay quietly, so we review against real usage and keep tightening what the data says is slipping.",
  },
];
