# Decision Record

Revised 2026-08-29 following client corrections.

---

## D-001 — Framework: Next.js 16 ✅ Confirmed

App Router, React, TypeScript strict mode, Tailwind CSS 4. Astro considered and rejected.

## D-002 — Legacy service pages: child *routes*, not child *navigation* ✅ Revised

**Superseded:** the earlier reading that keeping ~40 legacy pages required a three-level
primary navigation. That conflated content architecture with navigation architecture. They are
separate decisions.

**Correct position:**

Keeping the ~40 legacy service pages as child routes is an **SEO and content-architecture**
decision. It carries no obligation to expose every child route in the primary navigation.

**Primary navigation hubs (six):**
Mortgages · Property Finance · Protection · Wills & Estate Planning · About · Insights
*(Contact and the login/consultation actions sit in utility navigation, not the hub row.)*

**Desktop mega menu** per hub may contain:
- the hub landing page
- selected high-priority child services
- optional featured content

**Explicitly not:** dumping all ~40 service pages into a three-level navigation tree.

**Lower-priority long-tail pages** exist as routes and stay discoverable through hub pages,
related-service links, contextual internal links, breadcrumbs where appropriate, the XML
sitemap, and search engines.

*Phase-1 consequence:* `PrimaryNav` is a six-hub row with a curated mega-menu panel. Panel
contents are driven by a `featured` flag in the service data, so curation is a content decision
rather than a code change.

## D-003 — Proceed on the provisional palette ✅ Confirmed, with one correction

Guide's brand assets are unavailable; the token layer is provisional and swaps in one file.

