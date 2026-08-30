/**
 * Client reviews.
 *
 * Reviews are manually managed. No Google or Trustpilot API is wired up, and
 * none should be added without confirming the firm has those profiles.
 *
 * The migration pack records that /testimonials holds four pages of named
 * client testimonials, but does NOT record their text. So no review text and no
 * reviewer name appears here — inventing either would be fabricating a client's
 * words. Every slot renders as [APPROVED REVIEW REQUIRED].
 *
 * Compliance: client testimonials on a regulated firm's website are a financial
 * promotion consideration and need review before republication, and permission
 * is needed to keep reviewer names as currently published.
 *
 * The shape matches the intended Payload fields so the source can be swapped
 * without touching the component.
 */

export type ReviewSource = "Google" | "Trustpilot" | "Direct testimonial";

export interface Review {
  readonly id: string;
  /** Payload: reviewerName. Null until approved. */
  readonly reviewerName: string | null;
  /** Payload: reviewText. Null until approved. */
  readonly reviewText: string | null;
  /** Payload: rating, 1-5. Null until approved — never inferred. */
  readonly rating: number | null;
  /** Payload: source. Null until the firm confirms which profiles exist. */
  readonly source: ReviewSource | null;
  /** Payload: reviewDate, ISO 8601. */
  readonly reviewDate: string | null;
  readonly sourceUrl: string | null;
  readonly featured: boolean;
  readonly displayOrder: number;
}

/** Placeholder slots, enough to show the marquee reading at a slow pace. */
export const reviews: readonly Review[] = Array.from(
  { length: 6 },
  (_, index) => ({
    id: `review-${index + 1}`,
    reviewerName: null,
    reviewText: null,
    rating: null,
    source: null,
    reviewDate: null,
    sourceUrl: null,
    featured: false,
    displayOrder: index + 1,
  }),
);
