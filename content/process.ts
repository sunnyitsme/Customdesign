/**
 * How Guide works.
 *
 * The migration pack records a six-phase page at /gfs-how-we-work — About You,
 * Goals & Ambitions, Analysis, Personal Financial Plan, Implementation, Review
 * — and flags that it "contains investment-planning language that should be
 * compliance-reviewed before reuse". That page is also unlinked from the
 * current navigation.
 *
 * The four steps below deliberately DO NOT reproduce that framing. There is no
 * "personal financial plan", no analysis-of-goals language, and nothing that
 * reads as investment advice — Guide's documented proposition is mortgages,
 * property finance, protection, and wills and estate planning.
 *
 * The descriptions state what the steps mean in plain terms and claim no
 * service level, timescale or outcome. The wording still needs firm approval:
 * see content/pending.ts `process.copy`.
 */

export interface ProcessStep {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export const processSteps: readonly ProcessStep[] = [
  {
    index: "01",
    title: "Understand",
    description:
      "A conversation about the property, the timing and the circumstances behind them, before any product is discussed.",
  },
  {
    index: "02",
    title: "Advise",
    description:
      "A recommendation with the reasoning shown — what is being suggested, what it costs, and what the alternatives were.",
  },
  {
    index: "03",
    title: "Arrange",
    description:
      "The application handled through to completion, with the lender, solicitor and other parties coordinated.",
  },
  {
    index: "04",
    title: "Support",
    description:
      "Contact kept after completion, so a rate ending or a change in circumstances is a conversation rather than a scramble.",
  },
];
