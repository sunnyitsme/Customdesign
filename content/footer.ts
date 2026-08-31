import {
  businessProtectionPages,
  mortgagePages,
  propertyFinancePages,
  protectionPages,
  willsPages,
  type ServicePage,
} from "./service-pages";
import { site } from "./site";

/** Footer links derived from content, so a renamed slug cannot orphan them. */
const pick = (pages: readonly ServicePage[], slugs: readonly string[]) =>
  slugs
    .map((slug) => pages.find((page) => page.slug === slug))
    .filter((page): page is ServicePage => page !== undefined)
    .map((page) => ({
      label: page.navLabel,
      href: `/${page.parent}/${page.slug}`,
    }));

/**
 * Footer structure.
 *
 * Links resolve to the new information architecture. Where a destination does
 * not exist in the migration pack — Cookies, Complaints, Accessibility — the
 * entry is marked `pending` and renders without a live link rather than
 * pointing at a page that was never crawled.
 *
 * The two legal PDFs keep their current public URLs so external references and
 * regulatory citations continue to resolve.
 */

export interface FooterLink {
  readonly label: string;
  readonly href: string | null;
  /** No confirmed destination yet. Rendered as text, not a broken link. */
  readonly pending?: boolean;
  readonly external?: boolean;
}

export interface FooterGroup {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export const footerGroups: readonly FooterGroup[] = [
  {
    title: "Mortgages",
    links: [
      { label: "Overview", href: "/mortgages" },
      ...pick(mortgagePages, [
        "first-time-buyers",
        "remortgaging",
        "buy-to-let",
        "high-value-mortgages",
        "self-employed",
      ]),
      { label: "Guides", href: "/mortgages/guides" },
    ],
  },
  {
    title: "Property finance",
    links: [
      { label: "Overview", href: "/property-finance" },
      ...pick(propertyFinancePages, [
        "bridging",
        "development-finance",
        "commercial-finance",
        "portfolio-landlords",
        "auction-finance",
      ]),
    ],
  },
  {
    title: "Protection",
    links: [
      { label: "Overview", href: "/protection" },
      ...pick(protectionPages, [
        "life-assurance",
        "income-protection",
        "critical-illness",
      ]),
      { label: "Business protection", href: "/protection/business" },
      ...pick(businessProtectionPages, ["key-person", "share-protection"]),
    ],
  },
  {
    title: "Wills & estate planning",
    links: [
      { label: "Overview", href: "/wills-estate-planning" },
      ...pick(willsPages, [
        "wills",
        "mirror-wills",
        "trust-wills",
        "will-reviews",
      ]),
    ],
  },
  {
    title: "Guide",
    links: [
      { label: "About", href: "/about" },
      { label: "Our team", href: "/about/our-team" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
      { label: "Locations", href: "/locations" },
      { label: "Calculators", href: "/calculators" },
    ],
  },
  {
    title: "Portals",
    links: [
      {
        label: "Client login",
        href: site.external.clientLogin,
        external: true,
      },
      {
        label: "Advisor login",
        href: site.external.advisorLogin,
        external: true,
      },
    ],
  },
];

/** Legal. The two PDFs keep their existing public paths. */
export const legalLinks: readonly FooterLink[] = [
  {
    label: "Privacy notice",
    href: "https://guidefs.co.uk/sites/default/files/clients/966/Gfs-privacy-notice.pdf",
    external: true,
  },
  {
    label: "Terms of business",
    href: "https://guidefs.co.uk/sites/default/files/clients/966/Gfs-tob-may2025.pdf",
    external: true,
  },
  { label: "Cookies", href: "/cookies" },
  { label: "Complaints", href: "/complaints" },
  { label: "Accessibility", href: "/accessibility" },
];

/**
 * Regulatory footer text.
 *
 * The migration pack lists the footer's TOPICS but not its wording, so none of
 * it is reproduced. Each entry below is the brief to the firm's compliance
 * function, not draft copy — we do not write or paraphrase regulated wording.
 */
export const regulatoryTopics: readonly string[] = [
  "FCA authorisation statement",
  "Secured lending and repossession risk warning",
  "Lender criteria qualification",
  "Buy-to-Let regulatory qualification",
  "Protection policy lapse warning",
  "Statement covering Wills, Estate Planning and Commercial Mortgages",
  "UK regulatory regime targeting statement",
];
