import Link from "next/link";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ServicePage } from "@/content/service-pages";

/**
 * The list of services under a hub.
 *
 * `layout` changes how the set reads: "index" is a hairline-separated editorial
 * list for circumstance-led browsing; "columns" is a denser two-up for hubs
 * with more entries. Neither is a card grid.
 */
export function ServiceIndex({
  pages,
  eyebrow,
  heading,
  headingId,
  tone = "light",
  layout = "index",
  numbered = false,
}: {
  pages: readonly ServicePage[];
  eyebrow: string;
  heading: string;
  headingId: string;
  tone?: "light" | "dark";
  layout?: "index" | "columns";
  numbered?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      aria-labelledby={headingId}
      className={`border-t py-[var(--section-md)] ${dark ? "on-deep border-line-inverse bg-deep text-ink-inverse" : "border-line"}`}
    >
      <Container>
        <DatumGrid>
          <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>
          <h2
            id={headingId}
            className="max-w-[20ch] text-display-2 font-medium text-balance"
          >
            {heading}
          </h2>
        </DatumGrid>

        <ol
          className={`m-0 mt-12 list-none border-t p-0 ${dark ? "border-line-inverse" : "border-line"} ${
            layout === "columns" ? "grid gap-x-14 md:grid-cols-2" : ""
          }`}
        >
          {pages.map((page, index) => (
            <li
              key={page.slug}
              className={`border-b ${dark ? "border-line-inverse" : "border-line"}`}
            >
              <Link
                href={`/${page.parent}/${page.slug}`}
                className="group block py-7"
              >
                <div className="grid gap-x-8 gap-y-2 lg:grid-cols-[var(--datum-rail)_minmax(0,1fr)]">
                  {numbered ? (
                    <span
                      aria-hidden="true"
                      className={`text-eyebrow font-medium tabular uppercase ${dark ? "text-ink-inverse-secondary" : "text-ink-tertiary"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  <div>
                    <h3
                      className={`text-heading-1 font-medium tracking-tight text-balance transition-colors duration-base ${
                        dark
                          ? "group-hover:text-accent-bright"
                          : "group-hover:text-accent"
                      }`}
                    >
                      {page.navLabel}
                    </h3>
                    <p
                      className={`mt-3 max-w-[62ch] text-body-lg ${dark ? "text-ink-inverse-secondary" : "text-ink-secondary"}`}
                    >
                      {page.scope}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
