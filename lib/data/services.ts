export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  intro: string;
  capabilities: { title: string; description: string }[];
  process: { number: string; title: string; description: string }[];
  deliverables: string[];
  whoItsFor: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    number: "01",
    title: "AI Automation",
    short:
      "Design and implement automated workflows that remove repetitive operational work.",
    intro:
      "Most businesses run on a patchwork of manual steps — copying data between tools, chasing approvals, re-entering the same information twice. We map those steps and replace them with systems that run on their own, so your team spends time on decisions instead of data entry.",
    capabilities: [
      {
        title: "Workflow mapping",
        description:
          "We document how work actually moves through your business today, not how the org chart says it should.",
      },
      {
        title: "Process automation",
        description:
          "We build automated pipelines that connect your existing tools and handle repetitive tasks end to end.",
      },
      {
        title: "Exception handling",
        description:
          "Systems are designed to flag edge cases for a human instead of failing silently.",
      },
      {
        title: "Monitoring & alerting",
        description:
          "Every workflow ships with visibility — you always know what ran, what didn't, and why.",
      },
    ],
    process: [
      { number: "01", title: "Discover", description: "Understand the current operation." },
      { number: "02", title: "Design", description: "Map the future-state system." },
      { number: "03", title: "Build", description: "Implement workflows, integrations and interfaces." },
      { number: "04", title: "Launch", description: "Test, train and hand over." },
      { number: "05", title: "Optimize", description: "Monitor and improve." },
    ],
    deliverables: [
      "Documented process maps",
      "Automated workflows in production",
      "Monitoring dashboard",
      "Internal handover documentation",
    ],
    whoItsFor: [
      "Operations teams drowning in manual, repetitive tasks",
      "Businesses running critical processes across disconnected tools",
      "Founders who want to scale headcount slower than revenue",
    ],
    faq: [
      {
        question: "What kind of processes can be automated?",
        answer:
          "Anything rules-based and repeated: data entry, approvals, notifications, reporting, file handling, and routing work between systems and people.",
      },
      {
        question: "Will this replace our team?",
        answer:
          "No. The goal is to remove the repetitive parts of a role so people can focus on judgment calls, relationships, and work that actually needs a human.",
      },
    ],
  },
  {
    slug: "ai-voice-agents",
    number: "02",
    title: "AI Voice Agents",
    short:
      "Build intelligent voice agents that answer calls, qualify leads, schedule appointments and handle routine conversations.",
    intro:
      "Missed calls are missed revenue. We build voice agents trained on how your business actually talks to customers — answering common questions, qualifying leads, and booking appointments, with a clean handoff to a human whenever a conversation needs one.",
    capabilities: [
      {
        title: "Conversation design",
        description:
          "Scripts and decision trees built from your real call transcripts, not generic templates.",
      },
      {
        title: "Lead qualification",
        description:
          "Agents ask the right questions and route qualified leads straight into your CRM.",
      },
      {
        title: "Scheduling",
        description:
          "Direct integration with your calendar so appointments are booked without back-and-forth.",
      },
      {
        title: "Human handoff",
        description:
          "Clear escalation paths so complex or sensitive calls reach a person immediately.",
      },
    ],
    process: [
      { number: "01", title: "Discover", description: "Listen to real calls and identify patterns." },
      { number: "02", title: "Design", description: "Script the conversation flows and guardrails." },
      { number: "03", title: "Build", description: "Configure the agent, integrations and voice." },
      { number: "04", title: "Launch", description: "Run in parallel, tune, then go live." },
      { number: "05", title: "Optimize", description: "Review transcripts and refine monthly." },
    ],
    deliverables: [
      "Live voice agent on your existing number",
      "Call transcripts and analytics",
      "CRM-integrated lead capture",
      "Escalation and handoff rules",
    ],
    whoItsFor: [
      "Businesses that miss calls outside business hours",
      "Teams spending hours a day on routine phone screening",
      "Service businesses booking appointments by phone",
    ],
    faq: [
      {
        question: "Does it sound robotic?",
        answer:
          "No. We use natural, low-latency voice models and write conversation flows specifically for how your customers speak.",
      },
      {
        question: "What happens when the agent doesn't know the answer?",
        answer:
          "It says so, and either transfers the call live or logs the question for a team member to follow up.",
      },
    ],
  },
  {
    slug: "crm-automation",
    number: "03",
    title: "Lead & CRM Automation",
    short:
      "Capture, qualify and route leads automatically across your marketing and sales stack.",
    intro:
      "Leads arrive from a dozen places and too often sit untouched. We connect your forms, ads, calls and inbox to one system that qualifies, scores and routes every lead the moment it arrives.",
    capabilities: [
      {
        title: "Lead capture",
        description: "Every channel — forms, ads, chat, phone — feeds into a single pipeline.",
      },
      {
        title: "Scoring & routing",
        description: "Leads are qualified automatically and assigned to the right owner instantly.",
      },
      {
        title: "Follow-up sequencing",
        description: "Automated, personalized outreach keeps leads warm without manual effort.",
      },
      {
        title: "Reporting",
        description: "Clear visibility into pipeline velocity, source performance and conversion.",
      },
    ],
    process: [
      { number: "01", title: "Discover", description: "Audit the current lead flow end to end." },
      { number: "02", title: "Design", description: "Design the scoring and routing logic." },
      { number: "03", title: "Build", description: "Connect the stack and automate the pipeline." },
      { number: "04", title: "Launch", description: "Train the team and go live." },
      { number: "05", title: "Optimize", description: "Refine scoring against real outcomes." },
    ],
    deliverables: [
      "Unified lead pipeline",
      "Automated scoring and routing rules",
      "Follow-up sequences in production",
      "Source-level reporting",
    ],
    whoItsFor: [
      "Sales teams losing leads between tools",
      "Marketing teams that can't prove channel ROI",
      "Businesses with slow, inconsistent lead response times",
    ],
    faq: [
      {
        question: "Can you work with our existing CRM?",
        answer:
          "Yes. We build around what you already use — HubSpot, Salesforce, Pipedrive, GoHighLevel and most modern CRMs support the integrations we need.",
      },
      {
        question: "How fast can leads be contacted after this is live?",
        answer:
          "Most clients move from hours to under a minute for the first automated touch.",
      },
    ],
  },
  {
    slug: "internal-ai-systems",
    number: "04",
    title: "Internal AI Systems",
    short:
      "Build custom internal tools, dashboards and knowledge systems that help teams work faster.",
    intro:
      "The information your team needs is usually somewhere — just not anywhere useful. We build internal tools that put the right data and the right answers in front of the right people, without another tab to check.",
    capabilities: [
      {
        title: "Internal dashboards",
        description: "Live views of the metrics that matter, pulled from your existing systems.",
      },
      {
        title: "Knowledge systems",
        description: "Searchable, AI-assisted access to internal documentation and policy.",
      },
      {
        title: "Custom internal tools",
        description: "Purpose-built interfaces for the workflows your team runs every day.",
      },
      {
        title: "Access & permissions",
        description: "Role-based access built in from day one, not bolted on after.",
      },
    ],
    process: [
      { number: "01", title: "Discover", description: "Identify where teams lose time hunting for information." },
      { number: "02", title: "Design", description: "Design the interface around the actual workflow." },
      { number: "03", title: "Build", description: "Build and connect to your data sources." },
      { number: "04", title: "Launch", description: "Roll out with training and documentation." },
      { number: "05", title: "Optimize", description: "Iterate based on real usage." },
    ],
    deliverables: [
      "Production internal application",
      "Connected data sources",
      "Role-based permissions",
      "Team onboarding materials",
    ],
    whoItsFor: [
      "Teams spending hours searching for information across tools",
      "Operations leaders who need live visibility into the business",
      "Companies outgrowing spreadsheets as a system of record",
    ],
    faq: [
      {
        question: "Do we need an internal technical team?",
        answer:
          "No. We handle build and deployment, and hand over documentation so your team can operate it confidently day to day.",
      },
      {
        question: "Can this integrate with our existing software?",
        answer:
          "Yes — we design internal systems around your existing stack rather than asking you to replace it.",
      },
    ],
  },
  {
    slug: "custom-software",
    number: "05",
    title: "Custom Business Software",
    short: "Design and develop software around the actual way the business operates.",
    intro:
      "Off-the-shelf software makes you adapt to it. We build software that adapts to you — modelled on how your business actually operates, not a generic template.",
    capabilities: [
      {
        title: "Product strategy",
        description: "We define scope around outcomes, not a feature wishlist.",
      },
      {
        title: "System architecture",
        description: "Built to integrate cleanly with what you already run.",
      },
      {
        title: "Application development",
        description: "Production-grade software, built and maintained to a professional standard.",
      },
      {
        title: "Ongoing support",
        description: "We stay involved after launch so the system evolves with the business.",
      },
    ],
    process: [
      { number: "01", title: "Discover", description: "Understand the operational requirements." },
      { number: "02", title: "Design", description: "Architect the system and interface." },
      { number: "03", title: "Build", description: "Develop, test and integrate." },
      { number: "04", title: "Launch", description: "Deploy and train the team." },
      { number: "05", title: "Optimize", description: "Support and extend post-launch." },
    ],
    deliverables: [
      "Production software application",
      "System architecture documentation",
      "Deployment and hosting setup",
      "Ongoing support agreement",
    ],
    whoItsFor: [
      "Businesses whose processes don't fit off-the-shelf tools",
      "Companies replacing spreadsheets or legacy systems",
      "Organizations that need software as a long-term operating asset",
    ],
    faq: [
      {
        question: "How long does a custom build take?",
        answer:
          "Most engagements move from discovery to a live first version in 8–14 weeks, depending on scope.",
      },
      {
        question: "Do you support the software after launch?",
        answer:
          "Yes — ongoing support and iteration is part of every custom software engagement.",
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
