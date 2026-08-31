import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PendingContent } from "@/components/ui/PendingContent";
import { footerGroups, legalLinks, regulatoryTopics } from "@/content/footer";
import { site, sourceConflicts } from "@/content/site";

/**
 * Site footer.
 *
 * Three registers, deliberately weighted: the navigation groups read normally,
 * the offices sit beside them as a quiet block, and the regulatory area is
 * pushed to a smaller, lower-contrast band at the bottom — readable, but not
 * competing with the closing CTA above it.
 *
 * Two honesty rules are enforced structurally:
 *
 *   - Cookies, Complaints and Accessibility have no confirmed destination in
 *     the migration pack, so they render as plain text rather than links that
 *     go nowhere.
 *   - The regulatory wording itself is NOT drafted here. The pack records the
 *     footer's topics but not its text, and paraphrasing regulated wording is
 *     not ours to do. Each topic is listed as a brief to compliance instead.
 */
export function SiteFooter() {
  return (
    <footer className="on-deep bg-deep text-ink-inverse">
      <Container className="pt-[var(--section-md)] pb-[var(--section-sm)]">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          {/* Navigation groups */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3"
          >
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-eyebrow font-medium tracking-[0.16em] text-ink-inverse-secondary uppercase">
                  {group.title}
                </h2>
                <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href === null ? (
                        <span className="text-body-sm text-ink-inverse-secondary">
                          {link.label}{" "}
                          <span className="text-accent-bright">[TBC]</span>
                        </span>
                      ) : link.external ? (
                        <a
                          href={link.href}
                          rel="noopener noreferrer"
                          className="text-body-sm text-ink-inverse transition-colors duration-base hover:text-accent-bright"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-body-sm text-ink-inverse transition-colors duration-base hover:text-accent-bright"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Offices */}
          <div>
            <h2 className="text-eyebrow font-medium tracking-[0.16em] text-ink-inverse-secondary uppercase">
              Offices
            </h2>
            <PendingContent
              tone="dark"
              label={`conflicts.contact — ${sourceConflicts.length} unresolved source conflicts`}
              className="mt-5"
            >
              <ul className="m-0 flex list-none flex-col gap-6 p-0">
                {site.offices.map((office) => (
                  <li key={office.city}>
                    <p className="text-body-sm font-medium text-ink-inverse">
                      {office.city}
                    </p>
                    <p className="mt-1 max-w-[30ch] text-body-sm text-ink-inverse-secondary">
                      {office.address}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[34ch] border-t border-line-inverse pt-5 text-body-sm text-accent-bright">
                The company page names three offices and the footer lists four.
                Contact address and email also differ between the public site
                and the legal PDFs. [FIRM CONFIRMATION REQUIRED]
              </p>
            </PendingContent>

            <div className="mt-8 border-t border-line-inverse pt-6">
              <a
                href={site.phoneHref}
                className="block text-body-lg font-medium tabular text-ink-inverse transition-colors duration-base hover:text-accent-bright"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-body-sm text-ink-inverse-secondary transition-colors duration-base hover:text-accent-bright"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Regulatory band — quiet, readable, and last. */}
      <div className="border-t border-line-inverse">
        <Container className="py-9">
          <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <PendingContent
              tone="dark"
              label="footer.regulatory — verbatim approved wording required"
            >
              <p className="max-w-[64ch] text-body-sm text-ink-inverse-secondary">
                {site.legalEntity}, trading as {site.tradingNames.join(" and ")}
                . Registered in England and Wales, company number{" "}
                {site.registrations.companyNumber}. FCA firm reference number{" "}
                {site.registrations.fcaFrn}. ICO registration{" "}
                {site.registrations.icoNumber}.
              </p>
              {/* Seven briefs to compliance, set as one line rather than seven.
                  As a stacked list it dominated the whole footer. */}
              <p className="mt-4 max-w-[70ch] text-body-sm text-ink-inverse-secondary">
                <span className="text-accent-bright">
                  [APPROVED WORDING REQUIRED]
                </span>{" "}
                {regulatoryTopics.join(" · ")}.
              </p>
            </PendingContent>

            <div>
              <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    {link.href === null ? (
                      <span className="text-body-sm text-ink-inverse-secondary">
                        {link.label}{" "}
                        <span className="text-accent-bright">[TBC]</span>
                      </span>
                    ) : (
                      <a
                        href={link.href}
                        rel="noopener noreferrer"
                        className="text-[0.8rem] text-ink-inverse-secondary transition-colors duration-base hover:text-accent-bright"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-body-sm text-ink-inverse-secondary">
                © {new Date().getFullYear()} {site.legalEntity}.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
