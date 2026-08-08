export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  motif: "facade" | "colonnade" | "interior" | "stair" | "surface";
  tone: "dusk" | "night" | "sand" | "stone";
  body: { heading?: string; paragraphs: string[] }[];
};

export const categories = ["All", "Diagnosis", "Systems", "Organisation"];

export const blogPosts: BlogPost[] = [
  {
    slug: "the-constraint-is-rarely-where-you-think",
    title: "The constraint is rarely where the noise is",
    excerpt:
      "The loudest problem and the limiting problem are usually different problems. Here's how to tell them apart before committing capital to the wrong one.",
    category: "Diagnosis",
    date: "2026-07-14",
    readTime: "7 min read",
    featured: true,
    motif: "facade",
    tone: "dusk",
    body: [
      {
        paragraphs: [
          "Ask any team where the bottleneck is and you'll get a confident answer. Ask two teams and you'll get two confident answers, usually pointing at each other.",
          "This isn't dysfunction. People correctly identify where work is painful for them, and pain is a genuine signal — it's just not the same signal as throughput. The step that generates the most complaints is the step where people wait visibly. The step that governs output is often somewhere quiet, upstream, where a single decision sits in someone's inbox.",
        ],
      },
      {
        heading: "Measure waiting, not working",
        paragraphs: [
          "The most useful number in an operations diagnostic is the ratio of touch time to elapsed time. Take fifty units of work — orders, tickets, jobs, loads — and measure how long each took end to end, then how many minutes anyone actually spent on it.",
          "In most operations that haven't been deliberately designed, the answer lands somewhere between 5% and 15%. Work spends the overwhelming majority of its life waiting. Once you know that, hiring more people to do the working part becomes obviously the wrong lever.",
        ],
      },
      {
        heading: "Follow the exceptions",
        paragraphs: [
          "The second place to look is the exception path. Ask what percentage of work follows the standard process, and then watch what happens to the rest.",
          "Exceptions are where undesigned operations quietly lose their capacity. If 20% of cases fall outside the process and each one consumes a senior person for an hour, that is the constraint, regardless of how good the other 80% looks.",
        ],
      },
    ],
  },
  {
    slug: "why-good-processes-lose-to-old-habits",
    title: "Why a good process loses to an old habit",
    excerpt:
      "A system that asks people to act against their own incentives will lose every time. The fix is rarely more training.",
    category: "Organisation",
    date: "2026-06-02",
    readTime: "5 min read",
    motif: "colonnade",
    tone: "stone",
    body: [
      {
        paragraphs: [
          "Implementation is not the hard part. Six months later is the hard part, when the new process has quietly reverted and everyone is politely pretending otherwise.",
          "The usual explanation is resistance to change. The more useful explanation is that the new process asked people to do something that made their own week worse, and they rationally stopped.",
        ],
      },
      {
        heading: "Make the useful thing and the required thing the same action",
        paragraphs: [
          "Reporting is the clearest example. If a site manager fills in a form that produces nothing they can use, that form will be completed late, approximately, and last.",
          "Redesign it so the same input drives a decision they actually care about, and compliance stops being a discipline problem. You haven't motivated anyone — you've removed the conflict.",
        ],
      },
    ],
  },
  {
    slug: "design-the-exception-path-first",
    title: "Design the exception path first",
    excerpt:
      "Systems don't fail on the cases you planned for. Building the edge cases last is what makes automation brittle.",
    category: "Systems",
    date: "2026-04-28",
    readTime: "6 min read",
    motif: "interior",
    tone: "sand",
    body: [
      {
        paragraphs: [
          "The instinct when designing a workflow is to build the standard path and handle edge cases later. It's the wrong order, because the edge cases determine whether anyone trusts the system.",
          "One silent failure teaches a team to check the output manually forever. At that point you've added a system and kept the manual work — the worst of both.",
        ],
      },
      {
        heading: "Three rules that hold up",
        paragraphs: [
          "First, nothing fails silently. If a case can't be handled, it goes to a named person with enough context to act, not to a log nobody reads.",
          "Second, the exception queue is visible and has a service level. An exception path without a time bound is just a slower way to lose work.",
          "Third, every exception is a design input. If the same case appears fifty times, it isn't an exception any more — it's a branch you haven't built yet.",
        ],
      },
    ],
  },
  {
    slug: "what-a-diagnosis-should-cost-you",
    title: "What a diagnosis should cost you",
    excerpt:
      "On the economics of finding out you were about to fix the wrong thing.",
    category: "Diagnosis",
    date: "2026-03-11",
    readTime: "4 min read",
    motif: "surface",
    tone: "night",
    body: [
      {
        paragraphs: [
          "Diagnostic work is a hard sell because it produces a document rather than a system. It's worth buying anyway, for a straightforward reason: the cost of a wrong diagnosis is the entire cost of the project that follows it.",
          "A six-week audit that redirects a seven-figure programme has paid for itself many times before anyone has built anything.",
        ],
      },
    ],
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const featuredPost = () => blogPosts.find((p) => p.featured) ?? blogPosts[0];
export const otherPosts = () => blogPosts.filter((p) => !p.featured);
