export type CaseStudy = {
  slug: string;
  industry: string;
  title: string;
  result: string;
  challenge: string;
  approach: string;
  architecture: string[];
  implementation: string;
  results: { metric: string; label: string }[];
  technology: string[];
  testimonial: { quote: string; name: string; role: string };
  isIllustrative: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "administrative-workload-healthcare",
    industry: "Healthcare",
    title: "Cutting administrative workload by 41% through intelligent workflow automation",
    result: "41% reduction in administrative hours across two clinics",
    challenge:
      "A multi-location outpatient practice was losing clinical hours to intake paperwork, insurance verification, and appointment follow-up — all handled manually by front-desk staff already stretched thin.",
    approach:
      "We mapped every administrative step from first contact to billing, then rebuilt the intake and verification process as an automated pipeline that runs before a patient ever reaches the front desk.",
    architecture: [
      "Automated intake form processing with structured data extraction",
      "Real-time insurance eligibility checks",
      "Automated appointment reminders and rescheduling",
      "Exception queue for anything requiring human review",
    ],
    implementation:
      "The system was rolled out clinic by clinic over six weeks, with front-desk staff trained on the exception workflow before full handover.",
    results: [
      { metric: "41%", label: "Reduction in admin hours" },
      { metric: "2.3x", label: "Faster patient intake" },
      { metric: "18%", label: "Fewer scheduling errors" },
    ],
    technology: ["Workflow automation", "Custom intake forms", "EHR integration", "SMS automation"],
    testimonial: {
      quote:
        "Our front desk used to spend the first two hours of every day just catching up on paperwork. Now that time goes to patients.",
      name: "Practice Operations Director",
      role: "Outpatient Healthcare Group",
    },
    isIllustrative: true,
  },
  {
    slug: "inbound-qualification-real-estate",
    industry: "Real Estate",
    title: "Turning inbound enquiries into an automated qualification pipeline",
    result: "3.2x faster lead response, 28% more qualified appointments",
    challenge:
      "A regional real estate group was generating strong lead volume through paid ads and referrals but responding inconsistently — some leads waited days for a callback.",
    approach:
      "We built an automated qualification layer in front of the sales team: every enquiry is contacted within minutes, qualified against clear criteria, and routed to the right agent with full context attached.",
    architecture: [
      "Unified lead capture across web, ads and referral forms",
      "Automated qualification via conversational scoring",
      "CRM routing based on territory and agent capacity",
      "Follow-up sequencing for unqualified leads",
    ],
    implementation:
      "Deployed alongside the existing CRM with no disruption to the sales team's day-to-day tools — automation runs upstream of the pipeline they already use.",
    results: [
      { metric: "3.2x", label: "Faster lead response" },
      { metric: "28%", label: "More qualified appointments" },
      { metric: "0", label: "Leads left uncontacted" },
    ],
    technology: ["CRM automation", "Lead scoring", "SMS & email sequencing", "Calendar integration"],
    testimonial: {
      quote:
        "We stopped losing deals to speed. Every lead gets a response in minutes now, at any hour.",
      name: "Managing Broker",
      role: "Regional Real Estate Group",
    },
    isIllustrative: true,
  },
  {
    slug: "reporting-automation-professional-services",
    industry: "Professional Services",
    title: "Reducing manual reporting from several hours to minutes",
    result: "Weekly reporting cycle cut from 6 hours to 12 minutes",
    challenge:
      "A consulting firm's account managers spent a full day each week manually compiling client reports from six different tools before every status call.",
    approach:
      "We built a reporting system that pulls live data from every source automatically and assembles client-ready reports on a schedule, with account managers reviewing rather than building.",
    architecture: [
      "Automated data pulls from project, billing and analytics tools",
      "Templated report generation with client-specific branding",
      "Scheduled delivery ahead of standing client calls",
      "Internal dashboard for account-level visibility",
    ],
    implementation:
      "Built and tested against three pilot accounts before rolling out firm-wide, with account managers involved in template design from the start.",
    results: [
      { metric: "6hrs → 12min", label: "Weekly reporting time" },
      { metric: "100%", label: "On-time report delivery" },
      { metric: "5", label: "Tools unified into one view" },
    ],
    technology: ["Data integration", "Automated reporting", "Internal dashboard", "API connections"],
    testimonial: {
      quote:
        "Report day used to be dreaded. Now it's a five-minute review instead of a lost afternoon.",
      name: "Head of Client Services",
      role: "Professional Services Firm",
    },
    isIllustrative: true,
  },
];

export const getCaseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
