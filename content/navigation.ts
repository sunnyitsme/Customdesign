import {
  businessProtectionPages,
  mortgageGuides,
  mortgagePages,
  propertyFinancePages,
  protectionPages,
  willsPages,
  type ServicePage,
} from "./service-pages";

/**
 * Navigation architecture.
 *
 * Six primary hubs. Long-tail service pages remain real routes for SEO and
 * content purposes but are NOT all surfaced here — the desktop menu is curated.
 * See docs/02-decisions.md D-002.
 *
 * Hub children are DERIVED from the service content rather than listed by hand.
 * A hand-written list drifts: a slug changes and the menu quietly points at a
 * 404. Deriving them means a link can only exist if the page does.
 *
 * `featured` names the slugs the mega-menu panel shows, so curation stays a
 * content decision.
 */

export interface NavChild {
  readonly label: string;
  readonly href: string;
  /** Surfaced in the desktop mega-menu panel. */
  readonly featured: boolean;
}

export interface NavHub {
  /** Stable id, used for aria-controls on the mega-menu disclosure. */
  readonly id: string;
  readonly label: string;
  readonly href: string;
  /** One line describing the division, shown in the panel. */
  readonly summary: string;
  readonly children: readonly NavChild[];
}

const toChildren = (
  pages: readonly ServicePage[],
  featured: readonly string[],
): readonly NavChild[] =>
  pages.map((page) => ({
    label: page.navLabel,
    href: `/${page.parent}/${page.slug}`,
    featured: featured.includes(page.slug),
  }));

export const hubs: readonly NavHub[] = [
  {
    id: "mortgages",
    label: "Mortgages",
    href: "/mortgages",
    summary:
      "Residential advice across the whole of market, from first purchase to refinancing.",
    children: [
      ...toChildren(mortgagePages, [
        "first-time-buyers",
        "remortgaging",
        "buy-to-let",
        "high-value-mortgages",
        "self-employed",
      ]),
      ...toChildren(mortgageGuides, []),
    ],
  },
  {
    id: "property-finance",
    label: "Property Finance",
    href: "/property-finance",
    summary: "Specialist funding for investors, landlords and developers.",
    children: toChildren(propertyFinancePages, [
      "bridging",
      "development-finance",
      "commercial-finance",
      "portfolio-landlords",
    ]),
  },
  {
    id: "protection",
    label: "Protection",
    href: "/protection",
    summary:
      "Cover for households and businesses against death, illness and loss of income.",
    children: [
      ...toChildren(protectionPages, [
        "life-assurance",
        "income-protection",
        "critical-illness",
      ]),
      {
        label: "Business protection",
        href: "/protection/business",
        featured: true,
      },
      ...toChildren(businessProtectionPages, []),
    ],
  },
  {
    id: "wills-estate-planning",
    label: "Wills & Estate Planning",
    href: "/wills-estate-planning",
    summary:
      "Wills, mirror wills, trust wills, and reviews as circumstances change.",
    children: toChildren(willsPages, [
      "wills",
      "mirror-wills",
      "trust-wills",
      "will-reviews",
    ]),
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    summary: "The firm, the people and how we work.",
    children: [
      { label: "Our company", href: "/about/our-company", featured: true },
      { label: "Our team", href: "/about/our-team", featured: true },
      { label: "How we work", href: "/about/how-we-work", featured: true },
      { label: "Locations", href: "/locations", featured: true },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    href: "/insights",
    summary:
      "Commentary on lending conditions, property finance and protection.",
    // Deliberately no featured children: a dropdown here widened the desktop
    // nav by ~5px and pushed the nav-to-actions gap to 55px, below the header's
    // measured >=56px guarantee (docs/02-decisions.md D-002). The header
    // architecture is frozen, so Insights stays a direct link and its four
    // categories lead the hub page instead — which is where a reader browsing
    // insights is going anyway.
    children: [
      { label: "Guides", href: "/insights/guides", featured: false },
      {
        label: "Case studies",
        href: "/insights/case-studies",
        featured: false,
      },
      { label: "FAQs", href: "/insights/faqs", featured: false },
      { label: "News", href: "/insights/news", featured: false },
    ],
  },
];

/** Utility actions. Client and adviser portals are external systems. */
export const utilityNav = [
  {
    label: "Client login",
    href: "https://client.guidemortgages.co.uk",
    external: true,
  },
  {
    label: "Advisor login",
    href: "https://crm.guidemortgages.co.uk",
    external: true,
  },
] as const;

export const primaryCta = {
  label: "Speak to an adviser",
  href: "/contact",
} as const;

/** Every internal href the navigation exposes — used by the link tests. */
export const allNavHrefs: readonly string[] = [
  ...hubs.map((hub) => hub.href),
  ...hubs.flatMap((hub) => hub.children.map((child) => child.href)),
  primaryCta.href,
];
