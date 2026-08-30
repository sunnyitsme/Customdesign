'use client';

import { useEffect, useRef, useState } from 'react';
import { utilityNav } from '@/content/navigation';

/**
 * Client and adviser portal access, as one compact disclosure.
 *
 * Both links inline cost 152px, which the header cannot afford: the bar is
 * capped at --container-max (1440px), so a wider viewport gives *less* content
 * width, not more, and the nav-to-actions gap sat at 25-36px at every width
 * from 1536 up. One control costs far less and restores a relaxed header.
 *
 * The link wording is untouched — "Client login" and "Advisor login" still read
 * exactly as they do in the drawer; only the container is new.
 *
 * Same disclosure pattern as the hub mega menus: a button with aria-expanded
 * and aria-controls, Escape to close, outside pointerdown to dismiss, and no
 * dependence on hover.
 *
 * Appears at 85rem (1360px), chosen by measurement rather than arithmetic. The
 * control is only 41px, but it has to clear the phone number switching on at
 * 82rem: at 1312 the gap falls to 39px and at 1344 it is still 53px. 1360px is
 * the first width that measures a relaxed 60px, and it only improves from
 * there. The phone's own breakpoint is deliberately untouched.
 */
export function PortalLogin({ solid }: { solid: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative hidden desknav:block"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="portal-login-panel"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 text-[0.8rem] whitespace-nowrap opacity-75 hover:opacity-100"
      >
        Login
        <span
          aria-hidden="true"
          className={`mt-px block h-1 w-1 border-r border-b border-current transition-transform duration-base ${
            open ? 'rotate-[-135deg]' : 'rotate-[45deg]'
          }`}
        />
      </button>

      <div
        id="portal-login-panel"
        hidden={!open}
        className={`absolute top-[calc(100%+0.75rem)] right-0 min-w-[11rem] border bg-ground py-1 ${
          solid ? 'border-line' : 'border-line-inverse'
        }`}
      >
        <ul className="m-0 list-none p-0">
          {utilityNav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-[0.8rem] whitespace-nowrap text-ink transition-colors duration-base hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
