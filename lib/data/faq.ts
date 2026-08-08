export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "How does an engagement begin?",
    answer:
      "With a call, then a short scoping conversation with the people who run the operation. If there's a fit we propose a fixed-scope audit. We don't run long sales processes — you'll know within two conversations.",
  },
  {
    question: "How long does an engagement take?",
    answer:
      "An Operations Audit is six weeks. Systems Design typically runs eight to fourteen weeks depending on scope. Alignment work is usually concurrent. You'll get specific dates before anything is signed, not a range.",
  },
  {
    question: "Do you work with our existing systems?",
    answer:
      "Almost always. Most constraints live in the handoffs between tools rather than in the tools themselves, so replacing a stack is usually expensive and beside the point.",
  },
  {
    question: "Do we need internal technical capacity?",
    answer:
      "No. We build and implement, then hand over with documentation and a trained owner. Nothing we install should require us to keep it running.",
  },
  {
    question: "Who actually does the work?",
    answer:
      "The partner who scoped your engagement. We stay deliberately small and take on fewer clients rather than staffing engagements with people you've never met.",
  },
  {
    question: "What happens after go-live?",
    answer:
      "We run a parallel period until the numbers hold, then stay on a review cadence. Systems decay quietly, so the optimise phase is where a lot of the value is protected.",
  },
  {
    question: "What if the audit says our problem is something else?",
    answer:
      "Then it says so. A diagnosis you can act on independently is the deliverable — including when it means the expensive project you were about to approve wasn't the answer.",
  },
];
