# Brand

## Files

| File | What it is |
|---|---|
| `guide-logo.png` | **The web master.** 900 × 289, 38.5 KB. This is what the site renders. |
| `guide-logo-original.png` | The file as supplied, byte-for-byte. 24549 × 9083, 1.2 MB. Nothing references it. |

The supplied original is a 223-megapixel export — around 890 MB once decoded,
which is far past what `next/image` will process per request. The web master is
that same artwork with its transparent margin trimmed and resized down; it was
exported at 1000 DPI from a vector source, so the reduction is visually lossless.
The original is kept only so the derivation can be redone if the sizing ever
needs to change.

**Do not point code at `guide-logo-original.png`.** It will stall or fail the
image optimiser.

## Using it

Never reference either file directly. `components/ui/BrandLogo.tsx` owns the
path, the intrinsic dimensions, the alt text and the contrast treatment.

```tsx
<BrandLogo />                              // light header
<BrandLogo tone="dark" />                  // any navy ground
<BrandLogo size="footer" tone="dark" />
```

## Contrast

The artwork is black plus one orange (`#E74423`) on transparency. Measured:

| | |
|---|---|
| black on the light ground `#F6F8FB` | 19.74 |
| black on navy `#0D1B2A` | **1.21** |
| black on the dark-tone plaque | 17.55 |

On navy the wordmark is effectively invisible, so `tone="dark"` sets the mark on
a restrained warm-white plaque. The artwork itself is never recoloured — a trade
mark is not ours to repaint, and no official reversed version has been supplied.
If one ever is, point `tone="dark"` at it and drop the plaque.

## Still outstanding

Tracked in `content/pending.ts`:

- `brand.identity` — an SVG master. A PNG cannot scale losslessly.
- `brand.logoReversed` — a light version for dark grounds, which would retire the plaque.
- `brand.favicon` — no icon asset exists. One was **not** derived by cropping the
  lockup; that would be inventing a mark the firm has not approved.
- `brand.paletteAlignment` — the logo is black/orange, the site palette is
  navy/royal/gold. They share no colour, and neither was altered to suit the other.

Licence record: `docs/media-licences/brand-logo.md`.
