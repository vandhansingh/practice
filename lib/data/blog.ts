import type { ImageSlot } from "@/components/visuals/BrandImage";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  slot: ImageSlot;
  body: { heading?: string; paragraphs: string[] }[];
};

export const categories = ["All", "Design", "Build", "Growth"];

export const blogPosts: BlogPost[] = [
  {
    slug: "your-website-is-not-a-brochure",
    title: "Your website is not a brochure",
    excerpt:
      "The most expensive mistake in a redesign is treating the site as something to look at rather than something that has a job.",
    category: "Design",
    date: "2026-07-22",
    readTime: "6 min read",
    featured: true,
    slot: "wireframes",
    body: [
      {
        paragraphs: [
          "Most redesigns start with a look. Someone shares a site they admire, the team agrees it feels more like them, and the project quietly becomes an exercise in matching a mood.",
          "The trouble is that a website is not decoration. It is the one asset you own outright, working every hour, and the only honest measure of it is whether the right person can find what they came for and act on it.",
        ],
      },
      {
        heading: "Start from the job, not the layout",
        paragraphs: [
          "Before any design, write down what the site has to do, in order of value. For most businesses the list is short: help a qualified visitor understand what you do, prove you can do it, and make starting a conversation obvious.",
          "Once that list exists, most design arguments resolve themselves. A layout is not better because it is more interesting — it is better because it moves someone further down that list.",
        ],
      },
      {
        heading: "Speed is a design decision",
        paragraphs: [
          "Nothing undermines a beautiful site faster than a six-second load on a phone. Performance is not an engineering afterthought; it is a design constraint that shapes how much imagery a page can carry.",
          "Treat it as part of the brief and it stops being a fight at the end of the project.",
        ],
      },
    ],
  },
  {
    slug: "what-a-brand-is-when-you-remove-the-logo",
    title: "What a brand is once you remove the logo",
    excerpt:
      "If your identity cannot tell a writer how to sound or a designer what to do next week, it is a logo — not a brand.",
    category: "Design",
    date: "2026-06-11",
    readTime: "5 min read",
    slot: "stone",
    body: [
      {
        paragraphs: [
          "Plenty of companies have a logo, a colour and no brand. The test is simple: hand your guidelines to someone new and ask them to produce something. If they cannot, you have a mark and a hope.",
          "A brand system answers the next question. What does this sound like? How does a page get laid out? What do we never do?",
        ],
      },
      {
        heading: "Rules are a kindness",
        paragraphs: [
          "Designers sometimes resist guidelines as a constraint on expression. In practice the opposite is true — clear rules remove the arguments nobody enjoys and leave energy for the work that matters.",
          "The best brand books are short, specific and full of examples rather than adjectives.",
        ],
      },
    ],
  },
  {
    slug: "seo-that-still-works-in-two-years",
    title: "SEO that still works in two years",
    excerpt:
      "The tactics that survive are the boring ones. Here is the order we work in, and why the sequence matters more than the effort.",
    category: "Growth",
    date: "2026-05-04",
    readTime: "7 min read",
    slot: "skyline",
    body: [
      {
        paragraphs: [
          "Search rewards patience. Almost everything that produced a fast result in the last decade has since been penalised, while the unglamorous work has kept compounding.",
          "The sequence matters more than the effort: technical health first, then structure and content, then authority. Each stage makes the next worth doing.",
        ],
      },
      {
        heading: "Fix the base before publishing",
        paragraphs: [
          "Publishing into a site that crawls badly is pouring water into a leaking bucket. Crawlability, speed and duplication are dull to fix and cap everything above them.",
          "Once the base is sound, content earns its keep — and only then does earning links make sense.",
        ],
      },
    ],
  },
  {
    slug: "how-we-quote-and-why-it-is-fixed",
    title: "How we quote, and why it is fixed",
    excerpt:
      "Hourly billing rewards the wrong things. Here is how we scope so the number you hear first is the number you pay.",
    category: "Build",
    date: "2026-03-19",
    readTime: "4 min read",
    slot: "blocks",
    body: [
      {
        paragraphs: [
          "Hourly billing puts the client and the agency on opposite sides: every hour we spend is a cost to you and revenue to us. That is a bad way to start a relationship.",
          "So we scope properly up front and quote a fixed number. If we underestimate something we should have anticipated, that is ours to absorb — which is a strong incentive to scope carefully.",
        ],
      },
    ],
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const featuredPost = () => blogPosts.find((p) => p.featured) ?? blogPosts[0];
export const otherPosts = () => blogPosts.filter((p) => !p.featured);
