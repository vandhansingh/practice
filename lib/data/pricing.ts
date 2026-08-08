export type PricingTier = {
  name: string;
  tagline: string;
  idealFor: string;
  included: string[];
  engagement: string;
  cta: string;
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Foundation",
    tagline: "For businesses beginning their automation journey.",
    idealFor:
      "Teams that know time is being lost to manual work but haven't yet mapped where, or how much.",
    included: [
      "Operational audit & process mapping",
      "One automated workflow, built and deployed",
      "Monitoring & handover documentation",
      "30 days of post-launch support",
    ],
    engagement: "4–6 week engagement",
    cta: "Start with Foundation",
  },
  {
    name: "Systems",
    tagline: "For businesses ready to automate core workflows.",
    idealFor:
      "Growing companies with two or more operational bottlenecks slowing the whole business down.",
    included: [
      "Everything in Foundation",
      "Up to four connected automated workflows",
      "CRM or voice agent integration",
      "Internal dashboard for visibility",
      "90 days of post-launch support",
    ],
    engagement: "8–12 week engagement",
    cta: "Start with Systems",
    featured: true,
  },
  {
    name: "Scale",
    tagline: "For organizations building a complete AI operating layer.",
    idealFor:
      "Established businesses ready to unify automation, internal tools and custom software into one system.",
    included: [
      "Everything in Systems",
      "Custom internal software or application",
      "Dedicated systems architecture",
      "Quarterly optimization reviews",
      "Ongoing support retainer",
    ],
    engagement: "Ongoing partnership",
    cta: "Talk to us about Scale",
  },
];
