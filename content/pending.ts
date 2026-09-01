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
    what: "Vector (SVG) master of the logo, brand colour values, licensed typefaces. The official PNG lockup is now in use, but a PNG cannot scale losslessly and carries no reversed variant. The palette and typefaces remain provisional.",
    from: "Firm — see docs/02-decisions.md D-003 and D-015",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "brand.logoReversed",
    what: "A reversed (light) version of the logo for dark grounds. The supplied artwork is black and measures 1.21:1 on the navy sections, so every dark placement currently sits on a light backing plaque. A reversed master would remove the plaque entirely.",
    from: "Firm",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "brand.favicon",
    what: "A standalone icon/favicon asset (ideally SVG plus a 512px PNG). Not derived here: cropping the symbol out of the lockup would be inventing an icon the firm has not approved. The site currently ships no favicon.",
    from: "Firm",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "brand.paletteAlignment",
    what: "Confirmation of how the logo's colours relate to the site palette. The approved lockup is black plus orange #E74423; the approved site palette is navy/royal blue with a gold accent. They share no colour. Neither was changed to suit the other — the firm should confirm which is authoritative.",
    from: "Firm — see docs/02-decisions.md D-015",
    blocks: "review",
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
    what: "Architectural, London, interior and client-meeting photography, owned or licensed, plus a licence record in docs/media-licences/ for each file. Every hero slot exists and is waiting for a correctly named file — see public/media/README.md.",
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
    what: "Approved lender and provider list, logo files, and written permission (or confirmed intermediary brand-usage rights) to display each mark, recorded in docs/media-licences/. Plus approved relationship wording. Marks stay hidden until permissionConfirmed is set in content/providers.ts.",
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
  {
    id: "service.intros",
    what: "An approved introduction for each of the 38 service and guide pages. Scope lines are derived from the migration pack; the introductions are not.",
    from: "Firm / compliance",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "service.compliance",
    what: "Compliance sign-off on the flagged topics per page: interest-only repayment strategy, Buy-to-Let regulation, debt consolidation, commercial mortgage regulation, later-life lending, trust and IHT wording, policy lapse warnings.",
    from: "Compliance",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "faqs.answers",
    what: "Answers for every FAQ across the four groups. Two legacy questions - indicative borrowing and typical completion timing - are carried with review notes rather than reproduced.",
    from: "Firm / compliance",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "legal.documents",
    what: "Verbatim privacy notice, terms of business, cookies policy, complaints procedure and accessibility statement. Legal wording is reproduced, never paraphrased.",
    from: "Firm / compliance",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "calculators.rates",
    what: "Stamp duty rates and thresholds per UK nation, and confirmation of whether any borrowing or affordability model may be published at all.",
    from: "Firm / compliance",
    blocks: "review",
    status: "placeholder",
  },
  {
    id: "contact.delivery",
    what: "CRM endpoint and credentials, Turnstile keys, and a defined retention policy. Until these exist the form validates but delivers nothing, and says so.",
    from: "Firm",
    blocks: "launch",
    status: "placeholder",
  },
  {
    id: "locations.copy",
    what: "Approved local copy, adviser details and map embeds for each office.",
    from: "Firm",
    blocks: "review",
    status: "placeholder",
  },
];

export const unresolved = (): readonly PendingItem[] =>
  pendingContent.filter((item) => item.status === "placeholder");

export const unresolvedBlocking = (): readonly PendingItem[] =>
  unresolved().filter((item) => item.blocks === "launch");
