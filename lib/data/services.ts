import { processSteps } from "./metrics";

export type Service = {
  slug: string;
  number: string;
  label: string;
  title: string;
  /** One line for the homepage list. */
  summary: string;
  /** Longer opening paragraph for the service page hero. */
  intro: string;
  overview: string[];
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  whoItsFor: string[];
  faq: { question: string; answer: string }[];
  motif: "facade" | "colonnade" | "interior" | "stair" | "surface";
};

export const services: Service[] = [
  {
    slug: "operations-audit",
    number: "01",
    label: "Diagnostic",
    title: "Operations Audit",
    summary:
      "A structured read of how work actually moves through the business, and where it stops.",
    intro:
      "Every business has one constraint doing more damage than the rest combined. The audit finds it. Six weeks, inside the operation, with the people doing the work — then a written diagnosis you can act on whether or not you hire us again.",
    overview: [
      "Most operational problems are misdiagnosed. Teams optimise the step that feels worst rather than the step that governs throughput, and six months later the same bottleneck has moved one desk to the left.",
      "The audit is deliberately unglamorous. We observe the work, measure the handoffs, follow the exceptions, and interview the people who quietly keep things running. What comes out is a ranked list of constraints with the cost of each one attached.",
    ],
    capabilities: [
      {
        title: "Process mapping",
        description:
          "Current-state maps built from observation and system logs, not from workshops where everyone describes the ideal version.",
      },
      {
        title: "Constraint analysis",
        description:
          "We quantify where throughput is actually lost — queue time, rework, waiting on a decision — and rank by cost.",
      },
      {
        title: "Cost-of-delay modelling",
        description:
          "Each bottleneck gets a number, so sequencing the fixes becomes an arithmetic question rather than a political one.",
      },
      {
        title: "Written diagnosis",
        description:
          "A document your team can act on independently, with a recommended sequence and the evidence behind each call.",
      },
    ],
    deliverables: [
      "Current-state process maps",
      "Ranked constraint register with cost-of-delay",
      "Written diagnosis and recommended sequence",
      "Executive readout session",
    ],
    whoItsFor: [
      "Businesses growing faster than their processes can absorb",
      "Leadership teams that disagree about where the real problem is",
      "Operators who've fixed symptoms twice and want the cause",
    ],
    faq: [
      {
        question: "How disruptive is the audit to the team?",
        answer:
          "Minimally. We work around the operation rather than through it — mostly observation and short interviews. Expect roughly two hours per key person across six weeks.",
      },
      {
        question: "What if we already know what's broken?",
        answer:
          "Then the audit either confirms it with numbers you can act on, or it tells you the thing you were about to spend six figures fixing wasn't the constraint. Both are worth knowing first.",
      },
    ],
    motif: "surface",
  },
  {
    slug: "systems-design",
    number: "02",
    label: "Build",
    title: "Systems Design",
    summary:
      "Designing and installing the operating system that removes the constraint for good.",
    intro:
      "A diagnosis is not a fix. Systems Design is where the future-state operation gets drawn, built and run in parallel with the current one until the numbers hold — then handed over with the documentation and ownership to keep it running.",
    overview: [
      "We design the operation as a system: what runs without a human, what needs judgment, who owns each decision, and what happens when something falls outside the rules.",
      "The last part matters most. Systems fail at their exceptions, so we design the exception path first and build the happy path around it.",
    ],
    capabilities: [
      {
        title: "Future-state design",
        description:
          "The target operation drawn end to end, with owners, decision rights and service levels attached to each step.",
      },
      {
        title: "Workflow implementation",
        description:
          "We build it — integrations, automations, interfaces — against your existing stack rather than replacing it.",
      },
      {
        title: "Exception design",
        description:
          "Edge cases route to a named human with context attached, instead of failing silently or stalling the queue.",
      },
      {
        title: "Instrumentation",
        description:
          "Every system ships with the dashboard that shows whether it's still working, so decay surfaces early.",
      },
    ],
    deliverables: [
      "Future-state system design and decision-rights map",
      "Implemented workflows running in production",
      "Operating dashboard and alerting",
      "Handover documentation and team training",
    ],
    whoItsFor: [
      "Teams with a diagnosis and no capacity to execute it",
      "Operations running critical work across disconnected tools",
      "Businesses that need throughput to grow faster than headcount",
    ],
    faq: [
      {
        question: "Do you replace our existing tools?",
        answer:
          "Rarely. Replacing a stack is expensive and usually unnecessary — most constraints live in the handoffs between tools, not the tools themselves.",
      },
      {
        question: "Who owns the system afterwards?",
        answer:
          "Your team. We hand over documentation, train a named owner, and stay available on a support arrangement — but nothing we build should require us to keep running.",
      },
    ],
    motif: "facade",
  },
  {
    slug: "organizational-alignment",
    number: "03",
    label: "Embed",
    title: "Organizational Alignment",
    summary:
      "Making the new operating model survive contact with the organisation that has to run it.",
    intro:
      "Most operational change fails after go-live, when the system meets the incentives, reporting lines and habits that produced the old one. Alignment is the work of making the new model the path of least resistance.",
    overview: [
      "A system that requires people to act against their own incentives will lose, every time. So we look at what the organisation actually rewards, who owns which decision, and where accountability is ambiguous enough to be avoidable.",
      "This is the least technical and most decisive part of the work. It is also the part most consultancies leave to the client.",
    ],
    capabilities: [
      {
        title: "Decision-rights mapping",
        description:
          "Who decides, who's consulted, who's merely informed — written down, so escalation stops being a personality contest.",
      },
      {
        title: "Operating cadence",
        description:
          "The meeting and review rhythm that keeps the system honest, sized to the business rather than inherited from one.",
      },
      {
        title: "Role and accountability design",
        description:
          "Clear ownership for each part of the operation, including the parts nobody currently owns.",
      },
      {
        title: "Change enablement",
        description:
          "Training, documentation and the internal case for why the new way is better, built with the people who have to live it.",
      },
    ],
    deliverables: [
      "Decision-rights and accountability map",
      "Operating cadence and review structure",
      "Role definitions for the new model",
      "Enablement materials and rollout plan",
    ],
    whoItsFor: [
      "Businesses where a good process keeps losing to old habits",
      "Leadership teams with overlapping or ambiguous ownership",
      "Organisations that have implemented change and watched it decay",
    ],
    faq: [
      {
        question: "Is this change management?",
        answer:
          "Narrower and more concrete. We're not running a culture programme — we're fixing the specific incentives, decision rights and cadence that determine whether the new operating model holds.",
      },
      {
        question: "Can this run without the other engagements?",
        answer:
          "Yes, if you already have a system that works on paper but keeps losing in practice. That's usually an alignment problem, not a design one.",
      },
    ],
    motif: "colonnade",
  },
];

/** All service pages share the engagement arc. */
export const serviceProcess = processSteps;

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
