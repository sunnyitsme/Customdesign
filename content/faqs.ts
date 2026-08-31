/**
 * Frequently asked questions.
 *
 * The legacy /faq page is documented as covering what a mortgage is, indicative
 * borrowing, mortgage types, ownership costs, overpayments and early repayment,
 * and typical application-to-completion timing.
 *
 * Two of those are not reproduced as-is:
 *
 *   - "indicative borrowing" implies a figure or multiple. None is documented,
 *     and publishing one would be an affordability claim.
 *   - "typical application-to-completion timing" implies a service-level
 *     expectation the firm has not confirmed.
 *
 * Both appear below as questions with null answers and a compliance note,
 * rather than being dropped silently or answered from guesswork.
 */
export interface Faq {
  readonly question: string;
  readonly answer: string | null;
  /** Why this needs review before publication, where relevant. */
  readonly note?: string;
}

export interface FaqGroup {
  readonly id: string;
  readonly title: string;
  readonly faqs: readonly Faq[];
}

export const faqGroups: readonly FaqGroup[] = [
  {
    id: "mortgages",
    title: "Mortgages",
    faqs: [
      { question: "What is a mortgage?", answer: null },
      {
        question: "How much could I borrow?",
        answer: null,
        note: "The legacy page carried indicative borrowing. Any figure or income multiple is an affordability claim and needs compliance sign-off.",
      },
      { question: "What types of mortgage are there?", answer: null },
      { question: "What are the costs of owning a property?", answer: null },
      {
        question: "Can I overpay, and are there early repayment charges?",
        answer: null,
      },
      {
        question: "How long does an application take?",
        answer: null,
        note: "The legacy page stated typical application-to-completion timing. That is a service-level expectation requiring firm confirmation.",
      },
    ],
  },
  {
    id: "property-finance",
    title: "Property finance",
    faqs: [
      { question: "What is bridging finance used for?", answer: null },
      { question: "How is development finance drawn down?", answer: null },
      { question: "What counts as a semi-commercial property?", answer: null },
      {
        question: "Is property finance regulated?",
        answer: null,
        note: "Commercial mortgages and most buy-to-let lending are not FCA regulated. Wording must come from compliance.",
      },
    ],
  },
  {
    id: "protection",
    title: "Protection",
    faqs: [
      {
        question:
          "What is the difference between life cover and critical illness cover?",
        answer: null,
      },
      { question: "How does income protection work?", answer: null },
      {
        question: "What happens if I stop paying premiums?",
        answer: null,
        note: "The policy lapse warning is required wording and must be approved.",
      },
      { question: "Should a policy be written in trust?", answer: null },
    ],
  },
  {
    id: "estate-planning",
    title: "Wills and estate planning",
    faqs: [
      {
        question: "What happens if I die without a will?",
        answer: null,
        note: "Intestacy rules differ across UK jurisdictions.",
      },
      { question: "What is a mirror will?", answer: null },
      {
        question: "When is a trust appropriate?",
        answer: null,
        note: "No inheritance tax, care-fee or asset-protection outcome may be asserted.",
      },
      { question: "How often should a will be reviewed?", answer: null },
    ],
  },
];
