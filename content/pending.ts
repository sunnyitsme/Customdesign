/**
 * Registry of every unapproved placeholder in the build.
 *
 * This exists so missing content is tracked in code rather than in someone's
 * memory. `scripts/check-pending.mjs` reads it: it always prints a prominent
 * report, and exits non-zero under GUIDE_STRICT_CONTENT=1 so a launch build
 * cannot ship unresolved critical placeholders.
 *
 * See docs/01-content-and-assets-required.md for the full brief to the firm.
 */

export type Blocks = "launch" | "review" | "later";
export type PendingStatus = "placeholder" | "approved";

export interface PendingItem {
  readonly id: string;
  /** What is missing. */
  readonly what: string;
  /** Who has to supply it. */
  readonly from: string;
  readonly blocks: Blocks;
  readonly status: PendingStatus;
}

export const pendingContent: readonly PendingItem[] = [
  {
    id: "hero.video",
    what: "London financial-district footage with confirmed ownership or licence, plus a poster still.",
    from: "Firm — see docs/01-content-and-assets-required.md §2",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "hero.copy",
    what: "Approved headline and supporting line. Positioning copy for a regulated firm needs sign-off.",
    from: "Firm / compliance",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "brand.identity",
    what: "Logo SVG, brand colour values, licensed typefaces. The current palette and type are provisional.",
    from: "Firm — see docs/02-decisions.md D-003",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "divisions.positioning",
    what: "Approved positioning line for each of the four divisions.",
    from: "Firm / compliance",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "photography",
    what: "Architectural, London, interior and client-meeting photography, owned or licensed.",
    from: "Firm — see docs/01-content-and-assets-required.md §12",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "conflicts.contact",
    what: "Address, email and office count conflict between the public site and the legal PDFs.",
    from: "Firm — see docs/02-decisions.md D-006",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "stats.figures",
    what: "Every credibility figure: value, what it measures, source, as-at date, approver. No statistic exists in the source material.",
    from: "Firm / compliance — published figures are financial promotions",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "providers.list",
    what: "Approved lender and provider list, logo files, and written permission to display each mark. Plus approved relationship wording.",
    from: "Firm — the pack records a logo section but not its contents",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "team.current",
    what: "Confirmation the four named advisers are current, plus approved roles, verified qualifications and portrait photography. /our_team is unlinked from navigation and may be stale.",
    from: "Firm",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "cases.approved",
    what: "Case studies with scenario, action, outcome and compliance sign-off, plus confirmation Guide may publish past outcomes at all. No case content exists on the current site.",
    from: "Firm / compliance",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "reviews.approved",
    what: "Testimonial text from /testimonials, permission to keep reviewer names, and confirmation of any Google or Trustpilot profiles.",
    from: "Firm / compliance — testimonials are a financial promotion consideration",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "process.copy",
    what: "Approved wording for the four-step process. The existing six-phase page carries investment-planning language flagged for compliance review.",
    from: "Firm / compliance",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "insights.articles",
    what: "At least three approved articles, or a decision to launch with the section hidden. The current site has no insights section.",
    from: "Firm",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "about.copy",
    what: "Approved About headline and positioning statement.",
    from: "Firm / compliance",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "footer.regulatory",
    what: "Verbatim approved regulatory footer wording for all seven topics, and whether the footer leads with Asset Guide Limited or Guide Financial Services.",
    from: "Firm / compliance",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "footer.legalPages",
    what: "Destinations for Cookies, Complaints and Accessibility. None exist in the migration pack.",
    from: "Firm",
    blocks: "review",
    status: "placeholder",
  },
];

export const unresolved = (): readonly PendingItem[] =>
  pendingContent.filter((item) => item.status === "placeholder");

export const unresolvedBlocking = (): readonly PendingItem[] =>
  unresolved().filter((item) => item.blocks === "launch");
