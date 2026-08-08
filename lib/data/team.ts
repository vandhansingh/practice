export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Ruth Okonjo",
    role: "Founding Partner",
    bio: "Fifteen years in industrial operations before founding the practice. Leads diagnosis on every engagement.",
    initials: "RO",
  },
  {
    name: "Daniel Reiss",
    role: "Partner, Systems",
    bio: "Designs the future-state operating models and owns implementation quality end to end.",
    initials: "DR",
  },
  {
    name: "Mei Lundqvist",
    role: "Partner, Alignment",
    bio: "Works on decision rights, cadence and the organisational conditions that let a new system hold.",
    initials: "ML",
  },
  {
    name: "Tomas Ferreira",
    role: "Principal",
    bio: "Runs the audit workstream — measurement, instrumentation and the numbers behind each recommendation.",
    initials: "TF",
  },
];
