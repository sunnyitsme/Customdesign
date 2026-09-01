import type { ServicePage } from "./service-pages";
import { servicePath } from "./service-pages";

/**
 * Media registry.
 *
 * One place that answers "which photograph does this page want, where does it
 * live, and how should it be cropped". Components never name a path.
 *
 * The path is DERIVED from the route rather than typed out, so a file can only
 * be wrong in one direction: the firm drops a correctly named file into
 * public/media/ and the page picks it up with no code change. A hand-written
 * path list would drift the moment a slug changed.
 *
 *   /mortgages              ->  /media/mortgages/hero.jpg
 *   /mortgages/buy-to-let   ->  /media/mortgages/buy-to-let.jpg
 *
 * Nothing here asserts that a file exists. `components/ui/HeroMedia.tsx` checks
 * at render time and falls back to a placeholder plate at the identical crop.
 *
 * Payload note: `src`, `alt` and `focal` are deliberately the three fields a
 * Payload upload document carries, so when the CMS lands this registry becomes
 * a seed and the components keep their prop shape.
 */

export interface HeroImage {
  /** Public path. May not exist yet. */
  readonly src: string;
  /**
   * Alt text.
   *
   * Empty by default, and that is the correct value rather than an oversight:
   * these are atmospheric heroes sitting behind an H1 that already states the
   * subject. Announcing "photograph of a London office building" to a screen
   * reader adds noise, not information. An entry sets a non-empty alt only
   * where the image itself carries meaning the page text does not.
   *
   * It is also the honest value while the photographs do not exist — we cannot
   * describe a picture nobody has taken.
   */
  readonly alt: string;
  /** CSS object-position. Keeps the subject in frame across every crop. */
  readonly focal: string;
  /** What to shoot. Shown on the placeholder plate and briefed to the firm. */
  readonly brief: string;
}

interface HeroEntry {
  readonly focal: string;
  readonly brief: string;
  readonly alt?: string;
}

/** Route -> file. Hub roots take `hero.jpg`; leaves take `<slug>.jpg`. */
export function heroSrc(route: string): string {
  const segments = route.split("/").filter(Boolean);
  if (segments.length === 0) return "/media/home/hero/guide-london-poster.webp";
  if (segments.length === 1) return `/media/${segments[0]}/hero.jpg`;
  return `/media/${segments.join("/")}.jpg`;
}

/**
 * Heroes for the hub and standalone pages.
 *
 * Service child pages are not listed: they already carry a per-page brief in
 * their own content, and `serviceHeroImage` derives the rest. Listing 38 more
 * entries here would be a second place for the same fact to go stale.
 *
 * Briefs describe a register, not a specific photograph, because the firm has
 * not commissioned the shoot yet. Every one of them is subject to
 * docs/media-licences/ before it can be published.
 */
const heroes: Readonly<Record<string, HeroEntry>> = {
  "/mortgages": {
    focal: "center 40%",
    brief: "Residential property, warm domestic register — daylight, lived-in",
  },
  "/mortgages/guides": {
    focal: "center",
    brief: "Quiet desk detail — paperwork, reading, no stock handshakes",
  },
  "/property-finance": {
    focal: "center 45%",
    brief: "Development site or commercial elevation, wide crop, institutional",
  },
  "/protection": {
    focal: "center 35%",
    brief: "Household interior, unposed, human register — no clinical imagery",
  },
  "/protection/business": {
    focal: "center 40%",
    brief: "Small-business premises or workshop — real trade, not an open-plan office",
  },
  "/wills-estate-planning": {
    focal: "center 40%",
    brief: "Domestic still life, considered and unhurried — no legal-stock gavels",
  },
  "/about": {
    focal: "center 35%",
    brief: "Guide's own office or town, photographed honestly — not a stock lobby",
  },
  "/about/our-company": {
    focal: "center 35%",
    brief: "Guide's own premises, exterior or working interior",
  },
  "/about/our-team": {
    focal: "center 30%",
    brief: "Advisers at work, candid — requires model releases for every face",
  },
  "/about/how-we-work": {
    focal: "center",
    brief: "A real client conversation, over-shoulder, faces not required",
  },
  "/locations": {
    focal: "center 40%",
    brief: "Recognisable local context for the offices Guide actually occupies",
  },
  "/insights": {
    focal: "center 40%",
    brief: "Editorial texture — print, screens, market data in situ",
  },
  "/contact": {
    focal: "center 35%",
    brief: "Guide's own reception or street entrance — the door a client arrives at",
  },
  "/calculators": {
    focal: "center",
    brief: "Numbers in a working context — notes, calculator, no glossy fintech",
  },
};

/** The hero for a hub or standalone route, or undefined if it has none. */
export function heroImage(route: string): HeroImage | undefined {
  const entry = heroes[route];
  if (entry === undefined) return undefined;
  return {
    src: heroSrc(route),
    alt: entry.alt ?? "",
    focal: entry.focal,
    brief: entry.brief,
  };
}

/**
 * The hero for a service child page.
 *
 * Derived rather than registered: the brief already lives on the page's own
 * content entry, and the crop follows the composition the page declares —
 * commercial and private-client pages run darker, tighter framing.
 */
export function serviceHeroImage(page: ServicePage): HeroImage {
  const focal =
    page.variant === "commercial" || page.variant === "complex"
      ? "center 45%"
      : "center 35%";
  return {
    src: heroSrc(servicePath(page)),
    alt: "",
    focal,
    brief: page.imageAlt,
  };
}

/**
 * The hero for a route that must have one.
 *
 * Throws during static generation rather than degrading quietly: a hub page
 * with no registered hero is a content omission, and the build is the right
 * place to find out. Same posture as the pending-content gate.
 */
export function requireHeroImage(route: string): HeroImage {
  const image = heroImage(route);
  if (image === undefined) {
    throw new Error(
      `No hero registered for "${route}". Add it to content/media.ts.`,
    );
  }
  return image;
}

/** Every route the registry covers. Used by the media audit test. */
export const heroRoutes: readonly string[] = Object.keys(heroes);
