export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They spent two weeks watching how we actually work before proposing anything. Nobody had done that before — every previous firm arrived with the answer already written.",
    name: "Operations Director",
    role: "Operations Director",
    company: "National freight operator",
  },
  {
    quote:
      "The finding was that we'd been paying overtime to paper over a process problem for two years. Uncomfortable, and completely correct.",
    name: "Managing Director",
    role: "Managing Director",
    company: "B2B distributor",
  },
  {
    quote:
      "What stuck was that they left. The system runs without them, which is the only real test of whether the work was any good.",
    name: "Commercial Director",
    role: "Commercial Director",
    company: "Regional main contractor",
  },
];
