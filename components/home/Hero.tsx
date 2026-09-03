import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { PendingContent } from "@/components/ui/PendingContent";
import { hero } from "@/content/services";
import { HeroVideo } from "./HeroVideo";

/**
 * Cinematic London hero.
 *
 * The video is the dominant element and the overlay stays minimal: one
 * headline, one supporting line, one primary CTA and a restrained secondary.
 * The headline is deliberately held to roughly two lines — an earlier pass let
 * it run to six and the type, not the footage, became the hero.
 *
 * `hasMedia` is resolved on the server from the filesystem, so the moment the
 * three asset files land in public/media/home/hero/ the video path activates
 * with no change to this component. Until then a drawing plate holds the slot —
 * an empty frame, not fabricated footage.
 */
export function Hero({
  sources,
  hasPoster,
}: {
  sources: readonly { src: string; type: string }[];
  hasPoster: boolean;
}) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="on-deep relative isolate flex min-h-[min(90svh,50rem)] flex-col justify-end overflow-hidden bg-deep pt-[calc(var(--header-height)+var(--section-sm))] text-ink-inverse"
    >
      {sources.length > 0 ? (
        <HeroVideo
          sources={sources}
          poster={hasPoster ? hero.media.poster : null}
          label={hero.media.alt}
        />
      ) : (
        <DrawingPlate
          label="Hero media placeholder — media/home/hero/guide-london.webm / .mp4 / -poster.webp required"
          tone="dark"
        />
      )}

      {/* Single gradient scrim. No animated blur or filter anywhere. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-deep via-deep/65 to-deep/20"
      />

      <Container className="relative z-10 pb-[var(--section-sm)]">
        {/* The empty datum rail is doing work here: it holds the left margin
            that keeps the hero aligned with every section below it. */}
        {/* Entrance sequence, roughly 1.3s end to end: headline, then the
            datum rule with the actions, then the supporting line. The video
            itself is deliberately untouched — it holds still and the content
            arrives over it. */}
        <DatumGrid>
          <div />
          <Reveal>
            <PendingContent
              tone="dark"
              label="hero.copy — approved headline required"
            >
              <h1
                id="hero-heading"
                className="max-w-[17ch] text-display-1 font-medium text-balance"
              >
                Mortgage and property finance advice.
              </h1>
            </PendingContent>
          </Reveal>
        </DatumGrid>

        {/* The datum: a hairline the hero rests on, carrying the actions on the
            left and the supporting line on the right.

            This rule is the only structural gold on the site — one hairline, on
            the one page that opens on full-bleed footage. It reads as a struck
            line rather than as decoration, which is the whole intent behind
            rationing the colour. */}
        <Reveal
          effect="fade"
          delay={280}
          duration={900}
          className="mt-[var(--section-sm)] border-t border-premium/40 pt-7"
        >
          <DatumGrid>
            <div />
            <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between md:gap-12">
              <Reveal
                delay={460}
                distance="0.75rem"
                className="flex flex-wrap items-center gap-x-8 gap-y-4"
              >
                <Button href={hero.primaryCta.href} tone="dark">
                  {hero.primaryCta.label}
                </Button>
                <Button
                  href={hero.secondaryCta.href}
                  variant="tertiary"
                  tone="dark"
                >
                  {hero.secondaryCta.label}
                </Button>
              </Reveal>

              <PendingContent
                tone="dark"
                label="hero.copy — supporting line"
                className="max-w-[36ch] shrink-0"
              >
                <p className="text-body-sm text-ink-inverse-secondary">
                  Residential and commercial lending, protection, and wills and
                  estate planning.
                </p>
              </PendingContent>
            </div>
          </DatumGrid>
        </Reveal>
      </Container>
    </section>
  );
}
