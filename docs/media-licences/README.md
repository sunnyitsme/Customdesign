# Media licence records

One file per asset (or per coherent set), named after the asset. No file goes
into `public/media/` until its record here is complete and the rights column
says something a lawyer would accept.

## Why this exists

"Free download" is not a licence. Neither is "it was on their press page", "it
came from a Google image search", or "the stock site let me export it". Several
of the largest stock libraries publish free previews under terms that forbid
commercial use, forbid use by a financial services firm, or require attribution
that the site does not carry.

A regulated firm publishing an image it cannot evidence a right to is a legal
exposure, not a design detail. The record is the evidence.

## Required fields

Copy `TEMPLATE.md`. Every field is required; `[FIRM CONFIRMATION REQUIRED]` is a
valid value while the answer is genuinely outstanding, and is what keeps the
asset out of a launch build.

| Field | Why |
|---|---|
| Asset path | The exact file under `public/media/` |
| Source | Where it came from, with a URL |
| Licence type | Owned outright / commissioned / stock licence / permission granted |
| Licence reference | Order number, contract, or email thread — something retrievable |
| Holder | Who owns the copyright |
| Permitted use | Commercial? Web? Financial services? Perpetual? |
| Attribution | Required text, or "none required" |
| Model / property release | Required for identifiable people and some buildings |
| Cleared by | Who at the firm confirmed it, and when |

## Identifiable people

Any photograph containing a recognisable face needs a model release, including
adviser portraits. Do not generate, composite, or substitute a portrait for a
real named person under any circumstances — see `content/pending.ts` →
`team.current`.

## Buildings

Some buildings carry their own restrictions on commercial photography. UK
freedom of panorama is comparatively generous for permanent public structures,
but it is not universal, and interiors are usually governed by the venue's own
terms rather than by copyright.
