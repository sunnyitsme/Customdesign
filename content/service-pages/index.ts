import { mortgageGuides, mortgagePages } from "./mortgages";
import { propertyFinancePages } from "./property-finance";
import { businessProtectionPages, protectionPages } from "./protection";
import type { ServicePage, ServiceParent } from "./types";
import { willsPages } from "./wills";

export * from "./types";
export { mortgagePages, mortgageGuides } from "./mortgages";
export { propertyFinancePages } from "./property-finance";
export { protectionPages, businessProtectionPages } from "./protection";
export { willsPages, plannedWillsRoutes } from "./wills";

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
