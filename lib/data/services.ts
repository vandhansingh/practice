import type { ImageSlot } from "@/components/visuals/BrandImage";

export type Service = {
  slug: string;
  number: string;
  label: string;
  title: string;
  summary: string;
  intro: string;
  overview: string[];
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  whoItsFor: string[];
  faq: { question: string; answer: string }[];
  slot: ImageSlot;
};

export const services: Service[] = [
  {
    slug: "websites",
    number: "01",
    label: "Build",
    title: "Websites",
    summary: "Fast, accessible sites designed to convert and built to last.",
    intro:
      "A website is the one asset you own outright. We design and build sites that load fast, read clearly, rank well and keep working long after launch — not templates dressed up as custom work.",
    overview: [
      "Most sites underperform for unglamorous reasons: they are slow, they bury the thing the visitor came for, or they were built on a stack nobody on the team can safely edit.",
      "We start from what the site has to achieve, then design around that. Every build ships fast, accessible, measurable, and handed over so your team can run it without calling us for a copy change.",
    ],
    capabilities: [
      {
        title: "Design & build",
        description:
          "Custom design and front-end build — no page-builder bloat, no theme fighting you six months in.",
      },
      {
        title: "Performance",
        description:
          "Core Web Vitals treated as a requirement, not a nice-to-have. Speed is the cheapest conversion win available.",
      },
      {
        title: "Accessibility",
        description:
          "Semantic markup, real keyboard support and tested contrast. It widens your audience and it is the right thing to do.",
      },
      {
        title: "Handover",
        description:
          "A CMS your team can actually use, with documentation and training so you own the site the day we finish.",
      },
    ],
    deliverables: [
      "Custom design system and page templates",
      "Production build with CMS",
      "Performance and accessibility audit",
      "Team training and documentation",
    ],
    whoItsFor: [
      "Businesses whose site no longer reflects the company",
      "Teams stuck on a slow or unmaintainable platform",
      "Founders who need a site that sells while they sleep",
    ],
    faq: [
      {
        question: "How long does a website take?",
        answer:
          "Most marketing sites run 6–10 weeks from kickoff to launch, depending on page count and how ready the content is. You will have specific dates before we start.",
      },
      {
        question: "Can we edit it ourselves afterwards?",
        answer:
          "Yes — that is the point of the handover. Everything editable is in the CMS, and we train your team on it before we finish.",
      },
    ],
    slot: "screen",
  },
  {
    slug: "branding",
    number: "02",
    label: "Identity",
    title: "Branding",
    summary: "Identity systems with a clear idea underneath, not just a logo file.",
    intro:
      "A brand is what people say about you when you are not in the room. We build the identity system that makes that easier to steer — the mark, the voice, and the rules that keep it consistent.",
    overview: [
      "Plenty of businesses have a logo and no brand: nothing that tells a designer what to do next week, or a writer how the company sounds.",
      "We build the whole system — positioning, mark, type, colour, voice, and usage rules — so everything you make afterwards holds together without you having to police it.",
    ],
    capabilities: [
      {
        title: "Positioning",
        description:
          "What you stand for, who it is for, and what makes it different — written plainly enough to act on.",
      },
      {
        title: "Visual identity",
        description: "Logo, type, colour and layout system, built to work at every size and surface.",
      },
      {
        title: "Voice",
        description:
          "How the brand sounds, with real examples rather than adjectives, so anyone can write in it.",
      },
      {
        title: "Guidelines",
        description: "A practical brand book your team and any future agency can follow.",
      },
    ],
    deliverables: [
      "Positioning and messaging framework",
      "Logo suite and full visual identity",
      "Voice and tone guide with examples",
      "Brand guidelines document",
    ],
    whoItsFor: [
      "Companies that outgrew the identity they started with",
      "Businesses that look different in every channel",
      "New ventures that need to launch coherent",
    ],
    faq: [
      {
        question: "Do we have to rebrand everything at once?",
        answer:
          "No. We usually phase it — digital first, print and environment as they come up for renewal — so the cost lands over time.",
      },
      {
        question: "Do you work with our existing logo?",
        answer:
          "Often, yes. If the mark still has equity we build the system around it rather than charging you to replace something that works.",
      },
    ],
    slot: "stone",
  },
  {
    slug: "digital-strategy",
    number: "03",
    label: "Direction",
    title: "Digital Strategy",
    summary: "A clear plan for where to invest, and what to stop doing.",
    intro:
      "Strategy work earns its keep by removing things. We map where your digital effort actually goes, what it returns, and the two or three moves worth making next.",
    overview: [
      "Teams rarely lack ideas — they lack an agreed order. So effort spreads across channels that each get too little to work.",
      "We assess the whole picture, size the opportunities honestly, and hand back a sequenced plan with the reasoning attached, so it survives the next change of mind.",
    ],
    capabilities: [
      {
        title: "Audit",
        description: "Site, channels, analytics and competitors, reviewed against what you are trying to achieve.",
      },
      {
        title: "Audience",
        description: "Who is actually buying, what they are looking for, and where they look for it.",
      },
      {
        title: "Roadmap",
        description: "A sequenced plan with effort, expected return and a clear first move.",
      },
      {
        title: "Measurement",
        description: "The handful of numbers worth watching, and the reporting to see them.",
      },
    ],
    deliverables: [
      "Digital audit and findings",
      "Audience and opportunity map",
      "Sequenced 12-month roadmap",
      "Measurement framework",
    ],
    whoItsFor: [
      "Teams busy across many channels with little to show",
      "Businesses about to invest and wanting the order right",
      "Leaders who need a plan they can take to a board",
    ],
    faq: [
      {
        question: "Do you deliver the plan, or just write it?",
        answer:
          "Either. Plenty of clients take the roadmap in-house; when you would rather we built it, the strategy fee comes off the build.",
      },
      {
        question: "How long does it take?",
        answer: "Four weeks for most businesses, including the readout session.",
      },
    ],
    slot: "wireframes",
  },
  {
    slug: "seo-and-growth",
    number: "04",
    label: "Reach",
    title: "SEO & Growth",
    summary: "Compounding visibility from technical foundations up, not tricks.",
    intro:
      "Growth work that still pays two years from now looks boring at the start: fix the technical base, publish what people actually search for, and earn links honestly.",
    overview: [
      "Search rewards patience and punishes shortcuts. We do not sell tactics with a short shelf life.",
      "The work is sequenced — technical health, then structure and content, then authority — because each stage makes the next one worth doing.",
    ],
    capabilities: [
      {
        title: "Technical SEO",
        description: "Crawlability, speed, structured data and the errors quietly capping your ceiling.",
      },
      {
        title: "Content strategy",
        description: "What to publish, in what order, based on demand and how hard each term is to win.",
      },
      {
        title: "Local & conversion",
        description: "Local presence where it matters, and turning arriving traffic into enquiries.",
      },
      {
        title: "Reporting",
        description: "Plain monthly reporting on rankings, traffic and enquiries — no vanity dashboards.",
      },
    ],
    deliverables: [
      "Technical SEO audit and fixes",
      "Keyword and content plan",
      "On-page optimisation across the site",
      "Monthly reporting",
    ],
    whoItsFor: [
      "Businesses invisible for the terms that matter",
      "Sites that lost traffic after a migration",
      "Teams wanting a channel that compounds",
    ],
    faq: [
      {
        question: "How long before we see results?",
        answer:
          "Technical fixes can move things in weeks. Content and authority typically take three to six months to show clearly. Anyone promising faster is guessing.",
      },
      {
        question: "Do you guarantee rankings?",
        answer: "No, and neither should anyone else. We guarantee the work and report the outcomes honestly.",
      },
    ],
    slot: "skyline",
  },
  {
    slug: "content-and-creative",
    number: "05",
    label: "Voice",
    title: "Content & Creative",
    summary: "Words and visuals that sound like you and do a job.",
    intro:
      "Good content is not volume. It is the right thing said clearly, to someone specific, at the moment it helps — produced consistently enough to build trust.",
    overview: [
      "Most content programmes fail on consistency, not talent. They start strong and quietly stop.",
      "We build something sustainable at your real capacity: a clear voice, a workable cadence, and templates that make producing the next piece straightforward.",
    ],
    capabilities: [
      {
        title: "Copywriting",
        description: "Site copy, campaigns and long-form that sounds like a person, not a category.",
      },
      {
        title: "Art direction",
        description: "A consistent visual approach across photography, layout and social.",
      },
      {
        title: "Production",
        description: "Photography and video direction, produced to the brand rather than to a trend.",
      },
      {
        title: "Editorial system",
        description: "Calendar, templates and a workflow your team can maintain after we step back.",
      },
    ],
    deliverables: [
      "Voice guide with worked examples",
      "Core site and campaign copy",
      "Art direction and asset library",
      "Editorial calendar and templates",
    ],
    whoItsFor: [
      "Businesses that sound like everyone else",
      "Teams who start content programmes and stall",
      "Brands needing consistency across channels",
    ],
    faq: [
      {
        question: "Can you write for a technical industry?",
        answer:
          "Yes. We interview your experts and write from what they say — that is usually the difference between credible and generic.",
      },
      {
        question: "Do you hand over the system?",
        answer: "Always. The goal is that your team can keep producing without us.",
      },
    ],
    slot: "workspace",
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
