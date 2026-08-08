export const site = {
  name: "Halyard",
  legalName: "Halyard Partners LLP",
  domain: "halyardpartners.com",
  discipline: "Operations Consulting",
  description:
    "Halyard is an operations consultancy. We find the constraint that's limiting your business, then design and install the systems that remove it.",
  founded: "2016",
  location: "London · New York",
  email: "hello@halyardpartners.com",
  phone: "+44 20 7946 0412",

  social: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    x: "https://x.com",
  },

  /** Primary navigation — deliberately short, per the reference's four links. */
  nav: [
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],

  cta: { label: "Book a call", href: "/contact" },
  ctaLong: { label: "Book a discovery call", href: "/contact" },

  footerNav: {
    services: [
      { label: "Overview", href: "/services" },
      { label: "Operations Audit", href: "/services/operations-audit" },
      { label: "Systems Design", href: "/services/systems-design" },
      { label: "Organizational Alignment", href: "/services/organizational-alignment" },
      { label: "The Constraint Audit", href: "/the-constraint-audit" },
      { label: "Pricing", href: "/pricing" },
    ],
    company: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
};
