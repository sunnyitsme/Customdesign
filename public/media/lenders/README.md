# Lender, provider and partner marks

## Two folders

| | |
|---|---|
| `*.png` here | **As supplied.** Never modified, moved or renamed. |
| `web/` | **Generated.** What the site actually renders. |

Regenerate after adding or replacing a file:

```bash
node scripts/prepare-logos.mjs
```

## Why the derivatives exist

Each supplied file sits on a common ~385 × 311 canvas with the artwork centred
inside a lot of transparent padding — the padding is 16–83% of the canvas height
depending on the mark. The marquee slot is 176 × 48, so fitting a whole canvas
into it renders the artwork about 60px wide and a wordmark becomes unreadable.

`prepare-logos.mjs` trims each file to its own artwork. That removes empty
transparent margin and nothing else: no crop into the mark, no scaling of one
axis, no recolouring. Trimmed aspect ratios run from 0.68:1 (Bank of Ireland) to
7.14:1 (iPipeline), and every mark then fills one identical slot via
`object-fit: contain`.

## Permission — nothing here is cleared to publish

Having the file is not the right to publish it, and an intermediary relationship
is not automatically a brand licence.

Every entry in `content/providers.ts` is `permissionConfirmed: false`. The marks
render **only** because `devLogoPreview` is on outside production, so the firm
can review the strip with real artwork. A production deployment renders neutral
placeholder slots instead — verified by building with `VERCEL_ENV=production`,
where no logo path appears in the HTML or the client bundle at all.

To publish a mark: record the evidence in `docs/media-licences/`, then set both
`permissionConfirmed: true` and `licenceRecord` on that provider.

## Classification

The supplied set mixes mortgage lenders, protection providers and
professional/platform partners. Nothing is classified yet — every entry is
`"unclassified"`. The `ProviderCategory` axis exists so the split into Lenders /
Providers / Professional Partners is a data edit, not a refactor.

## Folder note

The media architecture (`public/media/README.md`) reserves `providers/` for
these marks. They live in `lenders/` for now because that is where they were
supplied and the firm asked that nothing be moved yet. When the folder is
settled, change `WEB_DIR` in `content/providers.ts` and the two paths at the top
of `scripts/prepare-logos.mjs`.
