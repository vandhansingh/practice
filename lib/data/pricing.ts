export type Engagement = {
  name: string;
  positioning: string;
  price: string;
  priceNote: string;
  idealFor: string;
  included: string[];
  duration: string;
  cta: string;
  featured?: boolean;
};

export const engagements: Engagement[] = [
  {
    name: "Foundation",
    positioning: "A site that does the job, shipped properly.",
    price: "From $18,000",
    priceNote: "Fixed fee, 6–8 weeks",
    idealFor:
      "Businesses whose site no longer represents the company, and who need one that loads fast, reads clearly and converts.",
    included: [
      "Discovery and site strategy",
      "Custom design across all templates",
      "Production build with CMS",
      "Performance and accessibility pass",
      "Training and 30 days of support",
    ],
    duration: "6–8 weeks",
    cta: "Start a website",
  },
  {
    name: "Cornerstone",
    positioning: "Brand and site built together, as one system.",
    price: "From $38,000",
    priceNote: "Fixed fee, 10–14 weeks",
    idealFor:
      "Companies that have outgrown both their identity and their site, and want the two designed as one rather than bolted together.",
    included: [
      "Everything in Foundation",
      "Positioning and messaging",
      "Full visual identity and brand guidelines",
      "Voice guide and core copywriting",
      "Launch campaign assets",
      "90 days of post-launch support",
    ],
    duration: "10–14 weeks",
    cta: "Build the whole thing",
    featured: true,
  },
  {
    name: "Growth Partner",
    positioning: "An ongoing team for the work after launch.",
    price: "From $3,500",
    priceNote: "Per month, 6-month minimum",
    idealFor:
      "Businesses treating digital as a channel that compounds — SEO, content and iteration handled on a standing cadence.",
    included: [
      "SEO and technical maintenance",
      "Monthly content production",
      "Conversion testing and iteration",
      "Plain-language monthly reporting",
      "Standing strategy access",
    ],
    duration: "Ongoing",
    cta: "Talk about a retainer",
  },
];

/** Row-by-row comparison shown beneath the engagement cards. */
export const comparison: { feature: string; values: [string, string, string] }[] = [
  { feature: "Discovery & strategy", values: ["Yes", "Extended", "Ongoing"] },
  { feature: "Custom website design", values: ["Yes", "Yes", "Iterative"] },
  { feature: "Production build & CMS", values: ["Yes", "Yes", "Maintained"] },
  { feature: "Brand identity system", values: ["—", "Yes", "—"] },
  { feature: "Copywriting", values: ["Key pages", "Full site", "Monthly"] },
  { feature: "SEO foundations", values: ["Technical", "Technical + content", "Full programme"] },
  { feature: "Performance & accessibility", values: ["Yes", "Yes", "Monitored"] },
  { feature: "Reporting", values: ["—", "Launch report", "Monthly"] },
  { feature: "Post-launch support", values: ["30 days", "90 days", "Continuous"] },
];
