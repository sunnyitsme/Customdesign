import { allServicePages } from "@/content/service-pages";
import { cases } from "@/content/cases";
import { locations } from "@/content/locations";
import { team } from "@/content/team";

/**
 * Every public route, in one place.
 *
 * The sitemap and the route tests both read this, so a page that exists but is
 * missing from the sitemap — or a sitemap entry that 404s — is a test failure
 * rather than something discovered in production.
 */
export const staticRoutes: readonly string[] = [
  "/",
  "/mortgages",
  "/mortgages/guides",
  "/property-finance",
  "/protection",
  "/protection/business",
  "/wills-estate-planning",
  "/about",
  "/about/our-company",
  "/about/our-team",
  "/about/how-we-work",
  "/locations",
  "/insights",
  "/insights/guides",
  "/insights/news",
  "/insights/faqs",
  "/insights/case-studies",
  "/calculators",
  "/calculators/mortgage-repayment",
  "/calculators/overpayment",
  "/calculators/stamp-duty",
  "/calculators/mortgage-borrowing",
  "/calculators/affordability",
  "/contact",
  "/privacy",
  "/cookies",
  "/terms-of-business",
  "/complaints",
  "/accessibility",
];

export const serviceRoutes: readonly string[] = allServicePages.map(
  (page) => `/${page.parent}/${page.slug}`,
);

export const teamRoutes: readonly string[] = team.map(
  (member) => `/about/team/${member.slug}`,
);

export const locationRoutes: readonly string[] = locations.map(
  (location) => `/locations/${location.slug}`,
);

export const caseRoutes: readonly string[] = cases.map(
  (entry) => `/insights/case-studies/${entry.id}`,
);

export const allRoutes: readonly string[] = [
  ...staticRoutes,
  ...serviceRoutes,
  ...teamRoutes,
  ...locationRoutes,
  ...caseRoutes,
];
