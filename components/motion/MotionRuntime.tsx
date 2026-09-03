"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The whole scroll-motion runtime. Mounted once, in the root layout.
 *
 * Two jobs, one observer:
 *
 *   1. Reveal `[data-reveal]` elements as they arrive.
 *   2. Drive `[data-parallax]` elements from a single rAF loop.
 *
 * Everything it does is additive. If this component never mounts, the site is
 * simply static — see the note in Reveal.tsx.
 */

/** Fire slightly before the element is fully in view, never after. */
const ROOT_MARGIN = "0px 0px -8% 0px";

/** Desktop-only. Parallax on a phone costs more than it returns. */
const PARALLAX_MIN_WIDTH = 1024;

/** Total travel, in px, across the element's whole pass through the viewport. */
const PARALLAX_TRAVEL = 28;

const reveal = (el: Element) => el.setAttribute("data-revealed", "");

/**
 * Reveal without the staggered delay.
 *
 * A stagger is only worth anything if someone is watching it arrive. For an
 * element the reader has already scrolled past, the delay is just a wait for
 * content that should already be there — so the backstop drops it.
 */
const revealNow = (el: Element) => {
  if (el instanceof HTMLElement) el.style.setProperty("--reveal-delay", "0ms");
  reveal(el);
};

export function MotionRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // The pre-paint script only sets this when motion is allowed. If it is
    // absent — reduced motion, or the script did not run — nothing was ever
    // hidden, so there is nothing to reveal and no loop worth starting.
    if (root.getAttribute("data-motion") !== "on") return;

    const pending = () =>
      Array.from(document.querySelectorAll("[data-reveal]:not([data-revealed])"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    for (const el of pending()) observer.observe(el);

    /**
     * Backstop for very fast scrolling.
     *
     * IntersectionObserver evaluates per frame. Flung far enough, an element
     * can pass entirely through the viewport between two frames and never
     * register — leaving a blank band behind the user. This sweeps anything
     * whose top has already passed the viewport bottom and reveals it outright.
     */
    let sweepQueued = false;
    const sweep = () => {
      sweepQueued = false;
      const limit = window.innerHeight;
      for (const el of pending()) {
        if (el.getBoundingClientRect().top < limit) {
          revealNow(el);
          observer.unobserve(el);
        }
      }
    };
    const queueSweep = () => {
      if (sweepQueued) return;
      sweepQueued = true;
      requestAnimationFrame(sweep);
    };

    // --- Parallax --------------------------------------------------------
    // A single rAF loop shared by every parallax element, running only while
    // one is on screen. Writes a CSS variable; the transform itself is CSS.
    const parallaxEnabled = window.innerWidth >= PARALLAX_MIN_WIDTH;
    const parallax = parallaxEnabled
      ? Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"))
      : [];

    let frame = 0;
    const paint = () => {
      frame = 0;
      const viewport = window.innerHeight;
      for (const el of parallax) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) continue;
        // -1 when the element is just below the fold, +1 when just above it.
        const progress =
          (viewport - rect.top) / (viewport + rect.height) - 0.5;
        el.style.setProperty(
          "--parallax-y",
          `${(progress * PARALLAX_TRAVEL).toFixed(2)}px`,
        );
      }
    };
    const queuePaint = () => {
      if (frame || parallax.length === 0) return;
      frame = requestAnimationFrame(paint);
    };

    const onScroll = () => {
      queueSweep();
      queuePaint();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    paint();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // Re-scan on navigation: a new page brings new [data-reveal] nodes.
  }, [pathname]);

  return null;
}
