"use client";

import Link from "next/link";
import { useState } from "react";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { divisions } from "@/content/services";

/**
 * The four core divisions.
 *
 * An editorial index rather than four cards: the divisions hang off the datum
 * as a typographic list, with one large image plate alongside that changes as
 * each division becomes active. Activation is driven by pointer *and* focus, so
 * nothing here depends on hover.
 *
 * Below lg the plate stacks with each division instead of sitting alongside, so
 * mobile is a designed sequence rather than a squeezed two-column layout.
 *
 * On the numerals: these are divisions, not steps, so a process reading would
 * be wrong. Both variants were built and compared at 1440. Unnumbered leaves
 * the datum rail entirely empty and the hairlines start from nothing, which
 * reads more anonymous; numbered gives each row a left anchor and corroborates
 * the "four divisions" count stated in the heading. Kept as set-indexing, not
 * sequence — nothing connects the numerals, and no copy implies an order.
 */
export function ServiceDivisions() {
  const [active, setActive] = useState(0);
  const activeDivision = divisions[active] ?? divisions[0];

  return (
    <section
      aria-labelledby="divisions-heading"
      className="border-t border-line py-[var(--section-md)]"
    >
      <Container>
        <DatumGrid>
          <Eyebrow>What we do</Eyebrow>
          <PendingContent label="divisions.heading — approved copy required">
            <h2
              id="divisions-heading"
              className="max-w-[19ch] text-display-2 font-medium text-balance"
            >
              Four divisions, one advisory relationship.
            </h2>
          </PendingContent>
        </DatumGrid>

        <div className="mt-[var(--section-sm)] grid gap-x-16 gap-y-0 [grid-template-columns:1fr] lg:[grid-template-columns:minmax(0,1fr)_minmax(0,26rem)]">
          {/* The index */}
          <ol className="m-0 list-none border-b border-line p-0">
            {divisions.map((division, index) => (
              <li
                key={division.id}
                className="border-t border-line first:border-t-0 lg:first:border-t"
              >
                  <Link
                    href={division.href}
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group block py-8 lg:py-10"
                  >
                    <DatumGrid className="gap-y-3">
                      <span
                        aria-hidden="true"
                        className={`text-eyebrow font-medium tabular uppercase transition-colors duration-base ${
                          active === index ? "text-accent" : "text-ink-tertiary"
                        }`}
                      >
                        {division.index}
                      </span>

                      <div>
                        <h3 className="text-heading-1 font-medium tracking-tight text-balance transition-colors duration-base group-hover:text-accent">
                          {division.label}
                        </h3>

                        {/* Three compositions, not one shrunk twice:
                          mobile stacks plate above copy, tablet sets copy and a
                          portrait plate side by side, desktop drops the inline
                          plate for the sticky one alongside the index. */}
                        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] md:items-start md:gap-10 lg:mt-5 lg:block">
                          <div className="relative aspect-3/2 md:order-2 md:aspect-4/5 lg:hidden">
                            <DrawingPlate
                              label={`${division.label} — photography required`}
                              tone="light"
                            />
                          </div>

                          <div className="md:order-1">
                            <p className="max-w-[52ch] font-prose text-body-lg text-ink-secondary">
                              {division.scope}
                            </p>

                            <span className="mt-5 inline-block text-body-sm font-medium text-accent underline decoration-transparent underline-offset-[6px] transition-[text-decoration-color] duration-base group-hover:decoration-accent">
                              {division.label} advice
                            </span>
                          </div>
                        </div>
                      </div>
                    </DatumGrid>
                  </Link>
              </li>
            ))}
          </ol>

          {/* The plate. Sticky alongside the index at lg+. */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-height)+2rem)]">
              <div className="relative aspect-4/5 w-full">
                {divisions.map((division, index) => (
                  <div
                    key={division.id}
                    aria-hidden="true"
                    className={`absolute inset-0 transition-opacity duration-slow ease-out-quart ${
                      active === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <DrawingPlate
                      label={`${division.label} — photography required`}
                      tone="light"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-4 font-prose text-body-sm text-ink-tertiary">
                {activeDivision?.label}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
