'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { hubs, primaryCta } from '@/content/navigation';
import { site } from '@/content/site';
import { MobileNav } from './MobileNav';
import { PortalLogin } from './PortalLogin';

/**
 * Site header.
 *
 * Sits transparent over the hero and transitions to a solid surface once the
 * page scrolls. The desktop mega menu is a disclosure: each hub is a button
 * with aria-expanded controlling one panel. Pointer users get hover-to-open as
 * an enhancement, but nothing depends on hover — the same panel opens on click
 * and on keyboard focus.
 *
 * Breakpoint: the full navigation appears at 74rem (1184px), not at lg. Six
 * hubs measure 647px intrinsic; with the 128px wordmark, the 151px CTA and two
 * 24px group gaps that is 974px of content, which needs 1184px to sit inside
 * the fluid gutters with room to breathe. Below that the drawer stays active.
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!openHub) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenHub(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenHub(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openHub]);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenHub(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const solid = scrolled || openHub !== null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-slow ${
        solid ? 'border-b border-line bg-ground text-ink' : 'on-deep border-b border-transparent text-ink-inverse'
      }`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenHub(null);
      }}
    >
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[var(--container-max)] items-center justify-between gap-6 px-[var(--gutter)]">
        {/* Wordmark. No Guide logo asset exists — this is typographic, not a
            fabricated mark. See content/pending.ts brand.identity. */}
        <Link href="/" className="shrink-0 leading-none">
          <span className="block text-[1.0625rem] font-semibold tracking-[-0.02em]">Guide</span>
          <span className="mt-0.5 block text-[9px] font-medium tracking-[0.2em] uppercase opacity-70">
            Financial Services
          </span>
        </Link>

        <div ref={navRef} className="hidden shrink-0 min-[74rem]:block">
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
                          isOpen ? 'rotate-[-135deg]' : 'rotate-[45deg]'
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
                          <p className="mt-4 max-w-[32ch] font-prose text-body-sm text-ink-secondary">
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
          <a href={site.phoneHref} className="hidden text-[0.84rem] font-medium whitespace-nowrap tabular min-[82rem]:inline">
            {site.phone}
          </a>
          <Link
            href={primaryCta.href}
            className={`hidden shrink-0 rounded-sm px-4 py-2.5 text-[0.84rem] font-medium whitespace-nowrap transition-colors duration-base min-[74rem]:inline-flex ${
              solid ? 'bg-ink text-ink-inverse hover:bg-accent' : 'bg-ink-inverse text-ink hover:bg-accent-bright'
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
