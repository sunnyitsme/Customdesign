import { site } from "./site";

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
      { label: "First-time buyers", href: "/mortgages/first-time-buyers" },
      { label: "Remortgaging", href: "/mortgages/remortgaging" },
      { label: "Buy-to-let", href: "/mortgages/buy-to-let" },
      { label: "High-value lending", href: "/mortgages/high-value" },
      { label: "Self-employed", href: "/mortgages/self-employed" },
    ],
  },
  {
    title: "Property finance",
    links: [
      { label: "Overview", href: "/property-finance" },
      { label: "Bridging finance", href: "/property-finance/bridging" },
      { label: "Development finance", href: "/property-finance/development" },
      { label: "Commercial mortgages", href: "/property-finance/commercial" },
      {
        label: "Portfolio landlord finance",
        href: "/property-finance/portfolio",
      },
      { label: "Auction finance", href: "/property-finance/auction" },
    ],
  },
  {
    title: "Protection",
    links: [
      { label: "Overview", href: "/protection" },
      { label: "Life assurance", href: "/protection/life-assurance" },
      { label: "Income protection", href: "/protection/income-protection" },
      { label: "Critical illness", href: "/protection/critical-illness" },
      { label: "Business protection", href: "/protection/business" },
    ],
  },
  {
    title: "Wills & estate planning",
    links: [
      { label: "Overview", href: "/wills-estate-planning" },
      {
        label: "Standard wills",
        href: "/wills-estate-planning/standard-wills",
      },
      { label: "Mirror wills", href: "/wills-estate-planning/mirror-wills" },
      { label: "Trust wills", href: "/wills-estate-planning/trust-wills" },
      { label: "Reviews & updates", href: "/wills-estate-planning/reviews" },
    ],
  },
  {
    title: "Guide",
    links: [
      { label: "About", href: "/about" },
      { label: "Our team", href: "/about/team" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
      { label: "Locations", href: "/locations" },
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
  { label: "Cookies", href: null, pending: true },
  { label: "Complaints", href: null, pending: true },
  { label: "Accessibility", href: null, pending: true },
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
