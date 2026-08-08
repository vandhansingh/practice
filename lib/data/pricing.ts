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
    name: "Operations Audit",
    positioning: "Start here if the constraint isn't yet named.",
    price: "From £28,000",
    priceNote: "Fixed fee, six weeks",
    idealFor:
      "Leadership teams who know throughput is being lost but disagree about where — or have fixed the symptom twice already.",
    included: [
      "Six weeks embedded in the operation",
      "Current-state process mapping",
      "Ranked constraint register with cost-of-delay",
      "Written diagnosis and recommended sequence",
      "Executive readout",
    ],
    duration: "6 weeks",
    cta: "Scope an audit",
  },
  {
    name: "Design & Install",
    positioning: "The full arc, from diagnosis to a system that runs.",
    price: "From £95,000",
    priceNote: "Fixed fee, scoped after audit",
    idealFor:
      "Businesses with a constraint they can name and no internal capacity to design and install the fix without stalling the day job.",
    included: [
      "Everything in the Operations Audit",
      "Future-state system design",
      "Implementation against your existing stack",
      "Operating dashboard and alerting",
      "Parallel-run period until numbers hold",
      "Handover documentation and training",
    ],
    duration: "14–20 weeks",
    cta: "Discuss an engagement",
    featured: true,
  },
  {
    name: "Retained Partnership",
    positioning: "For operations that need to keep changing.",
    price: "From £11,000",
    priceNote: "Per month, minimum six months",
    idealFor:
      "Multi-site or multi-entity businesses treating operational capability as an ongoing programme rather than a one-off project.",
    included: [
      "Standing partner access",
      "Quarterly operating reviews",
      "Rolling design and implementation capacity",
      "Alignment and cadence work",
      "Priority on new workstreams",
    ],
    duration: "Ongoing",
    cta: "Talk about a retainer",
  },
];

/** Row-by-row comparison shown beneath the engagement cards. */
export const comparison: { feature: string; values: [string, string, string] }[] = [
  { feature: "Embedded diagnostic", values: ["Yes", "Yes", "Ongoing"] },
  { feature: "Written diagnosis", values: ["Yes", "Yes", "Quarterly"] },
  { feature: "Future-state design", values: ["—", "Yes", "Yes"] },
  { feature: "Implementation", values: ["—", "Yes", "Rolling"] },
  { feature: "Operating dashboard", values: ["—", "Yes", "Yes"] },
  { feature: "Parallel-run period", values: ["—", "Yes", "Per workstream"] },
  { feature: "Alignment & cadence", values: ["—", "Included", "Included"] },
  { feature: "Post-launch review", values: ["—", "90 days", "Continuous"] },
  { feature: "Partner-led delivery", values: ["Yes", "Yes", "Yes"] },
];
