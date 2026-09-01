"use client";

import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MARQUEE_SPEED, Marquee } from "@/components/ui/Marquee";
import { PendingContent } from "@/components/ui/PendingContent";
import {
  googleReviewSummary,
  orderedReviews,
  type Review,
} from "@/content/reviews";

/** Empty-state slots, enough to show the strip's rhythm and panel proportions. */
const PLACEHOLDER_SLOTS = 6;

const PANEL =
  "flex h-full w-[19rem] flex-col border border-line bg-surface p-8 sm:w-[24rem] lg:w-[27rem]";

/**
 * Star rating.
 *
 * Drawn from the design system, not from a Google widget: the same accent the
 * rest of the page uses, at the same weight. Filled and empty stars are both
 * rendered so a four-star review reads as four out of five rather than as a
 * shorter row, and the whole glyph run is hidden from assistive technology in
 * favour of one plain sentence.
 */
function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <p className="m-0 flex items-center gap-2">
      <span aria-hidden="true" className="text-body-sm tracking-[0.2em]">
        <span className="text-accent">{"★".repeat(filled)}</span>
        <span className="text-line-strong">{"★".repeat(5 - filled)}</span>
      </span>
      <span className="sr-only">{rating} out of 5</span>
    </p>
  );
}

function ReviewPanel({ review }: { review: Review }) {
  return (
    <article className={PANEL}>
      <Stars rating={review.rating} />

      {/* Verbatim. `whitespace-pre-line` keeps a reviewer's own line breaks
          rather than reflowing their paragraphs into one block. */}
      <blockquote className="m-0 mt-6 flex-1">
        <p className="font-prose text-body-lg whitespace-pre-line text-ink-secondary">
          {review.reviewText}
        </p>
      </blockquote>

      <footer className="mt-8 border-t border-line pt-5">
        <p className="text-body-sm font-medium text-ink">
          {review.reviewerName}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 text-body-sm text-ink-tertiary">
          {/* Wording, not a badge. Reproducing Google's mark would need their
              permission and would pull the panel away from the Guide design. */}
          <span>Google Review</span>
          {review.reviewDate !== undefined && (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={review.reviewDate}>
                {new Date(review.reviewDate).toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </>
          )}
        </p>
      </footer>
    </article>
  );
}

function PlaceholderPanel() {
  return (
    <article className={PANEL}>
      <p className="m-0 text-eyebrow font-medium tracking-[0.14em] text-accent uppercase">
        Rating required
      </p>
      <blockquote className="m-0 mt-6 flex-1">
        <p className="font-prose text-body-lg text-ink-secondary">
          [APPROVED REVIEW REQUIRED]
        </p>
      </blockquote>
      <footer className="mt-8 border-t border-line pt-5">
        <p className="text-body-sm font-medium text-ink">
          [APPROVED REVIEW REQUIRED]
        </p>
        <p className="mt-1 text-body-sm text-ink-tertiary">Google Review</p>
      </footer>
    </article>
  );
}

/**
 * Client reviews.
 *
 * Wide panels rather than cards: a hairline, generous padding, and a comfortable
 * measure so a quotation can be read while it drifts.
 *
 * Manually managed. No Google API is wired up — no Business Profile API, no
 * Places API, no OAuth, no live sync — and none should be added. Reviews are
 * copied by hand into content/reviews.ts, verbatim.
 *
 * The dataset is empty until real reviews are supplied, so this renders labelled
 * placeholder panels at the identical size. Pasting reviews in is the whole
 * installation: no code changes here.
 *
 * Speed comes from MARQUEE_SPEED, shared with the lender strip. Both move
 * identically by design.
 */
export function ReviewsMarquee() {
  const reviews = orderedReviews();

  const panels =
    reviews.length > 0
      ? reviews.map((review) => (
          <ReviewPanel key={review.id} review={review} />
        ))
      : Array.from({ length: PLACEHOLDER_SLOTS }, (_, index) => (
          <PlaceholderPanel key={`slot-${index}`} />
        ));

  return (
    <section
      aria-labelledby="reviews-heading"
      className="border-t border-line py-[var(--section-md)]"
    >
      <Container>
        <DatumGrid>
          <Eyebrow>Reviews</Eyebrow>
          <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <h2
              id="reviews-heading"
              className="max-w-[19ch] text-display-2 font-medium text-balance"
            >
              What clients say.
            </h2>
            <div className="lg:pt-2">
              <p className="max-w-[42ch] text-body-lg text-ink-secondary">
                Published with the reviewer&rsquo;s permission and reviewed by
                compliance before it appears here.
              </p>
              {/* The aggregate is a claim about the firm, so it appears only
                  once someone has checked the live listing and said so in
                  content/reviews.ts. */}
              {googleReviewSummary.verified && (
                <p className="mt-4 flex flex-wrap items-center gap-x-3 text-body-sm text-ink-tertiary">
                  <Stars rating={googleReviewSummary.rating} />
                  <span>
                    {googleReviewSummary.rating.toFixed(1)} from{" "}
                    {googleReviewSummary.reviewCount} Google reviews
                  </span>
                </p>
              )}
            </div>
          </div>
        </DatumGrid>
      </Container>

      <PendingContent
        label={
          reviews.length > 0
            ? "reviews.approved — reviewer permission and compliance sign-off required before publication"
            : "reviews.approved — no review has been supplied yet. Paste genuine Google reviews into content/reviews.ts"
        }
        className="mt-12"
      >
        <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <Marquee
            items={panels}
            speed={MARQUEE_SPEED}
            ariaLabel="Client reviews"
            itemClassName="flex shrink-0 pr-6 lg:pr-8"
            className="px-[var(--gutter)]"
          />
        </div>
      </PendingContent>
    </section>
  );
}
