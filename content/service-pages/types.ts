/**
 * Service page content model.
 *
 * Child service pages are data, not forty hand-written files: each entry below
 * declares which composition it uses, and the renderer picks the layout. That
 * keeps the family coherent without turning into a page builder, and the shape
 * maps directly onto Payload collections later.
 *
 * `scope` is the one field always populated from the migration pack — it states
 * what the service *is*, which is documented. Everything that would assert how
 * Guide performs, what it costs, or what a lender will do stays null and renders
 * as a marked placeholder.
 */

/** Composition, chosen by content intent. Never surfaced to users. */
export type ServiceVariant =
  | "standard" // a mainstream service with a clear audience
  | "complex" // multi-party or structured borrowing
  | "educational" // explains a product type rather than selling a service
  | "commercial" // transaction-led, institutional register
  | "privateClient"; // estate planning and personal legacy work

export type ServiceParent =
  | "mortgages"
  | "mortgages/guides"
  | "property-finance"
  | "protection"
  | "protection/business"
  | "wills-estate-planning";

export interface ServiceFaq {
  readonly question: string;
  /** Null until the firm approves an answer. Never guessed. */
  readonly answer: string | null;
}

export interface ServicePage {
  readonly slug: string;
  readonly parent: ServiceParent;
  /** H1 and breadcrumb label. */
  readonly title: string;
  /** Short label for navigation and related-service lists. */
  readonly navLabel: string;
  readonly variant: ServiceVariant;
  /** Documented scope from the migration pack. Safe to render. */
  readonly scope: string;
  /** Approved marketing introduction. Null => placeholder. */
  readonly intro: string | null;
  /** Who the service is for. Derived from documented scope only. */
  readonly audience: readonly string[];
  /** Things a reader should know. Factual, non-promissory. */
  readonly considerations: readonly string[];
  readonly faqs: readonly ServiceFaq[];
  /** Contextual links, by href. */
  readonly related: readonly string[];
  /** Legacy URLs this page inherits, for the SEO migration document. */
  readonly legacyUrls: readonly string[];
  /** Topics needing compliance sign-off before this page is published. */
  readonly complianceFlags?: readonly string[];
  readonly imageAlt: string;
  /** Context-aware CTA. Falls back to the global wording when absent. */
  readonly ctaLabel?: string;
}

export const hubPath = (parent: ServiceParent) => `/${parent}`;
export const servicePath = (page: ServicePage) =>
  `/${page.parent}/${page.slug}`;
