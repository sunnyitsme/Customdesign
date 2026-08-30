"use client";

import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { PendingContent } from "@/components/ui/PendingContent";
import { providers, providersHeading } from "@/content/providers";

/** Faster than the reviews marquee, but still unhurried. */
const SPEED_PX_PER_SECOND = 45;

/**
 * Lenders and providers.
 *
 * A quiet, short band between two taller sections — it exists to be scanned,
 * not read. Each logo sits in a fixed-height slot with object-fit: contain, so
 * marks of wildly different proportions optically balance without distortion
 * once real files arrive.
 *
 * No lender or provider is named. The migration pack records that a logo
 * section exists on the current homepage but not which marks it contains, and
 * displaying a third-party mark needs written permission. The heading avoids
 * "partners" for the same reason.
 */
export function LogoMarquee() {
  const plates = providers.map((provider) =>
    provider.logo && provider.name ? (
      // eslint-disable-next-line @next/next/no-img-element -- marks are fixed-height, sized by CSS
      <img
        key={provider.id}
        src={provider.logo}
        alt={provider.name}
        className="h-10 w-auto max-w-[10rem] object-contain lg:h-12"
      />
    ) : (
      <div
        key={provider.id}
        className="flex h-10 w-[9.5rem] items-center justify-center border border-line bg-surface lg:h-12 lg:w-[11rem]"
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium tracking-[0.14em] text-ink-tertiary uppercase">
          Logo
        </span>
      </div>
    ),
  );

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
        label="providers.list — approved list, logo files and written permission to display each mark"
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
