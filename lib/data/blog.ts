export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "identifying-what-to-automate-first",
    title: "How to identify what to automate first",
    excerpt:
      "Most businesses automate the wrong thing first. Here's the framework we use to find the highest-leverage process in any operation.",
    category: "Strategy",
    date: "2026-06-02",
    readTime: "6 min read",
    content: [
      "The instinct is to automate whatever is most annoying. That's usually the wrong place to start.",
      "The right question isn't 'what's frustrating,' it's 'what's repeated, rules-based, and expensive when it's slow.' Those three conditions — repetition, clear rules, and a real cost to delay — are what make a process worth automating first.",
      "Start by mapping every process that touches a customer or a dollar. For each one, ask how often it happens, how much judgment it actually requires, and what it costs the business when it's slow or inconsistent. The process with the highest score across all three is where you start — not the one that's loudest in the team Slack channel.",
    ],
  },
  {
    slug: "why-automation-projects-stall",
    title: "Why most automation projects stall after launch",
    excerpt:
      "The build isn't the hard part. Here's what actually determines whether a system keeps running six months later.",
    category: "Operations",
    date: "2026-05-14",
    readTime: "5 min read",
    content: [
      "Automation projects rarely fail at launch. They fail quietly, three or four months later, when nobody owns the system anymore.",
      "The fix isn't more documentation — it's a named owner, a monitoring dashboard that surfaces failures instead of hiding them, and a scheduled review cadence. Systems that last have someone whose job includes watching them.",
    ],
  },
  {
    slug: "voice-agents-vs-chatbots",
    title: "Voice agents aren't chatbots with a microphone",
    excerpt:
      "Why conversation design for phone calls requires a completely different approach than text-based support.",
    category: "AI Voice",
    date: "2026-04-22",
    readTime: "7 min read",
    content: [
      "Phone conversations don't have a retry button. A caller who gets confused doesn't scroll back up to reread — they hang up.",
      "That changes everything about how you design the flow: shorter turns, explicit confirmation of what was heard, and a low-friction path to a human the moment the conversation leaves the agent's depth.",
    ],
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
