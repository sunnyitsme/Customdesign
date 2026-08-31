import { allServicePages } from "./service-pages/index.ts";

/**
 * Legacy URL migration.
 *
 * Every public URL recorded in reference/current-guide-site/source-urls.txt is
 * accounted for. Service-page redirects are DERIVED from each page's own
 * `legacyUrls`, so a page and its inherited URLs cannot drift apart.
 *
 * Per docs/02-decisions.md D-002 there is no many-to-one consolidation of the
 * long-tail service pages: each legacy page has its own destination. The only
 * many-to-one is the single legacy wills page, which genuinely covered four
 * subjects and now has four destinations — it points at the hub.
 *
 * The two legal PDFs keep their existing absolute URLs and are not redirected;
 * external references and regulatory citations must continue to resolve.
 */
export interface Redirect {
  readonly source: string;
  readonly destination: string;
  readonly permanent: true;
}

/** Redirects implied by each service page's inherited legacy URLs. */
const fromServicePages: readonly Redirect[] = allServicePages.flatMap((page) =>
  page.legacyUrls.map((source) => ({
    source,
    destination: `/${page.parent}/${page.slug}`,
    permanent: true as const,
  })),
);

/** Hubs, company pages and calculators, which have no single owning service. */
const structural: readonly Redirect[] = [
  {
    source: "/gfs-our-company",
    destination: "/about/our-company",
    permanent: true,
  },
  { source: "/our_team", destination: "/about/our-team", permanent: true },
  {
    source: "/gfs-how-we-work",
    destination: "/about/how-we-work",
    permanent: true,
  },
  { source: "/testimonials", destination: "/insights", permanent: true },
  { source: "/faq", destination: "/insights/faqs", permanent: true },
  {
    source: "/gfs-lending-and-property-finance",
    destination: "/property-finance",
    permanent: true,
  },
  {
    source: "/why-protection-is-important",
    destination: "/protection",
    permanent: true,
  },
  {
    source: "/introduction-to-business-insurance",
    destination: "/protection/business",
    permanent: true,
  },
  {
    source: "/gfs-wills-writing",
    destination: "/wills-estate-planning",
    permanent: true,
  },
  { source: "/contact", destination: "/contact", permanent: true },
  // Calculators. The legacy pages embedded third-party WEBPRO iframes; the new
  // destinations are Guide-owned, and two of them deliberately do not compute.
  {
    source: "/gfs-mortgage-repayment",
    destination: "/calculators/mortgage-repayment",
    permanent: true,
  },
  {
    source: "/gfs-mortgage-borrow",
    destination: "/calculators/mortgage-borrowing",
    permanent: true,
  },
  {
    source: "/gfs-how-much-can-i-borrow",
    destination: "/calculators/affordability",
    permanent: true,
  },
  {
    source: "/gfs-overpayment",
    destination: "/calculators/overpayment",
    permanent: true,
  },
  {
    source: "/gfs-stamp-duty",
    destination: "/calculators/stamp-duty",
    permanent: true,
  },
];

/** Deduplicated: several wills subjects share one legacy URL. */
export const redirects: readonly Redirect[] = (() => {
  const seen = new Set<string>();
  const out: Redirect[] = [];
  for (const entry of [...structural, ...fromServicePages]) {
    // A redirect to itself is a loop; /contact already exists at its own path.
    if (entry.source === entry.destination) continue;
    if (seen.has(entry.source)) continue;
    seen.add(entry.source);
    out.push(entry);
  }
  return out;
})();
