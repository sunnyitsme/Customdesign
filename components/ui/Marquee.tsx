"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The engine behind both marquees.
 *
 * Built on a natively scrollable viewport rather than a CSS transform, which
 * buys three things a translated track cannot:
 *
 *   - touch swipe works because it is real scrolling, not an emulation;
 *   - pausing is exact — position is a scroll offset, so stopping mid-loop and
 *     resuming needs no transform bookkeeping;
 *   - a manual swipe and the autoplay share one position, so the two never
 *     fight each other.
 *
 * The loop is seamless because the items are rendered twice and the position
 * wraps by subtracting exactly half the track width. For that subtraction to be
 * invisible the two copies must be *exactly* equal, so spacing lives on each
 * item (a trailing pad) rather than as a flex gap on the track — a gap would
 * add one extra interval between the copies and put a visible jump at the seam.
 *
 * Position is kept as a float and written to scrollLeft each frame. That
 * matters at the review marquee's very low speed: an integer accumulator would
 * round sub-pixel steps to zero and stall.
 *
 * The loop does not run when the marquee is off-screen, when a pointer is over
 * it, when focus is inside it, or when the viewer prefers reduced motion.
 */
/**
 * The one scroll speed, in pixels per second, shared by every marquee.
 *
 * Both strips must move identically — two different speeds on one page read as
 * a bug rather than as a distinction. Reviews previously ran at 14px/s to keep
 * a quotation readable in motion; that is now deliberately unified with the
 * logo strip. Change it here and both follow.
 */
export const MARQUEE_SPEED = 45;

export function Marquee({
  items,
  /** Pixels per second. Pass MARQUEE_SPEED unless there is a reason not to. */
  speed,
  ariaLabel,
  /** Applied to every item wrapper. Must carry the trailing spacing. */
  itemClassName = "",
  className = "",
}: {
  items: readonly ReactNode[];
  speed: number;
  ariaLabel: string;
  itemClassName?: string;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  // Start assuming reduced motion so the server-rendered markup is the static
  // one; the effect turns animation on only for viewers who allow it.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion || interacting) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let onScreen = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true;
      },
      { rootMargin: "200px" },
    );
    observer.observe(viewport);

    let frame = 0;
    let last = performance.now();
    // Adopt whatever position a manual swipe left behind.
    let position = viewport.scrollLeft;

    const step = (now: number) => {
      const elapsed = now - last;
      last = now;

      if (onScreen) {
        const half = track.scrollWidth / 2;
        if (half > 0) {
          // Adopt any scroll that did not come from us — a swipe, a wheel, a
          // keyboard pan — before advancing. Without this the loop would
          // overwrite the viewer's own scrolling on the very next frame. The
          // 1px tolerance keeps us from fighting rounding on our own writes.
          if (Math.abs(viewport.scrollLeft - position) > 1) {
            position = viewport.scrollLeft;
          }
          position += (speed * elapsed) / 1000;
          if (position >= half) position -= half;
          viewport.scrollLeft = position;
        }
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reducedMotion, interacting, speed]);

  const hold = () => setInteracting(true);
  const release = () => setInteracting(false);

  const copy = (decorative: boolean) => (
    <div
      className="flex w-max"
      {...(decorative ? { "aria-hidden": true } : {})}
    >
      {items.map((item, index) => (
        <div key={index} className={itemClassName}>
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={viewportRef}
      // Focusable because it scrolls: a keyboard user must be able to reach and
      // pan it, and focus landing here also pauses the loop.
      tabIndex={0}
      role="group"
      aria-label={ariaLabel}
      data-marquee
      data-paused={interacting || reducedMotion ? "true" : "false"}
      className={`no-scrollbar overflow-x-auto overscroll-x-contain ${className}`}
      onPointerEnter={hold}
      onPointerLeave={release}
      onPointerDown={hold}
      onPointerUp={release}
      onPointerCancel={release}
      onFocusCapture={hold}
      onBlurCapture={release}
    >
      <div ref={trackRef} className="flex w-max">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
