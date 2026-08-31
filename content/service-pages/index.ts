import { mortgageGuides, mortgagePages } from "./mortgages.ts";
import { propertyFinancePages } from "./property-finance.ts";
import { businessProtectionPages, protectionPages } from "./protection.ts";
import type { ServicePage, ServiceParent } from "./types.ts";
import { willsPages } from "./wills.ts";

export * from "./types.ts";
export { mortgagePages, mortgageGuides } from "./mortgages.ts";
export { propertyFinancePages } from "./property-finance.ts";
export { protectionPages, businessProtectionPages } from "./protection.ts";
export { willsPages, plannedWillsRoutes } from "./wills.ts";

/** Every published service page, across all hubs. */
export const allServicePages: readonly ServicePage[] = [
  ...mortgagePages,
  ...mortgageGuides,
  ...propertyFinancePages,
  ...protectionPages,
  ...businessProtectionPages,
  ...willsPages,
];

export const pagesFor = (parent: ServiceParent): readonly ServicePage[] =>
  allServicePages.filter((page) => page.parent === parent);

/** Resolve an href like /mortgages/buy-to-let back to its page. */
export const pageByHref = (href: string): ServicePage | undefined =>
  allServicePages.find((page) => `/${page.parent}/${page.slug}` === href);

/** Every route this content generates, for the sitemap and route tests. */
export const allServiceHrefs: readonly string[] = allServicePages.map(
  (page) => `/${page.parent}/${page.slug}`,
);
