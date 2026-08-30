/**
 * Lenders and providers.
 *
 * The migration pack records that the current homepage carries a partner and
 * membership logo section, but does NOT record which logos it contains. No
 * lender or provider is therefore named here — naming one would assert a
 * relationship we cannot evidence.
 *
 * `logo: null` renders a labelled placeholder plate. Displaying a third-party
 * mark also needs written permission, which is a separate approval from the
 * list itself.
 *
 * Wording stays "Lenders & Providers We Work With" until the firm supplies
 * approved relationship wording. Nothing here implies a partnership.
 */

export interface Provider {
  readonly id: string;
  /** Approved display name. Null until the firm supplies the list. */
  readonly name: string | null;
  /** Path to an SVG mark. Null until supplied with permission to display it. */
  readonly logo: string | null;
}

/** Placeholder slots, sized to show the marquee's rhythm and normalisation. */
export const providers: readonly Provider[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `provider-${index + 1}`,
    name: null,
    logo: null,
  }),
);

export const providersHeading = "Lenders & Providers We Work With";
