import { site } from "./site";

/**
 * Office locations.
 *
 * Addresses come verbatim from the migration pack's global data. The pack also
 * records that the sources disagree — the company page names three offices and
 * the footer lists four — so every location carries that unresolved conflict
 * rather than the site quietly picking a version.
 *
 * No local claim is made: no "serving the North West since…", no local team
 * count, no coverage area. None of that is documented.
 */
export interface Location {
  readonly slug: string;
  readonly city: string;
  readonly address: string;
  /** Approved local copy. Null until supplied. */
  readonly intro: string | null;
}

export const locations: readonly Location[] = site.offices.map((office) => ({
  slug: office.city.toLowerCase(),
  city: office.city,
  address: office.address,
  intro: null,
}));

export const locationBySlug = (slug: string) =>
  locations.find((location) => location.slug === slug);
