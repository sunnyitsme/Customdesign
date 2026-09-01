"use client";

import Image from "next/image";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { PendingContent } from "@/components/ui/PendingContent";
import { providersHeading, type Provider } from "@/content/providers";

/** Faster than the reviews marquee, but still unhurried. */
const SPEED_PX_PER_SECOND = 45;

/** Placeholder slots when nothing may be displayed — production, today. */
const PLACEHOLDER_SLOTS = 10;

/**
 * Lenders, providers and professional partners.
 *
 * A quiet, short band between two taller sections — it exists to be scanned,
 * not read.
 *
 * ## Which marks appear is decided on the SERVER
 *
 * `marks` is passed in, already filtered, rather than computed here. That is
 * not a style preference: this is a client component, and Next only inlines
 * NEXT_PUBLIC_* into the client bundle. `process.env.VERCEL_ENV` is `undefined`
 * in the browser, so a permission check evaluated here would read "not
 * production" on every deployment and publish unpermissioned trade marks.
 * The gate lives in content/providers.ts and is evaluated by app/page.tsx,
 * where the environment is real.
 *
 * ## Normalisation
 *
 * Every mark occupies one identical slot with `object-fit: contain`, so nothing
 * is stretched, cropped or recoloured, each keeps its true aspect ratio, and the
 * strip still reads as an even rhythm. The slot matches the placeholder's
 * dimensions exactly, so the band is the same height whether marks are shown or
 * not.
 *
 * The images are the trimmed derivatives from scripts/prepare-logos.mjs. The
 * supplied files sit on a common ~385x311 canvas with the artwork floating in
 * transparent padding; fitted into a 176x48 slot untrimmed, a wordmark renders
 * around 10px tall and is unreadable.
 *
 * `fill` rather than a height class, deliberately: globals.css carries an
 * unlayered `img { height: auto }` that outranks Tailwind's layered utilities,
 * so `h-12` here would be silently ignored. `fill` sets height inline, which
 * wins. (See D-015.)
 */
export function LogoMarquee({
  marks,
  preview,
}: {
  /** Already permission-filtered by the caller. */
  marks: readonly Provider[];
  /** True when `marks` contains artwork nobody has cleared for publication. */
  preview: boolean;
}) {
  const plates =
    marks.length > 0
      ? marks.map((provider) => (
          <div
            key={provider.id}
            className="relative h-10 w-[9.5rem] lg:h-12 lg:w-[11rem]"
          >
            <Image
              src={provider.logo ?? ""}
              alt={provider.name ?? ""}
              fill
              sizes="(min-width: 1024px) 176px, 152px"
              // Eager, not lazy. The strip scrolls continuously, so lazy marks
              // pop in mid-motion as they cross the viewport edge — visible and
              // cheap to avoid: all 37 optimised marks total ~200KB. Not
              // `priority`, which would preload them ahead of the hero.
              loading="eager"
              className="object-contain"
            />
          </div>
        ))
      : Array.from({ length: PLACEHOLDER_SLOTS }, (_, index) => (
          <div
            key={`slot-${index}`}
            className="flex h-10 w-[9.5rem] items-center justify-center border border-line bg-surface lg:h-12 lg:w-[11rem]"
            aria-hidden="true"
          >
            <span className="text-[10px] font-medium tracking-[0.14em] text-ink-tertiary uppercase">
              Logo
            </span>
          </div>
        ));

  return (
    <section
      aria-labelledby="providers-heading"
      className="border-t border-line py-[var(--section-sm)]"
    >
      <Container>
        <DatumGrid>
          <Eyebrow>Panel</Eyebrow>
          <h2
            id="providers-heading"
            className="max-w-[24ch] text-heading-2 font-medium text-balance"
          >
            {providersHeading}
          </h2>
        </DatumGrid>
      </Container>

      <PendingContent
        label={
          preview
            ? "DEVELOPMENT PREVIEW — unapproved marks, visual review only. Production requires confirmed permission per mark (providers.list)"
            : "providers.list — approved list, logo files and written permission to display each mark"
        }
        className="mt-12"
      >
        {/* Full-bleed, with the edges faded so marks enter and leave rather
            than being cut off at the container. */}
        <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <Marquee
            items={plates}
            speed={SPEED_PX_PER_SECOND}
            ariaLabel="Lenders and providers we work with"
            itemClassName="flex shrink-0 items-center pr-12 lg:pr-20"
          />
        </div>
      </PendingContent>
    </section>
  );
}
