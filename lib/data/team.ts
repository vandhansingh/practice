export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Micah Delaney",
    role: "Founder & Creative Director",
    bio: "Fifteen years in brand and product design. Leads positioning and art direction on every engagement.",
    initials: "MD",
  },
  {
    name: "Ruth Adeyemi",
    role: "Design Director",
    bio: "Owns the design system on every build, from first layout through to the handover documentation.",
    initials: "RA",
  },
  {
    name: "Josiah Park",
    role: "Lead Engineer",
    bio: "Builds what we design. Performance, accessibility and the CMS your team actually has to live with.",
    initials: "JP",
  },
  {
    name: "Hannah Vogel",
    role: "Strategy & Growth",
    bio: "Runs audits, roadmaps and the reporting that tells you plainly whether the work is paying.",
    initials: "HV",
  },
];
