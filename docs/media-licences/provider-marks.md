# Lender, provider and partner marks

- **Asset path:** `public/media/lenders/` (as supplied),
  `public/media/lenders/web/` (trimmed derivatives)
- **Used by:** homepage logo marquee — **development preview only**
- **Count:** 37 marks
- **Source:** supplied by the firm
- **Licence type:** [FIRM CONFIRMATION REQUIRED] — per mark, one of:
  written permission from the brand owner, or confirmed intermediary
  brand-usage rights covering this website
- **Licence reference:** [FIRM CONFIRMATION REQUIRED] — per mark
- **Copyright holder:** each respective brand owner, not Guide
- **Permitted use:** [FIRM CONFIRMATION REQUIRED]
- **Attribution required:** [FIRM CONFIRMATION REQUIRED]
- **Cleared by:** [FIRM CONFIRMATION REQUIRED] (name, date)

## Status

**Not cleared for publication.** All 37 are `permissionConfirmed: false` in
`content/providers.ts` and render only under the development preview. Production
shows placeholder slots. Tracked as `providers.list`, blocking launch.

## What "permission" has to mean here

These are third-party trade marks. Three things are commonly assumed and none of
them is a licence:

- **Being on a lender's panel.** A distribution relationship rarely grants brand
  usage by itself; most lenders publish separate intermediary brand guidelines.
- **The file being downloadable.** A media or broker-portal download is a
  convenience, not permission, and usually carries its own terms.
- **Other brokers doing it.** Widespread practice is not a defence.

Several of the supplied marks are explicitly the intermediary-facing variants —
Bank of Ireland UK Intermediaries, The Co-operative Bank for intermediaries,
Principality Intermediaries, Skipton For Intermediaries. Those exist precisely
because their use is governed by the lender's intermediary brand terms, so the
terms should be on file.

## Derivation

`scripts/prepare-logos.mjs` trims transparent margin only. No mark was cropped
into, rescaled on one axis, or recoloured. Reproduce with sharp:
`.trim({threshold: 1})`.
