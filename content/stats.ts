/**
 * Credibility statistics.
 *
 * NO STATISTICS EXIST IN THE SOURCE MATERIAL. Not one figure in the migration
 * pack is a published metric, so every `value` below is null and renders as
 * [VERIFIED FIGURE REQUIRED].
 *
 * Each entry carries the question the firm has to answer, because a number
 * without a definition, a source and an as-at date cannot be published: figures
 * on a regulated firm's site are financial promotions and need sign-off.
 */

export interface Stat {
  readonly id: string;
  /** Approved figure. Null until verified and signed off. */
  readonly value: string | null;
  readonly label: string;
  /**
   * What exactly the figure would measure — the brief to the firm. Not
   * rendered: as body copy on the dark band it made the section read as
   * documentation rather than proof. It lives here and in the content gate.
   */
  readonly definition: string;
}

export const stats: readonly Stat[] = [
  {
    id: "established",
    value: null,
    label: "Years advising",
    definition:
      "Years since the firm began advising. Confirm the date this is measured from.",
  },
  {
    id: "finance-arranged",
    value: null,
    label: "Finance arranged",
    definition:
      "Total lending arranged, with the period it covers and the as-at date.",
  },
  {
    id: "clients",
    value: null,
    label: "Clients advised",
    definition:
      "Number of clients advised, with the counting basis and period.",
  },
  {
    id: "lenders",
    value: null,
    label: "Lenders & providers",
    definition:
      "Size of the lender and provider panel, and how panel membership is defined.",
  },
  {
    id: "offices",
    value: null,
    label: "UK offices",
    definition:
      "The company page names three offices and the footer lists four. Confirm the definitive count before publishing it as a figure.",
  },
];
