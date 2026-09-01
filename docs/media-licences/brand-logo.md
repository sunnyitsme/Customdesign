# Guide Financial Services logo

- **Asset path:** `public/media/brand/guide-logo.png` (web master),
  `public/media/brand/guide-logo-original.png` (as supplied)
- **Used by:** site header, mobile navigation drawer, footer — every page
- **Source:** supplied by the firm for this rebuild
- **Licence type:** the firm's own trade mark / brand asset
- **Licence reference:** not applicable — first-party asset
- **Copyright holder:** [FIRM CONFIRMATION REQUIRED] — Asset Guide Limited, or
  the design agency that produced it. If an agency drew it, confirm the contract
  assigns or licences copyright to Guide: under UK law, commissioning a design
  does not transfer copyright by default.
- **Permitted use:** first-party use on the firm's own website
- **Attribution required:** none
- **Model / property release:** not applicable
- **Cleared by:** [FIRM CONFIRMATION REQUIRED] (name, date)

## Derivation

The supplied file is 24549 × 9083 (223 MP, 1.2 MB), exported at 1000 DPI from a
vector source. The web master is the same artwork with its transparent margin
trimmed (to 16889 × 5417) and resized to 900 × 289 — 38.5 KB. Nothing was
recoloured, redrawn, cropped into, or otherwise altered; the trim removes empty
canvas only, and it was symmetric (3830px each side, ~1800px top and bottom).

Reproduce with `sharp`: `.trim({threshold: 1}).resize({width: 900})`.

## Notes

The lockup includes the strapline **"YOUR LOCAL ADVISOR"**. That is the firm's
own supplied wording and is reproduced as part of the mark, not written here. At
header size it renders around 4px tall and reads as part of the logo rather than
as legible copy — which is normal for a lockup, but worth knowing if the firm
expects that line to be readable.

WCAG 1.4.3 exempts logotypes from minimum contrast, so the orange at 3.76:1 on
the light ground is not a violation. The black at 1.21:1 on navy is not a
violation either, but it is unreadable, which is why the dark placements carry a
backing plaque. See `public/media/brand/README.md`.
