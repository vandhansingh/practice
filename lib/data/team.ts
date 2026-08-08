export type TeamMember = {
  name: string;
  role: string;
  description: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Sam Ostrander",
    role: "Founder & Systems Director",
    description:
      "Twelve years building operational software before starting Halyard. Leads discovery on every engagement.",
    initials: "SO",
  },
  {
    name: "Dana Whitfield",
    role: "Head of Automation",
    description:
      "Designs the workflow architecture behind every automation build, from mapping to monitoring.",
    initials: "DW",
  },
  {
    name: "Theo Marsh",
    role: "Lead Engineer",
    description:
      "Builds and ships the integrations, agents and internal tools clients rely on daily.",
    initials: "TM",
  },
  {
    name: "Aisha Kader",
    role: "Client Strategy Lead",
    description:
      "Keeps every engagement anchored to a measurable business outcome, not just a technical one.",
    initials: "AK",
  },
];
