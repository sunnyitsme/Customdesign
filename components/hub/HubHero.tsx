import Link from "next/link";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMedia } from "@/components/ui/HeroMedia";
import type { HeroImage } from "@/content/media";
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
  image,
  aside,
}: {
  eyebrow: string;
  headingId: string;
  title: string;
  standfirst: string;
  ctaLabel: string;
  tone?: "light" | "dark";
  media?: "portrait" | "wide" | "none";
  /** From content/media.ts. Renders a placeholder plate until the file exists. */
  image: HeroImage;
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
                ? "grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start"
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
                      : "bg-primary text-on-primary hover:bg-ink"
                  }`}
                >
                  {ctaLabel}
                </Link>
                <a
                  href={site.phoneHref}
                  className={`text-body-lg font-medium tabular underline underline-offset-[6px] transition-colors duration-base ${
                    dark
                      ? "text-ink-inverse decoration-line-inverse-interactive hover:decoration-accent-bright"
                      : "text-ink decoration-line-interactive hover:decoration-accent"
                  }`}
                >
                  {site.phone}
                </a>
              </div>
              {aside}
            </div>

            {media === "portrait" && (
              <div className="relative aspect-4/3 w-full lg:aspect-4/5">
                <HeroMedia
                  image={image}
                  tone={dark ? "dark" : "light"}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            )}
          </div>
        </DatumGrid>

        {media === "wide" && (
          <div className="relative mt-14 aspect-21/9 w-full">
            <HeroMedia
              image={image}
              tone={dark ? "dark" : "light"}
              priority
              sizes="100vw"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
