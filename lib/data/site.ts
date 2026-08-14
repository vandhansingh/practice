export const site = {
  name: "Cornerstone",
  fullName: "Cornerstone Digital Agency",
  legalName: "Cornerstone Digital Agency Ltd.",
  domain: "cornerstonedigital.com",
  discipline: "Digital Agency",
  tagline: "Building strong foundations for brands that last.",
  /** The three-word value line that runs through the brand. */
  values: "Faith. Integrity. Excellence.",
  description:
    "Cornerstone is a digital agency building websites, brands and growth systems on strong foundations — digital solutions, human approach, Kingdom values.",
  founded: "2018",
  location: "Austin · Remote",
  email: "hello@cornerstonedigital.com",
  phone: "+1 (512) 555-0148",
  scripture: { text: "Proverbs 16:3", href: "" },

  social: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    x: "https://x.com",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/case-studies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Journal", href: "/blog" },
  ],

  cta: { label: "Start a project", href: "/contact" },
  ctaLong: { label: "Let's build your cornerstone", href: "/contact" },

  footerNav: {
    services: [
      { label: "Overview", href: "/services" },
      { label: "Websites", href: "/services/websites" },
      { label: "Branding", href: "/services/branding" },
      { label: "Digital Strategy", href: "/services/digital-strategy" },
      { label: "SEO & Growth", href: "/services/seo-and-growth" },
      { label: "Content & Creative", href: "/services/content-and-creative" },
    ],
    company: [
      { label: "Work", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
};

/** The three-step engagement arc from the brand board. */
export const approach = [
  {
    number: "01",
    title: "Understand",
    short: "We listen first.",
    description:
      "Before a single layout, we learn the business: who you serve, what actually drives revenue, and where the current site or brand gets in the way.",
  },
  {
    number: "02",
    title: "Build",
    short: "We create with purpose.",
    description:
      "Design and build with intent behind every decision. Nothing decorative for its own sake, and nothing shipped that we could not justify to you.",
  },
  {
    number: "03",
    title: "Grow",
    short: "We help you scale with clarity.",
    description:
      "Launch is the start. We measure what the work is doing, report it plainly, and keep improving the things that move the number.",
  },
];

/** The three-line promise used as a red panel on the homepage. */
export const promise = [
  { verb: "Design", rest: "with purpose." },
  { verb: "Build", rest: "with faith." },
  { verb: "Grow", rest: "with integrity." },
];