**Correction arising from the `frontend-design` skill (now available — see D-004).** That skill
names three clusters that read as generic AI output, the first being *"a warm cream background
(near #F4F1EA) with a high-contrast serif display and a terracotta or warm-clay accent."*

The palette proposed in `docs/00-rebuild-plan.md` §5 — paper `#F6F4F0`, Newsreader as a
high-contrast serif display, brass `#A6864E` — **sits inside that cluster.** It was a default,
not a choice.

The palette and type pairing are therefore **reopened** and will be re-derived during the
Phase 1 design-plan step, grounded in the subject: London property, private-client advisory,
architectural restraint. The §5 structure (token names, scales, constraints) stands; the
specific hex values and typefaces do not.

## D-004 — Skills: re-scanned, three findings ✅ Revised

The earlier "none are installed" finding was **incomplete** — it missed the `/mnt/skills` tree
and the plugin list.

| Brief name | Status | Exact name / path |
| --- | --- | --- |
| `frontend-design` | ✅ **Available** | `/mnt/skills/public/frontend-design/SKILL.md` — exact match, read, in use |
| `Ponytail` | ⚠️ **Enabled, not invocable** | Plugin `ponytail`, `plugin_01UrwR1RGztMe7jS8ySm9P9y`, `enabled: true`. `Skill(ponytail)` returns *Unknown skill* — no skill component surfaced in this session |
| `brand-guidelines` | ⚠️ **Name collision only** | `/mnt/skills/examples/brand-guidelines/SKILL.md` exists, but it applies **Anthropic's** brand colours and typography. Not Guide's. Using it here would put Anthropic branding on a UK financial firm's website |
| `design-taste-frontend` / `Taste` | ❌ Not found | — |
| `web-design-guidelines` | ❌ Not found | — |
| `image-to-code` | ❌ Not found | — |
| `webapp-testing` | ❌ Not found | Playwright + Chromium available directly (`/opt/pw-browsers`) |

**Scanned:** project-local `.claude/` (does not exist) · `/mnt/skills/public` · `/mnt/skills/examples`
· `/root/.claude/skills/**` · `/home/claude/.claude/skills` · `ListSkills` · `ListPlugins`
· `SearchSkills` · `SearchPlugins` · filesystem-wide `SKILL.md` search · name grep across all roots.

**Not enabled, but available to enable — closest cover for the four missing skills:** the
**Design** plugin (`knowledge-work-plugins` marketplace) provides `design:design-critique`,
`design:design-system`, `design:accessibility-review`, `design:ux-copy`.

**Also enabled and relevant:** `artifact-design`, `artifact-diagramming`, `code-review`,
`simplify`, `security-review`, `run`.

**What this means for practice.** `frontend-design` is used for real at the design-plan and
critique steps. For the four genuinely missing skills, the substitutes in
`docs/00-rebuild-plan.md` §10 apply. Ponytail's principle — *the laziest solution that works,
YAGNI, stdlib first* — is applied as a standing review discipline against the §7 dependency
policy, but **not claimed as skill usage**, since the skill cannot be invoked. Design intent is
not simplified away.

## D-005 — The Drupal export does not block Phase 1 ✅ New

Obtaining the Drupal database export, `/sites/default/files/`, original media, PDFs, SEO
metadata and existing redirects **before WEBPRO access is cancelled** remains a high-priority
migration requirement, documented in `docs/01-content-and-assets-required.md` §0.

**It does not block the Phase 1 visual build.** For Phase 1:

- the migration pack is the business/content reference;
- exact information is used wherever the pack contains it;
- clearly labelled development placeholders are used where exact copy, media, statistics, case
  studies, reviews or logos are unavailable;
- nothing is fabricated;
- no fake production content is created merely to make the design look complete.

**The first visual build is judged on** composition, typography, hierarchy, spacing, responsive
behaviour, interaction quality and premium visual direction.

## D-006 — Company information conflicts stay open and visible ✅ New

The discrepancies remain documented and are **not** arbitrated by us. Where a component needs a
value that is in conflict, it renders `[FIRM CONFIRMATION REQUIRED]`:

| Conflict | Sources |
| --- | --- |
| Address | Brentford/London (public site) vs Manchester/Sale (ToB + Privacy Notice PDFs) |
| Email | `enquiries@guidefs.co.uk` (public site) vs `info@guidemortgages.co.uk` (PDFs) |
| Office count | Three (Company page) vs four (global footer, incl. Leeds) |

These conflicts **do not block** the visual homepage build.

## D-007 — Payload / PostgreSQL deferred ✅ New

Not built in depth now. The frontend foundation is designed so Payload integrates cleanly
later:

- content lives in `content/*.ts` behind typed interfaces, so the data source can change
  without touching presentational components;
- section components take props; none reach for a global content object;
- image handling goes through one `AspectImage` wrapper, so a media CDN swaps in one place.

No CMS dependency, schema or database is added in Phase 1.

## D-008 — Phase 1 scope is deliberately partial ✅ New

Phase 1 builds **only**: global design tokens · typography foundation · responsive
container/grid · Header and Navigation · cinematic London Hero · Four Core Services section.

The rest of the homepage is **not** built until this first visual direction has been
browser-tested and reviewed. See `docs/03-phase-1-plan.md`.

---

## Still open

- The 15 content items in `docs/01-content-and-assets-required.md` (none blocking Phase 1).
- Whether to enable the **Design** plugin to cover the four missing skills.
- Highest priority and outside this repository: the Drupal export, ahead of WEBPRO cancellation.

---

## Phase 1 build decisions

## D-009 — Service numerals: kept, as set-indexing ✅

Both variants were built and compared at 1440px, as instructed.

**Unnumbered** leaves the datum rail entirely empty and the hairlines begin from
nothing; the composition loses its left anchor and reads more anonymous.
**Numbered** gives each row a starting mark and corroborates the "four divisions"
count stated in the heading.

Kept — but as an editorial index of a fixed set, not a process. Nothing connects
the numerals, no copy implies order, and they carry `aria-hidden` so assistive
technology reads the division names alone.

## D-010 — Scroll-reveal removed; Motion dependency deferred ✅

A staggered scroll-reveal was built for the divisions and then removed.

`whileInView` with `initial={{ opacity: 0 }}` renders `opacity: 0` **into the
server HTML**. Testing showed the consequence directly: the division copy was
invisible until an IntersectionObserver fired. On a regulated financial site
that puts service descriptions behind JavaScript — a real content and SEO
liability — in exchange for decoration that communicated no hierarchy.

The `motion` package was removed with it rather than left installed unused. The
page's motion is now the header surface transition, the hero video cross-fade,
the division plate cross-fade and hover/focus states — all CSS, all
transform/opacity, all behind the global reduced-motion switch.

Motion is not rejected for the project. It gets reinstalled when a section
genuinely needs it; the lender marquee is a CSS keyframe and will not.

## D-011 — TypeScript pinned to 5.9 ✅

`typescript@7.0.2` installs by default but `typescript-eslint` does not support
it, which disabled ESLint entirely — including the `jsx-a11y` rules the brief
depends on. Working lint is worth more than the newest compiler. Revisit when
typescript-eslint ships TS 7 support.

## D-012 — Hero media resolved server-side ✅

`lib/media.ts` checks the filesystem for the three hero assets at render time.
Dropping `guide-london.webm` / `.mp4` / `-poster.webp` into
`public/media/home/hero/` activates the video path with no component change —
the placeholder is a state, not a separate tree.

Generalised in D-014: the same check now serves every hero on the site.

## D-013 — Blue palette, held in two token layers ✅

The provisional verdigris palette is replaced by the firm's approved blue
system. The token *names* did not change, so no component needed editing for the
colour itself — which was the point of never writing a literal.

The block is now two layers:

- **`--gfs-*`** — the palette. Every hex in the project appears here once.
- **`--color-*`** — what a colour is for. Components only ever name these.

Layer 1 sits outside `@theme` deliberately, so Tailwind generates no `bg-navy`
or `text-gold` utility. There is no way to reach past the semantic layer, which
is what stops the discipline eroding once other people are in the codebase.

`components/ui/DrawingPlate.tsx` was the only file holding literals; its
gradients are now composed from layer 1 in `globals.css`, so the placeholders
re-tone with the palette instead of needing their own edit.

### Two measured results constrain the system

| Pair | Ratio | Consequence |
|---|---|---|
| Gold `#C8A96A` on the light ground | **2.11** | Gold is never text or an icon on a light surface |
| Gold on navy | 7.74 (AAA) | Gold is legible on dark grounds |
| Steel `#2D5B8C` on navy | **2.47** | Steel is a light-surface colour; Sky carries the accent on dark |

So gold has exactly two uses: the section label on dark grounds
(`Eyebrow tone="dark"`), and one hairline — the datum rule the homepage hero
rests on. It is not a button fill, a heading colour, a background, or a hover
state anywhere. That holds it well inside the 2–5% ration.

### Buttons

The filled light button moves from charcoal to Royal `#1E3A8A` with charcoal as
the hover weight (9.74 and 16.78 against warm white — both AAA). `--color-primary`
and `--color-on-primary` exist so the action colour can move independently of
`--color-accent`, which stays the editorial/link colour.

A new `--color-line-inverse-interactive` (`#6B87A6`, 4.67 on navy) separates
control boundaries on dark grounds from decorative hairlines, which stay on
`--color-line-inverse`. Previously both used the faint value, leaving outlined
buttons and link underlines at roughly 1.6:1 on navy. Structural dividers were
deliberately left alone — raising those would make the dark sections loud.

## D-014 — Media addressed by route, not by hand ✅

`content/media.ts` is the single registry. A page's photograph is **derived**
from its route rather than listed:

```
/mortgages              ->  /media/mortgages/hero.jpg
/mortgages/buy-to-let   ->  /media/mortgages/buy-to-let.jpg
```

Three consequences worth stating:

1. **A slug rename cannot orphan an image path**, because there is no path list
   to fall out of date. This is the same reasoning as deriving navigation from
   content (D-002).
2. **Installing photography is a file copy.** `components/ui/HeroMedia.tsx`
   checks existence at render time and falls back to a placeholder plate at the
   identical crop, so adding a file changes pixels and never layout.
3. **The 38 service pages are not in the registry.** They already carry a
   per-page brief in their own content entry; `serviceHeroImage()` derives the
   rest. Listing them again would be a second place for one fact to go stale.

`requireHeroImage()` throws during static generation if a hub has no registered
hero. A missing hero is a content omission and the build is the right place to
find out — the same posture as the pending-content gate.

### Payload

`src`, `alt` and `focal` are deliberately the three fields a Payload upload
document carries. When the CMS lands, this registry becomes a seed and the
components keep their prop shape rather than being rewritten.

### Alt text

Hero photographs are `alt=""` by default, and that is the correct value rather
than an omission: they are atmospheric images sitting behind an H1 that already
states the subject, so a description would add noise for a screen reader user.
It is also the only honest value while the photographs do not exist — we cannot
describe a picture nobody has taken. An entry sets a real alt only where the
image carries meaning the page text does not.

## D-015 — Official logo integrated; dark grounds get a plaque, not a recolour ✅

The firm supplied `guide-logo.png`. It replaces the typographic wordmark in the
header, the mobile drawer and the footer, behind one component,
`components/ui/BrandLogo.tsx`, which owns the path, the intrinsic dimensions,
the alt text and the contrast treatment. Nothing else names the file.

### The asset needed work before it could be used

The supplied file is **24549 × 9083** — 223 megapixels, about 890 MB decoded,
well past what `next/image` will process per request. It was exported at 1000
DPI from a vector source, so reducing it is visually lossless. The web master is
the same artwork with its (symmetric) transparent margin trimmed and resized to
**900 × 289, 38.5 KB**. The original is kept alongside it, referenced by nothing,
so the derivation can be redone.

Nothing was recoloured, redrawn or cropped into.

### Dark grounds

The artwork is black plus one orange on transparency:

| | |
|---|---|
| black on the light ground | 19.74 |
| black on navy `#0D1B2A` | **1.21** |
| black on the plaque | 17.55 |

At 1.21:1 the wordmark is invisible on every navy section. Repainting a trade
mark to suit our palette is not ours to do, and no official reversed version
exists, so `tone="dark"` sets the mark on a restrained warm-white plaque and
leaves the artwork alone. If a reversed master is ever supplied, point
`tone="dark"` at it and delete the plaque — nothing else changes.

### Sizing, and why it is a width

Each slot sets a **width**; height follows the intrinsic 3.114:1 ratio, so the
mark cannot be distorted. Width rather than height because it pairs with `sizes`
(also a width), and because `globals.css` carries an unlayered
`img { height: auto }` base rule — unlayered CSS outranks Tailwind's layered
utilities, so an `h-9` there is silently ignored and the rendered size falls out
of the `sizes` attribute instead. Driving the width sidesteps that entirely.

*(That cascade quirk is latent elsewhere: `components/home/LogoMarquee.tsx` sets
`h-10 w-auto` on provider marks and would hit the same thing. It is dormant —
no provider has display permission yet — and fixing it means moving the base
rule into `@layer base`, which is a global change and out of scope here.)*

### The header stayed frozen

The mark, plaque included, renders **120px** wide against the old wordmark's
127px — deliberately inside it, so no width can be worse off than before. In the
solid state, with no plaque, it is 104px. Worst-case nav-to-actions gap:

| | transparent | solid |
|---|---|---|
| **1232px** (nav arrives) | 63px | 71px |
| **1360px** (phone arrives) | 64px | 72px |
| 1920px | 84px | 92px |

All clear the header's measured ≥56px guarantee (D-002), and the solid state has
*more* room than the wordmark left it. No overlap, no overflow, CTA and drawer
trigger unaffected across all 23 widths the header suite exercises.

**The lesson, recorded because it nearly shipped:** an earlier pass sized the
mark at 140px on the strength of round-number viewports — 1920, 1440, 1280 — all
of which looked healthy at 74px+. The binding widths are the disclosure
breakpoints themselves, where each control arrives at its tightest, and there the
gap had dropped to 53px. The header suite caught it. Sample the boundaries, not
the comfortable widths.

### Not done, deliberately

No favicon was generated. Cropping the symbol out of the lockup would be
inventing an icon the firm has not approved, so `brand.favicon` is tracked as
pending instead.

The logo is black and orange `#E74423`; the approved site palette is navy, royal
blue and gold. **They share no colour.** Neither was changed to suit the other —
that is a brand decision for the firm, tracked as `brand.paletteAlignment`.

## D-016 — Provider marks: real artwork in review, placeholders in production ✅

The firm supplied 37 lender, provider and partner marks. They are wired into the
homepage marquee for **development review only**. Nothing about the production
permission gate was loosened.

### The gate has to be evaluated on the server

`LogoMarquee` is a client component. Next only inlines `NEXT_PUBLIC_*` into the
client bundle, so `process.env.VERCEL_ENV` is `undefined` in the browser — a
permission check evaluated inside the component would read "not production" on
every deployment and publish unpermissioned trade marks.

So the filtering moved to `app/page.tsx`, which is a server component, and the
marquee receives an already-filtered `marks` prop. Verified by building with
`VERCEL_ENV=production`: no logo path and no provider name appears in the
generated HTML or in any client chunk — the strip renders neutral placeholder
slots instead.

*(The same trap applies to `PendingContent`, whose production check also runs
client-side when rendered inside a client component. It fails safe — it shows a
review marker that production would hide — so it is left alone, but it is the
same root cause.)*

### Preview is explicit and narrow

`devLogoPreview` is false when `VERCEL_ENV === "production"`, false under
`GUIDE_STRICT_CONTENT=1` so the launch-readiness build shows what production
would, and can be forced off with `GUIDE_DEV_LOGO_PREVIEW=0`. `isLogoPermitted`
is kept as a separate, unchanged function so the production rule is readable on
its own. The strip labels itself `DEVELOPMENT PREVIEW` while previewing.

### Normalising marks that vary 10x in aspect

The supplied files each sit on a common ~385x311 canvas with the artwork
floating in transparent padding — 16% to 83% of canvas height depending on the
mark. Fitted whole into the 176x48 slot, a wordmark renders about 10px tall.

`scripts/prepare-logos.mjs` trims each file to its own artwork: empty
transparent margin removed, nothing else touched. Trimmed aspects run 0.68:1 to
7.14:1, and each mark then fills one identical slot with `object-fit: contain` —
so heights normalise, ratios are preserved, and CSS cannot distort anything. The
slot matches the old placeholder's dimensions exactly, so the band height is
unchanged whether marks show or not.

Originals are never modified, moved or renamed; the derivatives live alongside
them in `web/`, the same original-plus-web-master pattern as the brand logo.

`fill` rather than a height utility, for the reason recorded in D-015: the
unlayered `img { height: auto }` in globals.css would silently defeat `h-12`.

Marks load `eager` rather than lazy — the strip scrolls continuously, so lazy
marks pop in as they cross the viewport edge. All 37 optimised marks total about
200KB, which is cheap enough to avoid that; `priority` would be wrong, since it
would preload them ahead of the hero.

### Not classified

The set mixes lenders, protection providers and platform partners. Everything is
`"unclassified"` — grouping them is the firm's call and a wrong grouping asserts
a relationship we cannot evidence. `ProviderCategory` carries the other members
so the split becomes a data edit rather than a refactor.

## D-017 — Reviews are manual; one shared marquee speed ✅

### No Google integration

The Business Profile API, the Places API, OAuth and live review syncing are all
explicitly out for the initial site. Reviews are copied by hand into
`content/reviews.ts`, whose field names are the intended Payload Reviews
collection fields — so when the CMS lands, this file becomes a seed and
`ReviewsMarquee` keeps its props unchanged.

### The dataset is empty, and stays empty

**Zero genuine reviews are available.** The reference pack records that
`/testimonials` holds four pages of named testimonials, but contains none of the
text, no reviewer names, no ratings, and nothing about a Google listing at all.
Nothing has been supplied since.

So `reviews` is `[]` rather than populated with plausible-looking entries.
Writing a review a client did not write is fabricating a named person's words
about a regulated firm. The strip renders labelled placeholder panels at the
identical size until real reviews are pasted in.

The type is deliberately strict — `reviewerName`, `reviewText` and `rating` are
non-nullable, and `source` is the literal `"Google"`. An entry either is a real
review or it does not compile.

A module-level guard throws on duplicate ids. Reviews are copied by hand, which
makes a repeated id likely, and it would otherwise surface as React silently
dropping a panel. Verified: the build fails with
`duplicate review id(s): …`.

### The aggregate is data, not a published claim

`googleReviewSummary` carries the reported 5.0 from 41 reviews with
`verified: false`, and the component renders it only when that flips to true.
An aggregate rating is a claim about the firm; an unchecked or stale one is
exactly what a regulator reads as a financial promotion. Publishing it needs a
person to check the live listing and record the date and profile URL. Tracked as
`reviews.summary`.

### One speed

`MARQUEE_SPEED = 45` now lives in `components/ui/Marquee.tsx` and both strips
import it. Reviews previously ran at 14px/s — a third of the logo strip — so a
quotation stayed readable while it moved. Two different speeds on one page read
as a bug rather than a distinction, so they are unified at the firm's request.
Measured after the change: logos 45.1px/s, reviews 45.2px/s.

Everything else about the engine is untouched: seamless wrap, immediate pause on
hover, pause on keyboard focus, resume on leave, native touch scrolling, and no
autoplay under `prefers-reduced-motion`.

### Design

Stars are drawn from the design system in the page's own accent, with the unused
stars shown muted so a four-star review reads as four *out of five* rather than
as a shorter row; the glyph run is `aria-hidden` behind one plain sentence.
Attribution is the words "Google Review" — not a reproduced Google badge, which
would need their permission and would pull the panel away from the Guide design.
Review text carries `whitespace-pre-line` so a reviewer's own line breaks
survive.

## D-018 — GitHub Pages preview, behind a build flag ✅

A static export for visual review at
https://sunnyitsme.github.io/Custom-design/, deployed from the review branch by
`.github/workflows/deploy-pages.yml`. **Not the production hosting
architecture.** Full detail in docs/05-github-pages-preview.md.

The export config lives behind `GUIDE_STATIC_EXPORT=1`, set only by
`scripts/build-pages.mjs`. `next dev` and a normal `next build` are byte-for-byte
unaffected: no basePath, no trailing slashes, image optimisation on, headers and
redirects live, still `http://localhost:3000/`.

### Nothing server-dependent was removed

The contact route handler, the 55 legacy redirects and the `X-Robots-Tag` header
all stay defined for production; the static build omits them and the preview
says so rather than faking them. The form validates client-side and then states
"Form submission is disabled in this preview" without touching the network — a
POST to a non-existent route would surface as "could not reach the server",
which reads as a fault rather than as a property of the preview.

### Three real bugs the subpath exposed

A deployment under `/Custom-design` is an unusually good audit: anything
assuming the domain root breaks loudly.

1. **`next/image` does not apply basePath to `src` under `output: export`.**
   The brand logo, all 37 provider marks and every page hero resolved to the
   domain root — 741 unprefixed references across the export. `assetPath()` in
   `lib/preview.ts` fixes it and is a no-op elsewhere.
2. **Raw `<a href="/…">` for internal routes** in `ConsultationCta` and the
   footer's legal links. Next only prefixes `<Link>`, so five links 404'd. Now
   `<Link>`, which also restores client navigation.
3. **The hero referenced two files that do not exist** — `guide-london.webm`
   was never supplied, and the poster requirement was dropped in `7725b7e` so
   the mp4 alone would activate the video, leaving the poster referenced
   anyway. Two 404s on every homepage load. `heroVideoSources()` now lists only
   encodes present on disk and the poster is omitted when absent.

None of these was visible at the domain root, and none would have been caught by
the test suite, which also runs at the root.

### `.nojekyll`

Written by the build script. Without it Pages runs the output through Jekyll,
which ignores underscore-prefixed paths — including `_next/`, where all the CSS
and JS live. The site deploys successfully and renders completely unstyled,
which is a confusing failure to debug after the fact.

### Blocked on one repository setting

Two CI runs failed at `Configure Pages`: *"Create Pages site failed. Error:
Resource not accessible by integration"*. `GITHUB_TOKEN` cannot create a Pages
site even with `pages: write` — enabling Pages is an admin-only repository
setting. Someone with admin access has to select **Settings → Pages → Source:
GitHub Actions** once, then re-run the workflow. Every step before that one
passes in CI.

### Verified before pushing

Served from `out/` under `/Custom-design/` and driven in a browser: 11 routes at
1440 and 390 (all 200, CSS applied, one h1, no horizontal overflow), navigation,
footer legal links, both marquees autoplaying and pausing on hover, all 37
provider marks rendering, the contact form validating and refusing to submit,
`meta robots` and `robots.txt`, and zero broken asset requests. 138 distinct
asset paths all prefixed and all resolving.

