import Link from "next/link";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";
import type { ReactNode } from "react";

/**
 * Hub opening.
 *
 * Shared structure, deliberately not shared appearance: `tone` and `media`
 * change the register so Property Finance reads institutional while Protection
 * reads human. Each hub passes its own headline and standfirst.
 */
export function HubHero({
  eyebrow,
  headingId,
  title,
  standfirst,
  ctaLabel,
  tone = "light",
  media = "portrait",
  imageAlt,
  aside,
}: {
  eyebrow: string;
  headingId: string;
  title: string;
  standfirst: string;
  ctaLabel: string;
  tone?: "light" | "dark";
  media?: "portrait" | "wide" | "none";
  imageAlt: string;
  aside?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      aria-labelledby={headingId}
      className={`${dark ? "on-deep bg-deep text-ink-inverse" : "bg-surface"} pt-[calc(var(--header-height)+var(--section-sm))] pb-[var(--section-md)]`}
    >
      <Container>
        <DatumGrid>
          <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>
          <div
            className={
              media === "portrait"
                ? "grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end"
                : ""
            }
          >
            <div>
              <h1
                id={headingId}
                className="max-w-[17ch] text-display-1 font-medium text-balance"
              >
                {title}
              </h1>
              <p
                className={`mt-8 max-w-[56ch] text-body-lg ${dark ? "text-ink-inverse-secondary" : "text-ink-secondary"}`}
              >
                {standfirst}
              </p>
              <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center rounded-sm px-7 py-4 text-body-sm font-medium transition-colors duration-base ${
                    dark
                      ? "bg-ink-inverse text-ink hover:bg-accent-bright"
                      : "bg-ink text-ink-inverse hover:bg-accent"
                  }`}
                >
                  {ctaLabel}
                </Link>
                <a
                  href={site.phoneHref}
                  className={`text-body-lg font-medium tabular underline underline-offset-[6px] transition-colors duration-base ${
                    dark
                      ? "text-ink-inverse decoration-line-inverse hover:decoration-accent-bright"
                      : "text-ink decoration-line-interactive hover:decoration-accent"
                  }`}
                >
                  {site.phone}
                </a>
              </div>
              {aside}
            </div>

            {media === "portrait" && (
              <div className="relative aspect-4/5 w-full lg:aspect-3/4">
                <DrawingPlate label={imageAlt} tone={dark ? "dark" : "light"} />
              </div>
            )}
          </div>
        </DatumGrid>

        {media === "wide" && (
          <div className="relative mt-14 aspect-21/9 w-full">
            <DrawingPlate label={imageAlt} tone={dark ? "dark" : "light"} />
          </div>
        )}
      </Container>
    </section>
  );
}
