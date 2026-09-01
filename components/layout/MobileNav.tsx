"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { hubs, primaryCta, utilityNav } from "@/content/navigation";
import { site } from "@/content/site";

/**
 * Mobile navigation.
 *
 * Uses a native <dialog> opened with showModal(): focus trapping, Escape to
 * close, background inertness and focus return to the trigger are all browser
 * behaviour. No focus-trap dependency, and more robust than hand-rolling it.
 *
 * Active below 74rem (1184px) — see SiteHeader for how that width was measured.
 */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      setOpen(false);
      setExpanded(null);
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  const openNav = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  const closeNav = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={openNav}
        aria-expanded={open}
        aria-label="Open navigation menu"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center desknav:hidden"
      >
        <span aria-hidden="true" className="relative block h-3 w-6">
          <span className="absolute top-0 left-0 h-px w-full bg-current" />
          <span className="absolute bottom-0 left-0 h-px w-full bg-current" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site navigation"
        className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-deep p-0 text-ink-inverse backdrop:bg-ink/70"
      >
        <div className="on-deep flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-line-inverse px-[var(--gutter)] py-5">
            {/* The drawer sits on bg-deep, so the mark takes the plaque. */}
            <BrandLogo size="drawer" tone="dark" />
            <button
              type="button"
              onClick={closeNav}
              aria-label="Close navigation menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center"
            >
              <span aria-hidden="true" className="relative block h-4 w-4">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="flex-1 px-[var(--gutter)] py-2">
            <ul className="m-0 list-none p-0">
              {hubs.map((hub) => {
                const featured = hub.children.filter((child) => child.featured);
                const isOpen = expanded === hub.href;
                return (
                  <li key={hub.href} className="border-b border-line-inverse">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={hub.href}
                        onClick={closeNav}
                        className="flex-1 py-4 text-heading-2 font-medium tracking-tight"
                      >
                        {hub.label}
                      </Link>
                      {featured.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : hub.href)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Hide" : "Show"} ${hub.label} services`}
                          className="inline-flex h-11 w-11 items-center justify-center"
                        >
                          <span
                            aria-hidden="true"
                            className={`relative block h-3 w-3 transition-transform duration-base ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          >
                            <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                            <span className="absolute top-0 left-1/2 h-full w-px bg-current" />
                          </span>
                        </button>
                      )}
                    </div>
                    {isOpen && featured.length > 0 && (
                      <ul className="m-0 list-none border-t border-line-inverse/60 p-0 pb-3">
                        {featured.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeNav}
                              className="block py-2.5 text-body-sm text-ink-inverse-secondary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-line-inverse px-[var(--gutter)] py-6">
            <Link
              href={primaryCta.href}
              onClick={closeNav}
              className="mb-5 flex w-full items-center justify-center rounded-sm bg-ink-inverse px-6 py-4 text-body-sm font-medium text-ink"
            >
              {primaryCta.label}
            </Link>
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {utilityNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-body-sm text-ink-inverse-secondary"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.phoneHref}
                  className="text-body-sm text-ink-inverse-secondary tabular"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
