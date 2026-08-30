/**
 * Selected client cases.
 *
 * THE CURRENT SITE HAS NO CASE-STUDY CONTENT AT ALL. Nothing in the migration
 * pack describes a transaction, a figure or an outcome, so every field that
 * would carry one is null and renders as [APPROVED CASE STUDY REQUIRED].
 *
 * `discipline` is the only populated field, and it is drawn from Guide's
 * documented service lines — it says what kind of case would sit in the slot,
 * not that such a case was arranged.
 *
 * Before any of these can be filled: confirm whether Guide may publish past
 * case outcomes at all and under what wording, since past results in a
 * regulated context carry specific restrictions, and confirm anonymisation and
 * client consent for each.
 */

export interface CaseStudy {
  readonly id: string;
  /** The service line the slot belongs to. Documented in the pack. */
  readonly discipline: string;
  /** Headline figure, e.g. a facility size. Null until approved. */
  readonly figure: string | null;
  readonly figureLabel: string | null;
  /** Short editorial narrative. Null until approved. */
  readonly narrative: string | null;
  readonly image: { readonly src: string | null; readonly alt: string };
}

export const cases: readonly CaseStudy[] = [
  {
    id: "development-finance",
    discipline: "Development finance",
    figure: null,
    figureLabel: null,
    narrative: null,
    image: {
      src: null,
      alt: "Placeholder — development site photography required.",
    },
  },
  {
    id: "bridging",
    discipline: "Bridging finance",
    figure: null,
    figureLabel: null,
    narrative: null,
    image: { src: null, alt: "Placeholder — property photography required." },
  },
  {
    id: "portfolio",
    discipline: "Portfolio landlord finance",
    figure: null,
    figureLabel: null,
    narrative: null,
    image: {
      src: null,
      alt: "Placeholder — residential portfolio photography required.",
    },
  },
  {
    id: "high-value-residential",
    discipline: "High-value residential",
    figure: null,
    figureLabel: null,
    narrative: null,
    image: {
      src: null,
      alt: "Placeholder — residential architecture photography required.",
    },
  },
];
