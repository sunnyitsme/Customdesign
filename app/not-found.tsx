import Link from "next/link";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { hubs } from "@/content/navigation";
import { site } from "@/content/site";

export const metadata = {
  title: "Not built yet",
  robots: { index: false, follow: false },
};

/**
 * Staging not-found page.
 *
 * Only the homepage exists in this phase, so every navigation and footer link
 * resolves here. A bare framework 404 would read as a broken deployment during
 * review; this says plainly that the route is scheduled rather than missing,
 * and offers the way back.
 *
 * It makes no claim about Guide and introduces no content — it names the six
 * hubs already defined in the approved information architecture.
 */
export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="on-deep flex min-h-[70svh] items-center bg-deep py-[var(--section-md)] text-ink-inverse"
    >
      <Container>
        <DatumGrid>
          <Eyebrow tone="dark">Preview</Eyebrow>
          <div>
            <h1
              id="not-found-heading"
              className="max-w-[18ch] text-display-2 font-medium text-balance"
            >
              This page hasn&rsquo;t been built yet.
            </h1>

            <p className="mt-8 max-w-[52ch] text-body-lg text-ink-inverse-secondary">
              This is a review deployment of the Guide Financial Services
              rebuild. The homepage is complete; the section and service pages
              below are part of later phases, so their routes resolve here for
              now.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-sm bg-ink-inverse px-7 py-4 text-body-sm font-medium text-ink transition-colors duration-base hover:bg-accent-bright"
              >
                Back to the homepage
              </Link>
              <a
                href={site.phoneHref}
                className="text-body-lg font-medium tabular text-ink-inverse underline decoration-line-inverse-interactive underline-offset-[6px] transition-colors duration-base hover:decoration-accent-bright"
              >
                {site.phone}
              </a>
            </div>

            <ul className="m-0 mt-14 grid list-none grid-cols-2 border-t border-line-inverse p-0 lg:grid-cols-3">
              {hubs.map((hub) => (
                <li
                  key={hub.id}
                  className="border-b border-line-inverse py-4 text-body-sm text-ink-inverse-secondary"
                >
                  {hub.label}{" "}
                  <span className="text-accent-bright">[scheduled]</span>
                </li>
              ))}
            </ul>
          </div>
        </DatumGrid>
      </Container>
    </section>
  );
}
