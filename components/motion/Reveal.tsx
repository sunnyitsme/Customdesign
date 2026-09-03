import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Scroll reveal.
 *
 * ## Why this is not Framer Motion
 *
 * A `whileInView` reveal was built for this site once and removed — see
 * docs/02-decisions.md D-010. `initial={{ opacity: 0 }}` renders `opacity: 0`
 * into the SERVER HTML, so the service copy on a regulated firm's site sat
 * invisible until an IntersectionObserver fired. Content behind JavaScript is a
 * real SEO and accessibility liability, and it is not worth a fade.
 *
 * This primitive inverts that. It is a SERVER component: it emits data
 * attributes and nothing else. The server HTML is fully visible, always. The
 * hidden state is applied by CSS that only matches once a pre-paint script in
 * app/layout.tsx has set `data-motion="on"` on <html> — which it does only when
 * the viewer has not asked for reduced motion. So:
 *
 *   - no JavaScript          -> everything visible, nothing hidden
 *   - reduced motion         -> everything visible, nothing hidden
 *   - crawler without JS     -> everything visible, nothing hidden
 *   - script fails to run    -> everything visible, nothing hidden
 *
 * The failure mode is always "no animation", never "no content". The script is
 * synchronous and inline, so there is no flash of visible-then-hidden.
 *
 * ## One observer, not hundreds
 *
 * There is no per-element effect. `components/motion/MotionRuntime.tsx` mounts
 * a single IntersectionObserver for the whole document and sets `data-revealed`
 * as elements arrive. Adding a hundred Reveals adds a hundred DOM nodes to one
 * observer, not a hundred observers and a hundred React effects.
 *
 * Reveals never replay: the runtime unobserves on reveal, so scrolling back up
 * does not re-trigger anything.
 */

export type RevealEffect =
  /** The default. Opacity with a short upward settle. */
  | "up"
  /** Opacity only — for things that should not move, like a whole section. */
  | "fade"
  /** For image plates: the wrapper clips, the child settles from 1.04 to 1. */
  | "media";

export function Reveal({
  children,
  effect = "up",
  /** Position in a staggered group. Multiplied by `stagger`. */
  index = 0,
  /** Per-item stagger in ms. 60-100 for cards, 80-140 for heading sequences. */
  stagger = 90,
  /** Extra delay in ms, added on top of the staggered offset. */
  delay = 0,
  /** Override the shared duration. Rarely needed. */
  duration,
  /** Override the travel distance, e.g. "1rem" for tighter groups. */
  distance,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  // `| undefined` throughout: the project runs exactOptionalPropertyTypes, and
  // a shared primitive should accept the conditional className every call site
  // naturally writes rather than make each one work around the flag.
  effect?: RevealEffect | undefined;
  index?: number | undefined;
  stagger?: number | undefined;
  delay?: number | undefined;
  duration?: number | undefined;
  distance?: string | undefined;
  as?: ElementType | undefined;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}) {
  const offset = index * stagger + delay;

  return (
    <Tag
      data-reveal={effect}
      className={className}
      style={
        {
          ...(offset > 0 ? { "--reveal-delay": `${offset}ms` } : {}),
          ...(duration ? { "--reveal-duration": `${duration}ms` } : {}),
          ...(distance ? { "--reveal-distance": distance } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
