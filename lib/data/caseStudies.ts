export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  /** Short outcome line for cards. */
  outcome: string;
  client: string;
  overview: string;
  challenge: string[];
  approach: string[];
  implementation: string[];
  results: { metric: string; label: string }[];
  services: string[];
  testimonial: { quote: string; name: string; role: string };
  motif: "facade" | "colonnade" | "interior" | "stair" | "surface";
  tone: "dusk" | "night" | "sand" | "stone";
  /** Figures are composites built from patterns across engagements. */
  illustrative: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "freight-scheduling-constraint",
    category: "Logistics",
    title: "Removing the scheduling constraint from a 40-depot freight network",
    outcome: "Depot idle time down 34%, same fleet, same headcount",
    client: "National freight operator, 40 depots",
    overview:
      "A freight network had added depots faster than it had added coordination. Utilisation looked acceptable in aggregate and terrible in detail.",
    challenge: [
      "Scheduling ran depot by depot, each optimising its own fleet with no view of the network. Loads that could have been consolidated across two neighbouring depots were run separately, and drivers waited on decisions that sat with a regional manager in a different time zone.",
      "Leadership had approved a fleet expansion to solve it. The audit found the fleet wasn't the constraint — decision latency was.",
    ],
    approach: [
      "We mapped every load from booking to delivery across six representative depots and measured where time was actually lost. 71% of avoidable delay sat in two places: waiting for consolidation decisions, and re-planning after late changes.",
      "Rather than expand the fleet, we designed a network-level scheduling layer with the consolidation decision automated against explicit rules, and exceptions routed to a duty coordinator with full context.",
    ],
    implementation: [
      "Built the scheduling layer over the existing transport management system rather than replacing it, so depots kept the tooling they knew.",
      "Ran it in parallel across six depots for nine weeks, comparing decisions against the manual process before extending to the full network.",
      "Handed over to a new network coordination function with the dashboard, escalation rules and training in place.",
    ],
    results: [
      { metric: "34%", label: "Reduction in depot idle time" },
      { metric: "£4.1M", label: "Fleet expansion deferred" },
      { metric: "9 min", label: "Median consolidation decision, from 4 hrs" },
    ],
    services: ["Operations Audit", "Systems Design"],
    testimonial: {
      quote:
        "We were about to spend four million on trucks. The real problem was that nobody could make a decision before the truck had already left.",
      name: "Operations Director",
      role: "National freight operator",
    },
    motif: "facade",
    tone: "dusk",
    illustrative: true,
  },
  {
    slug: "distribution-order-flow",
    category: "Distribution",
    title: "Rebuilding order flow for a distributor outgrowing its own process",
    outcome: "Order-to-dispatch cut from 3 days to 6 hours",
    client: "B2B distributor, 1,800 SKUs",
    overview:
      "Revenue had tripled in four years. The order process hadn't changed since it was designed for a business a third of the size.",
    challenge: [
      "Orders arrived by email, phone and portal, then were re-keyed into three systems by hand. Every order touched at least four people, and nobody could say where a given order was without asking.",
      "The team had absorbed the growth through overtime. Error rates were climbing and the best people were leaving.",
    ],
    approach: [
      "We followed 200 orders end to end and found the median order spent 91% of its life waiting, not being worked on. The constraint wasn't capacity — it was the number of handoffs and the absence of a single record.",
      "We designed one order pipeline with a single source of truth, automated re-keying entirely, and reduced the process from four owners to one with clear exception routing.",
    ],
    implementation: [
      "Consolidated intake so every channel wrote to one record, removing manual re-entry across three systems.",
      "Automated credit and stock checks that had previously been sequential manual steps.",
      "Rolled out by product line over eleven weeks, retiring the old process only once each line's numbers held.",
    ],
    results: [
      { metric: "6 hrs", label: "Order-to-dispatch, from 3 days" },
      { metric: "78%", label: "Fewer order entry errors" },
      { metric: "0", label: "Additional headcount required" },
    ],
    services: ["Operations Audit", "Systems Design", "Organizational Alignment"],
    testimonial: {
      quote:
        "The honest finding was that we'd been paying overtime to compensate for a process problem for two years. That was uncomfortable and completely correct.",
      name: "Managing Director",
      role: "B2B distributor",
    },
    motif: "interior",
    tone: "stone",
    illustrative: true,
  },
  {
    slug: "construction-programme-alignment",
    category: "Construction",
    title: "Aligning a contractor's programme controls across eleven live sites",
    outcome: "Programme slippage reporting from 3 weeks to same-day",
    client: "Regional main contractor, £180M turnover",
    overview:
      "Eleven sites, eleven ways of reporting progress. By the time head office saw a problem, it had been true for three weeks.",
    challenge: [
      "Each site manager reported progress in their own format on their own cadence. Consolidation was a manual monthly exercise, so head office was always steering on data that had already expired.",
      "The systems weren't the issue — a reporting standard existed. It just lost consistently to the pressures of running a live site.",
    ],
    approach: [
      "This was an alignment problem, not a design one. We found reporting was genuinely burdensome and produced nothing the site manager could use, so it was rationally deprioritised.",
      "We rebuilt reporting so it fed the site manager's own decisions first and head office's second — making the useful thing and the required thing the same action.",
    ],
    implementation: [
      "Cut the reported fields from 40 to 11, keeping only those that changed a decision.",
      "Made the site view the primary interface, with consolidation as an automatic by-product rather than a separate task.",
      "Set a weekly cadence with defined decision rights, so escalation stopped depending on who knew whom.",
    ],
    results: [
      { metric: "Same-day", label: "Slippage visibility, from 3 weeks" },
      { metric: "11 → 11", label: "Sites on one reporting standard" },
      { metric: "72%", label: "Less time spent on reporting per site" },
    ],
    services: ["Organizational Alignment"],
    testimonial: {
      quote:
        "They worked out that our reporting was ignored because it was useless to the people filling it in. Fixing that fixed the data problem.",
      name: "Commercial Director",
      role: "Regional main contractor",
    },
    motif: "stair",
    tone: "night",
    illustrative: true,
  },
];

export const getCaseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
