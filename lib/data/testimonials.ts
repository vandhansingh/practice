export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They asked better questions than anyone we spoke to, and the answers changed the brief. The site we ended up with is not the one we asked for — it is the one we needed.",
    name: "Managing Director",
    role: "Managing Director",
    company: "Regional design-build contractor",
  },
  {
    quote:
      "What stood out was the honesty. They talked us out of two things we wanted to buy, which is not how agency conversations usually go.",
    name: "Group Practice Manager",
    role: "Group Practice Manager",
    company: "Outpatient clinic group",
  },
  {
    quote:
      "Six months on, our team still runs the site without calling them. That was the promise, and it is the part most agencies quietly skip.",
    name: "Head of Ecommerce",
    role: "Head of Ecommerce",
    company: "Industrial supply distributor",
  },
];
