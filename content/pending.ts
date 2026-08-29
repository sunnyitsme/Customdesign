/**
 * Registry of every unapproved placeholder in the build.
 *
 * This exists so missing content is tracked in code rather than in someone's
 * memory. `scripts/check-pending.mjs` reads it: it always prints a prominent
 * report, and exits non-zero under GUIDE_STRICT_CONTENT=1 so a launch build
 * cannot ship unresolved critical placeholders.
 *
 * See docs/01-content-and-assets-required.md for the full brief to the firm.
 */

export type Blocks = 'launch' | 'review' | 'later';
export type PendingStatus = 'placeholder' | 'approved';

export interface PendingItem {
  readonly id: string;
  /** What is missing. */
  readonly what: string;
  /** Who has to supply it. */
  readonly from: string;
  readonly blocks: Blocks;
  readonly status: PendingStatus;
}

export const pendingContent: readonly PendingItem[] = [
  {
    id: 'hero.video',
    what: 'London financial-district footage with confirmed ownership or licence, plus a poster still.',
    from: 'Firm — see docs/01-content-and-assets-required.md §2',
    blocks: 'launch',
    status: 'placeholder',
  },
  {
    id: 'hero.copy',
    what: 'Approved headline and supporting line. Positioning copy for a regulated firm needs sign-off.',
    from: 'Firm / compliance',
    blocks: 'launch',
    status: 'placeholder',
  },
  {
    id: 'brand.identity',
    what: 'Logo SVG, brand colour values, licensed typefaces. The current palette and type are provisional.',
    from: 'Firm — see docs/02-decisions.md D-003',
    blocks: 'launch',
    status: 'placeholder',
  },
  {
    id: 'divisions.positioning',
    what: 'Approved positioning line for each of the four divisions.',
    from: 'Firm / compliance',
    blocks: 'review',
    status: 'placeholder',
  },
  {
    id: 'photography',
    what: 'Architectural, London, interior and client-meeting photography, owned or licensed.',
    from: 'Firm — see docs/01-content-and-assets-required.md §12',
    blocks: 'review',
    status: 'placeholder',
  },
  {
    id: 'conflicts.contact',
    what: 'Address, email and office count conflict between the public site and the legal PDFs.',
    from: 'Firm — see docs/02-decisions.md D-006',
    blocks: 'launch',
    status: 'placeholder',
  },
];

export const unresolved = (): readonly PendingItem[] =>
  pendingContent.filter((item) => item.status === 'placeholder');

export const unresolvedBlocking = (): readonly PendingItem[] =>
  unresolved().filter((item) => item.blocks === 'launch');
