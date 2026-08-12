import type { ImageSlot } from "@/components/visuals/BrandImage";

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  outcome: string;
  client: string;
  overview: string;
  challenge: string[];
  approach: string[];
  implementation: string[];
  results: { metric: string; label: string }[];
  services: string[];
  testimonial: { quote: string; name: string; role: string };
  slot: ImageSlot;
  /** Figures are composites drawn from patterns across projects. */
  illustrative: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "heritage-build-co",
    category: "Construction",
    title: "A builder's site that finally sells the work as well as the crew does",
    outcome: "Enquiries up 3.1x, cost per lead down 62%",
    client: "Regional design-build contractor",
    overview:
      "Twenty years of exceptional work, represented by a site that loaded in six seconds and buried the portfolio three clicks deep.",
    challenge: [
      "The firm won most jobs it quoted, but was quoting too few. Referrals carried the business while the website actively lost people — slow on mobile, portfolio hidden behind a generic services menu, and no clear way to start a conversation.",
      "Paid search was running into the same page, so spend was subsidising a leak rather than filling a pipeline.",
    ],
    approach: [
      "We rebuilt around the one thing that converts for a builder: the work. Projects became the primary navigation, each one a full story with drawings, process and the finished result.",
      "Enquiry moved to a short, specific form that qualifies rather than interrogates, placed on every project page instead of quarantined on a contact page.",
    ],
    implementation: [
      "Custom build with a project CMS the team updates themselves after each job.",
      "Image pipeline that keeps large photography under a second on mobile.",
      "Paid search pointed at project pages rather than the homepage.",
    ],
    results: [
      { metric: "3.1x", label: "Increase in qualified enquiries" },
      { metric: "62%", label: "Lower cost per lead" },
      { metric: "0.8s", label: "Mobile load time, from 6.2s" },
    ],
    services: ["Websites", "Content & Creative", "SEO & Growth"],
    testimonial: {
      quote:
        "We were spending on ads that pointed at a page losing people. They fixed the page first, which nobody else had suggested.",
      name: "Managing Director",
      role: "Regional design-build contractor",
    },
    slot: "tower",
    illustrative: true,
  },
  {
    slug: "north-arbor-clinic",
    category: "Healthcare",
    title: "A brand and site for a clinic group opening its fourth location",
    outcome: "Bookings up 78%, one identity across four sites",
    client: "Multi-site outpatient clinic group",
    overview:
      "Three clinics with three different logos, three websites and no shared voice. A fourth was opening in five months.",
    challenge: [
      "Each location had been branded independently as it opened, so the group looked like three unrelated practices. Patients booking at one had no idea the others existed.",
      "Booking ran through a different system per site, and none of them worked properly on a phone.",
    ],
    approach: [
      "One identity system with room for each location to keep its name, so local recognition survived the consolidation.",
      "A single site with location-aware booking — pick a clinic or let the site pick the nearest — replacing three disconnected flows.",
    ],
    implementation: [
      "Brand system rolled out digital-first, with print and signage replaced as each came up for renewal.",
      "One booking flow integrated with the practice-management system, mobile-first.",
      "Launched with the fourth clinic so the opening carried the new identity.",
    ],
    results: [
      { metric: "78%", label: "Increase in online bookings" },
      { metric: "4", label: "Locations on one identity" },
      { metric: "41%", label: "More patients booking on mobile" },
    ],
    services: ["Branding", "Websites", "Digital Strategy"],
    testimonial: {
      quote:
        "They kept what people already recognised locally instead of flattening it. That mattered more than we expected.",
      name: "Group Practice Manager",
      role: "Outpatient clinic group",
    },
    slot: "stone",
    illustrative: true,
  },
  {
    slug: "meridian-supply",
    category: "B2B Commerce",
    title: "Making a 4,000-product catalogue findable for the people who buy it",
    outcome: "Organic traffic up 240%, search-to-quote up 5.4x",
    client: "Industrial supply distributor",
    overview:
      "A catalogue big enough to answer almost any query, structured so that search engines and customers could find almost none of it.",
    challenge: [
      "Product pages were generated with near-identical copy and no structured data, so search treated most of the catalogue as duplicate. Only the homepage ranked.",
      "On-site search returned nothing useful unless a customer typed the exact SKU.",
    ],
    approach: [
      "We restructured the catalogue around how buyers actually search — by application and specification, not by internal category codes.",
      "Templates were rewritten to carry genuinely distinct, useful content per product, with structured data throughout.",
    ],
    implementation: [
      "Category and taxonomy rebuild mapped to real search demand.",
      "Product templates with specs, applications and structured data.",
      "On-site search rebuilt to handle specs, synonyms and partial terms.",
    ],
    results: [
      { metric: "240%", label: "Increase in organic traffic" },
      { metric: "5.4x", label: "More search-to-quote conversions" },
      { metric: "3,100", label: "Product pages ranking, from ~40" },
    ],
    services: ["SEO & Growth", "Websites", "Digital Strategy"],
    testimonial: {
      quote:
        "The fix was structural, not cosmetic. They rebuilt how the catalogue was organised and the traffic followed.",
      name: "Head of Ecommerce",
      role: "Industrial supply distributor",
    },
    slot: "blocks",
    illustrative: true,
  },
];

export const getCaseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
