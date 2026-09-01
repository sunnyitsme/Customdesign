/**
 * Client reviews — MANUALLY MANAGED.
 *
 * No Google API is wired up and none should be: not the Business Profile API,
 * not the Places API, no OAuth, no live sync. Reviews are entered by hand.
 *
 * ## The dataset is empty, and that is not an oversight
 *
 * The migration pack records that guidefs.co.uk/testimonials holds four pages
 * of named client testimonials, but it does NOT contain their text — no
 * quotation, no reviewer name, no rating, and nothing about a Google listing.
 * Nothing has been supplied since. So `reviews` is empty rather than populated
 * with plausible-looking entries.
 *
 * Writing a review that a client did not write is fabricating a named person's
 * words about a regulated firm. It is the single worst thing this file could
 * do, so the array below stays empty until real reviews are pasted in.
 *
 * ## Adding reviews
 *
 * Copy each one from the verified Guide Financial Services Google listing.
 * Reproduce the wording EXACTLY: do not correct spelling, fix grammar,
 * re-punctuate, tidy capitalisation, shorten, or merge two reviews. If a review
 * is too long for the panel it is still entered in full — the design flexes,
 * the client's words do not. Copy the star rating as given; never round it,
 * infer it from tone, or default it to five.
 *
 *   {
 *     id: "google-2024-03-a-smith",
 *     reviewerName: "A. Smith",
 *     reviewText: "…exactly as published…",
 *     rating: 5,
 *     source: "Google",
 *     reviewDate: "2024-03-14",
 *     displayOrder: 1,
 *     featured: true,
 *   },
 *
 * Two things still need confirming before any of this is published: permission
 * to reproduce reviewer names as they appear, and compliance sign-off, because
 * testimonials on a regulated firm's site are a financial promotion
 * consideration. Tracked as `reviews.approved` in content/pending.ts.
 *
 * ## Payload
 *
 * The field names below are the intended Payload Reviews collection fields, so
 * this file becomes a seed and `ReviewsMarquee` keeps its props unchanged.
 */

export interface Review {
  /** Stable and unique. Used as the React key — see the guard below. */
  readonly id: string;
  /** Exactly as published on the listing. */
  readonly reviewerName: string;
  /** Verbatim. Never edited, corrected or shortened. */
  readonly reviewText: string;
  /** 1-5, exactly as given. */
  readonly rating: number;
  readonly source: "Google";
  /** ISO 8601 (YYYY-MM-DD). Omit when the listing shows only "3 months ago". */
  readonly reviewDate?: string;
  /** Direct link to the review, where one exists. */
  readonly sourceUrl?: string;
  /** Ascending. Controls the order in the marquee. */
  readonly displayOrder: number;
  readonly featured: boolean;
}

/**
 * Genuine reviews, entered by hand.
 *
 * COUNT: 0. None has been supplied. See the note above before adding any.
 */
export const reviews: readonly Review[] = [];

/**
 * Aggregate figures from the Google listing — MANUALLY MAINTAINED.
 *
 * These are the figures the listing was reported to show. They are NOT
 * published while `verified` is false: an aggregate rating and a review count
 * are claims about the firm, and a stale or unchecked one is exactly the sort
 * of number a regulator reads as a financial promotion.
 *
 * To publish: check the live listing, set the real values, set `verified` to
 * true, and record the date checked and the profile URL. Re-check it whenever
 * the count is likely to have moved — nothing here updates itself.
 */
export interface GoogleReviewSummary {
  readonly rating: number;
  readonly reviewCount: number;
  /** False until a person has checked the live listing. Gates display. */
  readonly verified: boolean;
  /** ISO 8601 date the figures were last checked. */
  readonly lastVerified: string | null;
  /** The public listing these figures came from. */
  readonly profileUrl: string | null;
}

export const googleReviewSummary: GoogleReviewSummary = {
  rating: 5.0,
  reviewCount: 41,
  verified: false,
  lastVerified: null,
  profileUrl: null,
};

/** Reviews in display order. The single ordering rule for every consumer. */
export const orderedReviews = (): readonly Review[] =>
  [...reviews].sort((a, b) => a.displayOrder - b.displayOrder);

/**
 * Duplicate ids are a paste-in error, not a runtime condition.
 *
 * Reviews are copied by hand, which makes a repeated id likely — and it would
 * surface as React silently rendering one panel and dropping another, plus a
 * duplicated key inside the marquee. Failing the build instead means the person
 * pasting finds out immediately.
 */
const duplicateIds = reviews
  .map((review) => review.id)
  .filter((id, index, all) => all.indexOf(id) !== index);

if (duplicateIds.length > 0) {
  throw new Error(
    `content/reviews.ts: duplicate review id(s): ${[...new Set(duplicateIds)].join(", ")}`,
  );
}
