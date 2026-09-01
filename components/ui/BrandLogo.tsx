import Image from "next/image";
import { assetPath } from "@/lib/preview";

/**
 * The Guide Financial Services brand mark.
 *
 * One component so the asset path, its intrinsic dimensions, its alt text and
 * its contrast treatment live in a single place. Nothing else in the codebase
 * names the file.
 *
 * ## The dark-ground problem
 *
 * The supplied lockup is black artwork plus a single orange, on transparency.
 * On the navy grounds the black measures 1.21:1 — the word "GUIDE" and the
 * strapline effectively disappear, leaving only the orange fragments of the
 * symbol. Measured:
 *
 *   black on ground #F6F8FB   19.74   fine, no treatment
 *   black on navy   #0D1B2A    1.21   unusable
 *   black on the plaque below 17.55   restored
 *
 * The fix is a backing surface, not a recolour. Repainting someone's trade mark
 * to suit our palette is not ours to do, and no official reversed/white version
 * has been supplied — so `tone="dark"` sets the logo on a restrained warm-white
 * plaque and leaves the artwork untouched.
 *
 * Swap in an official reversed version, if the firm ever supplies one, by
 * pointing `tone="dark"` at that file and dropping the plaque. Nothing else
 * changes.
 *
 * ## Sizing
 *
 * Each slot sets a WIDTH and lets height follow the intrinsic 3.114:1 ratio, so
 * the mark can never be distorted. Width rather than height for two reasons:
 *
 *   1. It pairs exactly with `sizes`, which is also expressed as a width. The
 *      two must agree or the browser picks the wrong srcset candidate, so they
 *      are declared together below.
 *   2. `app/globals.css` carries an unlayered `img { height: auto }` base rule.
 *      Unlayered CSS outranks Tailwind's layered utilities, so an `h-9` here
 *      would be silently ignored and the rendered size would fall out of the
 *      `sizes` attribute instead — which is not a thing anyone should have to
 *      reverse-engineer later.
 *
 * Explicit width/height attributes on the <img> give the browser the ratio, so
 * the box is reserved before the file loads and there is no layout shift.
 *
 * The header mark, plaque included, renders 120px wide against the 127px the
 * previous typographic wordmark occupied — deliberately inside it, so the frozen
 * header geometry cannot be worse than it was at any width.
 *
 * That margin is not decorative. The binding widths are the disclosure
 * breakpoints themselves, 1232px and 1360px, where the navigation and then the
 * phone number arrive at their tightest. An earlier pass sized the mark at 140px
 * on the strength of round-number viewports and pushed the 1232px gap to 53px,
 * under the header's measured >=56px guarantee. Sample the boundaries, not the
 * comfortable widths. See SiteHeader and D-002.
 */

/**
 * Intrinsic pixels of the optimised web master. Do not guess these.
 *
 * The path goes through `assetPath` because next/image does NOT apply basePath
 * to a `src` under `output: export` — verified in the GitHub Pages build, where
 * an unprefixed /media path 404s. No-op in every other build.
 */
const LOGO = {
  src: "/media/brand/guide-logo.png",
  width: 900,
  height: 289,
} as const;

export type BrandLogoSize = "header" | "drawer" | "footer";

/**
 * Rendered width per slot, and the matching `sizes`. Keep the pair in step: the
 * class decides the layout, `sizes` decides which file the browser fetches.
 *
 * The header steps at lg, which is where --header-height itself steps, so the
 * mark keeps the same proportion of the bar at both heights.
 */
const slots: Record<BrandLogoSize, { class: string; sizes: string }> = {
  header: {
    class: "w-[96px] lg:w-[104px]",
    sizes: "(min-width: 1024px) 104px, 96px",
  },
  drawer: { class: "w-[104px]", sizes: "104px" },
  footer: { class: "w-[150px]", sizes: "150px" },
};

export function BrandLogo({
  size = "header",
  tone = "light",
  priority = false,
  className = "",
}: {
  size?: BrandLogoSize;
  /** "dark" adds the contrast plaque. Use it on every navy ground. */
  tone?: "light" | "dark";
  /** Above-the-fold marks only — the header on first paint. */
  priority?: boolean;
  className?: string;
}) {
  const image = (
    <Image
      src={assetPath(LOGO.src)}
      alt="Guide Financial Services"
      width={LOGO.width}
      height={LOGO.height}
      sizes={slots[size].sizes}
      priority={priority}
      className={slots[size].class}
    />
  );

  if (tone === "light") {
    return <span className={`block ${className}`}>{image}</span>;
  }

  return (
    <span
      className={`inline-flex items-center rounded-sm bg-ground/95 px-2 py-1.5 ${className}`}
    >
      {image}
    </span>
  );
}
