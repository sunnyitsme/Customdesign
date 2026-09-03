"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { hubs, primaryCta } from "@/content/navigation";
import { site } from "@/content/site";
import { MobileNav } from "./MobileNav";
import { PortalLogin } from "./PortalLogin";

/**
 * Site header.
 *
 * Sits transparent over the hero and transitions to a solid surface once the
 * page scrolls. The desktop mega menu is a disclosure: each hub is a button
 * with aria-expanded controlling one panel. Pointer users get hover-to-open as
 * an enhancement, but nothing depends on hover — the same panel opens on click
 * and on keyboard focus.
 *
 * Disclosure hierarchy, in priority order, every step measured rather than
 * chosen (see --breakpoint-* in app/globals.css):
 *
 *   below 432px   wordmark + drawer trigger
 *   cta 432px     + Speak to an adviser        (50px clear; 414px gives 35px)
 *   desknav 1232  primary nav + Login, drawer retires  (60px; 1216px gives 53px)
 *   deskfull 1360 + telephone number           (60px; 1344px gives 53px)
 *
 * The navigation and the Login disclosure share one breakpoint deliberately:
 * there must be no width where the desktop nav is up, the drawer is gone, and
 * the portals are unreachable from the header.
 *
 * `lg` is deliberately untouched — it still drives the datum rail and the
 * services layout.
 *
 * The nav wrapper is shrink-0, not min-w-0. Under min-w-0 the <ul> reported a
 * shrunken box while its children overflowed unclipped, so an overlap with the
 * CTA measured as a healthy gap. shrink-0 turns that silent overlap into real
 * page overflow, which the test suite already fails on.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openHub, setOpenHub] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openHub) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenHub(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenHub(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openHub]);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenHub(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // Transparent-over-hero is a homepage behaviour: the cinematic hero is dark
  // and full-bleed. Interior pages open on light or short heroes, where a
  // transparent header rendered the wordmark light-on-light at 1.08:1 — the
  // logo was invisible until you scrolled. Everywhere but the homepage the
  // header is solid from the start. Breakpoints and disclosure behaviour are
  // untouched.
  const overCinematicHero = pathname === "/";
  const solid = scrolled || openHub !== null || !overCinematicHero;

  return (
    <header
      /* The surface transition, refined: background, border and text colour
         cross-fade together over --duration-slow, and the solid state sits on
         a 92% ground with a backdrop blur so content passing under it reads as
         depth rather than as a hard edge.

         92%, not less, is deliberate: over the darkest possible content the
         header's ink still measures 14.01:1, comfortably AAA. Nothing about the
         breakpoints, the disclosure steps or the layout is touched — this is
         the same two states the header always had. */
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,backdrop-filter] duration-slow ease-standard ${
        solid
          ? "border-b border-line bg-ground/92 text-ink backdrop-blur-md"
          : "on-deep border-b border-transparent text-ink-inverse"
      }`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpenHub(null);
      }}
    >
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[var(--container-max)] items-center justify-between gap-6 px-[var(--gutter)]">
        {/* The official mark. It replaces a typographic placeholder that
            occupied 127x28px; at 32/36px tall this renders ~100/112px wide, so
            the header's measured disclosure steps keep the room they were
            given. `solid` picks the contrast treatment: over the dark hero the
            black artwork measures 1.21:1 and needs the plaque, on the light
            header it measures 19.74:1 and needs nothing. See BrandLogo. */}
        <Link href="/" className="shrink-0 leading-none">
          <BrandLogo priority tone={solid ? "light" : "dark"} />
        </Link>

        <div ref={navRef} className="hidden shrink-0 desknav:block">
          <nav aria-label="Primary">
            <ul className="m-0 flex list-none items-center gap-1 p-0">
              {hubs.map((hub) => {
                const featured = hub.children.filter((child) => child.featured);
                const isOpen = openHub === hub.href;

                if (featured.length === 0) {
                  return (
                    <li key={hub.href}>
                      <Link
                        href={hub.href}
                        className="inline-flex h-[var(--header-height)] items-center px-2.5 text-[0.84rem] font-medium whitespace-nowrap"
                      >
                        {hub.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={hub.href}
                    onPointerEnter={() => {
                      cancelClose();
                      setOpenHub(hub.href);
                    }}
                    onPointerLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`panel-${hub.id}`}
                      onClick={() => setOpenHub(isOpen ? null : hub.href)}
                      className="inline-flex h-[var(--header-height)] items-center gap-1.5 px-2.5 text-[0.84rem] font-medium whitespace-nowrap"
                    >
                      {hub.label}
                      <span
                        aria-hidden="true"
                        className={`mt-px block h-1 w-1 border-r border-b border-current transition-transform duration-base ${
                          isOpen ? "rotate-[-135deg]" : "rotate-[45deg]"
                        }`}
                      />
                    </button>

                    <div
                      id={`panel-${hub.id}`}
                      hidden={!isOpen}
                      onPointerEnter={cancelClose}
                      onPointerLeave={scheduleClose}
                      className="absolute inset-x-0 top-[var(--header-height)] border-t border-line bg-ground"
                    >
                      <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-x-12 gap-y-8 px-[var(--gutter)] py-10 [grid-template-columns:minmax(0,18rem)_minmax(0,1fr)]">
                        <div>
                          <Link href={hub.href} className="group inline-block">
                            <span className="block text-heading-2 font-medium tracking-tight text-ink">
                              {hub.label}
                            </span>
                            <span className="mt-1 inline-block text-body-sm text-accent underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-base group-hover:decoration-accent">
                              Overview
                            </span>
                          </Link>
                          <p className="mt-4 max-w-[32ch] text-body-sm text-ink-secondary">
                            {hub.summary}
                          </p>
                        </div>
                        <ul className="m-0 grid list-none grid-cols-2 gap-x-8 gap-y-1 p-0 xl:grid-cols-3">
                          {featured.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block border-b border-line py-3 text-body-sm text-ink transition-colors duration-base hover:text-accent"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-6">
          <PortalLogin solid={solid} />
          <a
            href={site.phoneHref}
            className="hidden text-[0.84rem] font-medium whitespace-nowrap tabular deskfull:inline"
          >
            {site.phone}
          </a>
          <Link
            href={primaryCta.href}
            className={`hidden shrink-0 rounded-sm px-4 py-2.5 text-[0.84rem] font-medium whitespace-nowrap transition-colors duration-base cta:inline-flex ${
              solid
                ? "bg-primary text-on-primary hover:bg-ink"
                : "bg-ink-inverse text-ink hover:bg-accent-bright"
            }`}
          >
            {primaryCta.label}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
