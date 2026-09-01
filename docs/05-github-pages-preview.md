# GitHub Pages static preview

A **visual review** deployment. Not the production hosting architecture, and not
a step toward one — it exists so the site can be looked at on a URL.

- **URL:** https://sunnyitsme.github.io/Custom-design/
- **Branch:** `claude/guide-fs-website-rebuild-hx3nlg`
- **Workflow:** `.github/workflows/deploy-pages.yml`
- **Build:** `pnpm build:pages` → `out/`
- **Indexing:** `noindex, nofollow` + a Disallow-all `robots.txt`

## Running it locally

```bash
pnpm build:pages          # writes out/ with .nojekyll
```

`out/index.html` opened directly will *not* resolve its assets — everything is
prefixed with `/Custom-design`. Serve it the way Pages does:

```bash
mkdir -p /tmp/pages && ln -sfn "$PWD/out" /tmp/pages/Custom-design
cd /tmp/pages && python3 -m http.server 4321
# http://127.0.0.1:4321/Custom-design/
```

Override the subpath if the repository is ever renamed, or served from the root
of a user/organisation site:

```bash
PAGES_BASE_PATH="" pnpm build:pages
```

## Local development is unaffected

`next dev` and a normal `next build` set none of these variables, so basePath is
empty, there are no trailing slashes, image optimisation is on, and headers and
redirects work. The site still runs at **http://localhost:3000/** with no
subpath. The export config in `next.config.ts` is behind
`GUIDE_STATIC_EXPORT=1`, which only `scripts/build-pages.mjs` sets.

## What cannot run on static hosting

Nothing below was removed. The production implementation is intact and runs on a
real server; the static export simply omits it.

| Feature | Production | In the preview |
|---|---|---|
| Contact submission (`app/api/contact/route.ts`) | Route handler validates server-side and would post to the CRM | Route is not exported. The form renders and validates client-side, then stops and says *"Form submission is disabled in this preview."* No request is made. |
| 55 legacy-URL redirects (`content/redirects.ts`) | `next.config.ts` `redirects()` | Not applied — there is no server to issue a 308. The definitions are untouched. |
| `X-Robots-Tag` response header | `next.config.ts` `headers()` | Not applied. The noindex guarantee is carried instead by the `<meta name="robots">` in `app/layout.tsx` and a Disallow-all `robots.txt` — both verified in the export. |
| `next/image` optimisation | AVIF/WebP, per-breakpoint resizing | `images.unoptimized`. Source files are served as-is. Marks and the logo were already prepared at web sizes, so the practical cost is small. |
| CMS / Payload | Planned | Not present in either build yet. |

### Contact form

The form is the one place where "preview-safe" needed a deliberate decision.
It could have been left to POST at a URL that does not exist, but a 404 surfaces
as *"Could not reach the server"* — which reads like a fault rather than a
property of the preview. So `isStaticPreview` short-circuits before the network
and states the limitation plainly. Validation still runs, which is the part
worth reviewing.

It never claims the enquiry reached Guide.

## Things that had to be fixed to make the export correct

Worth recording, because each was a real bug that only a subpath deployment
exposes:

- **`next/image` does not apply `basePath` to `src` under `output: export`.**
  Every `/media/...` reference — the brand logo, all 37 provider marks, the page
  heroes — resolved to the domain root and 404'd. They now go through
  `assetPath()` in `lib/preview.ts`, which is a no-op in every other build.
- **Raw `<a href="/…">` for internal routes.** `ConsultationCta` and the
  footer's legal links used plain anchors, so Next never prefixed them and five
  links 404'd. They are `<Link>` now, which also gives client navigation.
- **The hero referenced two files that do not exist.** `guide-london.webm` was
  never supplied, and `guide-london-poster.webp` stopped being required in
  commit `7725b7e` so the mp4 alone would activate the video. Both were emitted
  regardless, costing two 404s per page load. `heroVideoSources()` now lists
  only encodes present on disk, and the poster is omitted when absent.

**Consequence of the missing poster:** the hero shows flat navy for the moment
between first paint and the video becoming playable. The poster is the intended
LCP element, so supplying `guide-london-poster.webp` is still worth doing.

## The content gate is unchanged

The preview build sets neither `VERCEL_ENV` nor `GUIDE_STRICT_CONTENT`, so it is
a development build: placeholders render and are visibly marked, which is what a
reviewer needs to see. `scripts/check-pending.ts` still runs and still refuses a
production build while launch-blocking items remain.

The lender-mark permission gate is likewise untouched — the marks appear here
under `devLogoPreview`, exactly as they do on any non-production build, and a
production deployment still renders neutral placeholder slots.

## Size

`out/` is about 50 MB, of which 31 MB is media — almost all the 28 MB hero mp4.
Well inside the 1 GB GitHub Pages limit. Media is not duplicated: `public/` is
copied once.
