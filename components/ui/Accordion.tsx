"use client";

import { useId, useState, type ReactNode } from "react";

export interface AccordionItem {
  readonly question: string;
  readonly answer: ReactNode;
}

/**
 * FAQ disclosure list.
 *
 * Plain buttons with aria-expanded and aria-controls rather than <details>,
 * so the open state is controlled and the styling is consistent with the
 * header's disclosures. One item open at a time is not enforced — readers
 * comparing two answers should be able to.
 */
export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <ul className="m-0 list-none border-t border-line p-0">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const panelId = `${baseId}-panel-${index}`;
        return (
          <li key={item.question} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="text-heading-3 font-medium text-ink">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`relative mt-1.5 block h-3 w-3 shrink-0 transition-transform duration-base ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <span className="absolute top-1/2 left-0 h-px w-full bg-accent" />
                <span className="absolute top-0 left-1/2 h-full w-px bg-accent" />
              </span>
            </button>
            <div id={panelId} hidden={!isOpen} className="pb-7">
              <div className="max-w-[62ch] text-body-lg text-ink-secondary">
                {item.answer}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
