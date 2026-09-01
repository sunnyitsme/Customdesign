# Media

Every image and video the site can render. The folder layout mirrors the route
tree, so the file a page wants is always at a predictable path:

```
media/
  home/hero/            homepage cinematic video + poster still
  home/sections/        supporting homepage stills
  <hub>/hero.jpg        hub page hero            e.g. mortgages/hero.jpg
  <hub>/<slug>.jpg      service page hero        e.g. mortgages/buy-to-let.jpg
  mortgages/guides/     guide page heroes
  protection/business/  business protection page heroes
  about/ locations/ insights/ contact/ calculators/
  team/                 adviser portraits
  providers/            lender and provider marks
```

## How pages consume this

Nothing here is imported by hand. `content/media.ts` is the registry: it maps a
route to a path, a focal point and a subject brief. `components/ui/HeroMedia.tsx`
resolves that entry at render time.

**Dropping a correctly named file into this tree is the whole installation.**
No code change, no redesign. Until the file exists the page renders a labelled
placeholder plate at the identical crop, so adding the photograph causes no
layout shift and no reflow.

## Formats

Supply **one high-resolution JPEG** per still (2400px on the long edge is
plenty). `next/image` derives the responsive sizes and serves AVIF/WebP itself —
do not pre-convert or pre-crop. Video is the exception: the homepage hero wants
both `.webm` (VP9/AV1) and `.mp4` (H.264) plus a `.webp` poster still.

Portraits and provider marks are the other exceptions: portraits are JPEG,
marks are SVG where possible.

## Licensing — read before adding anything

Every file needs a licence record in `docs/media-licences/` before it goes in.
"Free download" does not mean copyright-free, and a stock preview is not a
licence. A file with no record is not cleared to publish.

Third-party logos are stricter still: see `providers/README.md`.

## Payload CMS

This tree is the interim store. When Payload lands, its media collection takes
over upload, focal point and alt text, and `content/media.ts` becomes a seed
rather than the source of truth. The registry is shaped for that: `src`, `alt`
and `focal` are exactly the fields a Payload upload document carries, so the
migration is a data move rather than a rewrite of the components.
