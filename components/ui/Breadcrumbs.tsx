import Link from "next/link";

export interface Crumb {
  readonly label: string;
  /** Omitted on the current page, which is not a link. */
  readonly href?: string;
}

/**
 * Breadcrumbs for deep child pages.
 *
 * Emits JSON-LD alongside the visible trail so search engines get the same
 * hierarchy the reader sees. Hubs do not use this — they are one level down and
 * a trail there is clutter.
 */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-body-sm">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-ink-inverse-secondary">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-ink-inverse-secondary transition-colors duration-base hover:text-accent-bright"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-inverse">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
