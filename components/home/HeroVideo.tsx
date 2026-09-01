"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/preview";

/**
 * Hero background video.
 *
 * Core Web Vitals strategy: the poster is the LCP element and the video is not
 * fetched at all until after first paint. The video fades in only once it can
 * actually play, so LCP is measured against an optimised still rather than a
 * video decode.
 *
 * The video is never fetched when the viewer prefers reduced motion, has
 * Save-Data on, or is on a narrow viewport — in those cases the poster is the
 * finished treatment, not a degraded one.
 *
 * Paths run through `assetPath`: these are raw <img>/<source> attributes, and
 * Next rewrites neither for basePath. No-op outside the static preview.
 */
export function HeroVideo({
  sources,
  poster,
  label,
}: {
  /** Only encodes that exist on disk — see lib/media.ts heroVideoSources. */
  sources: readonly { src: string; type: string }[];
  /**
   * Null when the still has not been supplied. The video was delivered before
   * its poster, and referencing a file that is not there costs two 404s and a
   * broken image — so the plate stands in until the still arrives.
   */
  poster: string | null;
  label: string;
}) {
  const posterSrc = poster === null ? null : assetPath(poster);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const narrow = window.matchMedia("(max-width: 47.99rem)").matches;
    const connection = (navigator as { connection?: { saveData?: boolean } })
      .connection;

    if (reducedMotion || narrow || connection?.saveData) return;

    // Defer to idle so the video never competes with first paint.
    const idle =
      window.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 400));
    const handle = idle(() => setShouldLoad(true));
    return () => window.clearTimeout(handle as number);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    const onReady = () => setReady(true);
    video.addEventListener("canplay", onReady);
    return () => video.removeEventListener("canplay", onReady);
  }, [shouldLoad]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-deep">
      {posterSrc !== null && (
        // eslint-disable-next-line @next/next/no-img-element -- background plate, sized by CSS not layout
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      )}

      {shouldLoad && (
        <video
          ref={videoRef}
          {...(posterSrc !== null ? { poster: posterSrc } : {})}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-cinematic ease-out-quart ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          {sources.map((source) => (
            <source
              key={source.src}
              src={assetPath(source.src)}
              type={source.type}
            />
          ))}
        </video>
      )}
    </div>
  );
}
