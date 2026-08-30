"use client";

import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { PendingContent } from "@/components/ui/PendingContent";
import { reviews } from "@/content/reviews";

/**
 * Very slow — roughly a third of the lender marquee. Review text has to stay
 * readable while it moves, so this must not read as a ticker.
 */
const SPEED_PX_PER_SECOND = 14;

/**
 * Client reviews.
 *
 * Wide panels rather than cards: a hairline, generous padding, and a comfortable
 * measure so a quotation can be read at a glance while it drifts.
 *
 * Reviews are manually managed — no Google or Trustpilot API is wired up, and
 * none should be until the firm confirms those profiles exist. The migration
 * pack records four pages of named testimonials at /testimonials but not their
 * text, so no reviewer name, rating or quotation appears here. Inventing any of
 * them would be fabricating a client's words about a regulated firm.
 */
export function ReviewsMarquee() {
  const panels = reviews.map((review) => (
    <article
      key={review.id}
      className="flex h-full w-[19rem] flex-col justify-between border border-line bg-surface p-8 sm:w-[24rem] lg:w-[27rem]"
    >
      <blockquote className="m-0">
        <p className="font-prose text-body-lg text-ink-secondary">
          {review.reviewText ?? "[APPROVED REVIEW REQUIRED]"}
        </p>
      </blockquote>
      <footer className="mt-10 flex items-end justify-between gap-6 border-t border-line pt-5">
        <p className="text-body-sm font-medium text-ink">
          {review.reviewerName ?? "[APPROVED REVIEW REQUIRED]"}
        </p>
        <p className="text-eyebrow font-medium tracking-[0.16em] text-ink-tertiary uppercase">
          {review.source ?? "Source"}
        </p>
      </footer>
    </article>
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
            <p className="max-w-[42ch] font-prose text-body-lg text-ink-secondary lg:pt-2">
              Published with the reviewer&rsquo;s permission and reviewed by
              compliance before it appears here.
            </p>
          </div>
        </DatumGrid>
      </Container>

      <PendingContent
        label="reviews.approved — testimonial text, reviewer permission and source profiles required"
        className="mt-[var(--section-sm)]"
      >
        <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <Marquee
            items={panels}
            speed={SPEED_PX_PER_SECOND}
            ariaLabel="Client reviews"
            itemClassName="flex shrink-0 pr-6 lg:pr-8"
            className="px-[var(--gutter)]"
          />
        </div>
      </PendingContent>
    </section>
  );
}
