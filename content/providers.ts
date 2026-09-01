/**
 * Lenders and providers.
 *
 * The migration pack records that the current homepage carries a partner and
 * membership logo section, but does NOT record which logos it contains. No
 * lender or provider is therefore named here — naming one would assert a
 * relationship we cannot evidence.
 *
 * Wording stays "Lenders & Providers We Work With" until the firm supplies
 * approved relationship wording. Nothing here implies a partnership.
 *
 * ## Why permission is a field
 *
 * A lender's logo is that lender's trade mark. Having the file is not the same
 * as having the right to publish it, and an intermediary relationship is not
 * automatically a brand licence. So permission is tracked as data that has to
 * be set deliberately, rather than as something a developer remembers to check:
 * `canDisplayLogo` is the ONLY way a mark reaches the page, and it fails closed.
 *
 * Note this is stricter than "hide it in production". An unpermissioned mark is
 * not displayed anywhere, in any environment, because the exposure is the
 * publication itself and preview URLs are shareable.
 *
 * See public/media/providers/README.md and docs/media-licences/.
 */

export interface Provider {
  readonly id: string;
  /** Approved display name. Null until the firm supplies the list. */
  readonly name: string | null;
  /** Path under /media/providers/. Null until supplied. */
  readonly logo: string | null;
  /**
   * Written permission from the provider, or confirmed intermediary
   * brand-usage rights covering this site, evidenced in docs/media-licences/.
   * Never set true on the basis that a file was findable.
   */
  readonly permissionConfirmed: boolean;
  /** Licence record filename under docs/media-licences/. */
  readonly licenceRecord: string | null;
}

/** Placeholder slots, sized to show the marquee's rhythm and normalisation. */
export const providers: readonly Provider[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `provider-${index + 1}`,
    name: null,
    logo: null,
    permissionConfirmed: false,
    licenceRecord: null,
  }),
);

/**
 * Whether a mark may be rendered. Fails closed: every condition must hold.
 * A provider that fails this renders a neutral slot, never a name-only chip —
 * a bare lender name asserts the same relationship the logo would.
 */
export const canDisplayLogo = (provider: Provider): boolean =>
  provider.logo !== null &&
  provider.name !== null &&
  provider.permissionConfirmed &&
  provider.licenceRecord !== null;

export const providersHeading = "Lenders & Providers We Work With";
