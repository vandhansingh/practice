export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We stopped treating automation as a collection of tools and finally built a system around how our team actually works.",
    name: "Priya Nandan",
    role: "COO",
    company: "Outpatient Healthcare Group",
  },
  {
    quote:
      "Halyard didn't sell us on AI. They asked where our week actually went, then quietly removed the worst parts of it.",
    name: "Marcus Webb",
    role: "Managing Broker",
    company: "Regional Real Estate Group",
  },
  {
    quote:
      "The system just runs. That's the whole review — we don't think about it anymore, which is exactly the point.",
    name: "Elena Choi",
    role: "Head of Client Services",
    company: "Professional Services Firm",
  },
];
