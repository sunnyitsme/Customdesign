# Guide Financial Services — Rebuild Plan (Phase 0: Foundation Proposal)

**Status:** awaiting approval. No application code has been written yet.
**Branch:** `claude/guide-fs-website-rebuild-hx3nlg`
**Prepared:** 2026-08-29

---

## 1. Repository findings

The repository is **completely empty** — a git repo with a remote and zero commits. There is
no existing stack, no `package.json`, no tooling, no legacy code.

Practical consequence: there is nothing to migrate technically and no incumbent framework
decisions to work around. Everything below is a greenfield choice.

**Environment available:** Node 22.22.2, npm 10.9.7, pnpm 10.33.0, Chromium + Playwright
pre-installed at `/opt/pw-browsers`, npm registry reachable.

## 2. Reference material read

The migration pack has been committed to `reference/current-guide-site/`:

| File | What it gives us |
| --- | --- |
| `current-navigation.md` | Full current menu tree + 2 unlinked legacy pages |
| `page-inventory.csv` | 59 first-party pages with one-line content scope |
| `content-migration-inventory.md` | Grouped page-by-page summaries |
| `current-site-structure.json` | Machine-readable nav, globals, dependencies |
| `global-components-and-data.md` | Contact, offices, corporate identifiers |
| `external-dependencies.md` | WEBPRO, portals, GTM, legal PDFs |
| `source-urls.txt` | 59 first-party URLs + 4 external |

### Critical limitation of the pack

The pack states it plainly and it governs everything downstream:

> This pack captures the complete public navigation structure and migration summaries, but it
> is **not a verbatim mirror of every page or a download of all media/assets**.

**We have page *summaries*, not approved *copy*.** There is no body text, no images, no PDFs,
no metadata, no testimonial text. Every word of visible copy on the new homepage is therefore
either (a) verified global data from the pack, or (b) a labelled placeholder awaiting the firm.

The pack's own recommendation — obtain the **Drupal export / database backup / public-files
archive before cancelling WEBPRO** — is the single highest-priority non-design action on this
project. If the WEBPRO relationship ends before that export exists, the content is gone.

## 3. Verified data we may use today

From `global-components-and-data.md`, this is real, sourced, and safe to render:

- Phone `0333 034 8993`, email `enquiries@guidefs.co.uk`
- Primary address: 1st Floor, 1000 Great West Road, Brentford, London TW8 9DW
- Offices: London (as above), Manchester (Dunham House, Cross Street, Sale, M33 7HH),
  Leicester (Unit D5, Leicester Business Centre, Ross Walk, LE4 5HH),
  Leeds (Office 3, Millwright Business Centre, Regent Street, LS2 7NA)
- Legal entity **Asset Guide Limited**; trading as **Guide Financial Services**, **Guide Mortgages**
- FCA FRN **918369**, ICO **ZA277525**, Company number **10938852**
- Portals: `client.guidemortgages.co.uk`, `crm.guidemortgages.co.uk`

Everything else on the homepage — statistics, lender logos, case studies, reviews, adviser
profiles, insights, hero video, photography, footer risk wording — **does not exist in any
approved form** and will be built as structure with visible placeholders.

## 4. Proposed stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16, App Router, TypeScript strict** | `redirects()` in config is first-class for the ~59 permanent 301s the brief requires; Metadata API protects SEO transfer; RSC keeps client JS small under a video hero; MDX-ready for Insights later |
| Styling | **Tailwind v4 with the default theme disabled** | v4's CSS-first `@theme` block *is* a centralised token file. We set `--color-*: initial` etc. to delete Tailwind's stock palette and scales, so only Guide tokens exist and arbitrary values become visible mistakes in review |
| Motion | **`motion`** (Framer Motion successor) | `whileInView`, variants, and a `MotionConfig reducedMotion="user"` global switch. Small, tree-shakeable |
| Fonts | **next/font**, self-hosted variable fonts | No render-blocking Google request, no CLS, no third-party dependency |
| Testing | **Playwright** (already installed) | Responsive screenshots + a11y + no-horizontal-overflow assertions |
| Lint | ESLint + `eslint-plugin-jsx-a11y` + Prettier | a11y violations caught in CI, not in review |

**Alternative considered:** Astro would ship less JS for a brochure site. Rejected because the
Insights hub, adviser filtering, forms and future Guide-owned calculators all pull toward React,
and Next's redirect handling is materially better for a 59-URL migration. Happy to revisit if
you'd prefer Astro.

**Deliberately NOT using GSAP or Lenis in phase 1.** See §9.

## 5. Design-system foundation

Built once, in `app/styles/`, before any page-specific CSS exists.

### Colour

An architectural, private-client palette — ink and paper, one deep brand blue, one restrained
metallic accent used sparingly for rules and eyebrows. No gradients, no neon.

```
--color-ink-900   #0B0E12   primary text, dark surfaces
--color-ink-700   #1C222B   headings on paper
--color-ink-500   #4A535F   secondary text
--color-ink-300   #98A0AB   meta / captions
--color-line      #E3E1DC   hairline borders (1px, load-bearing in this design)
--color-paper     #F6F4F0   page ground (warm off-white, not clinical #FFF)
--color-surface   #FFFFFF   raised surfaces
--color-navy-900  #0F2436   brand primary
--color-brass-500 #A6864E   accent — rules, eyebrows, link underlines only
```

> **Placeholder.** These are *my* proposal, not Guide's brand colours. I do not have Guide's
> brand palette. If a brand guideline exists, these get replaced wholesale — the token layer
> means that is a one-file change.

### Typography

- **Display:** `Newsreader` — variable transitional serif with an optical-size axis. Reads
  established and editorial rather than startup-generic.
- **Text:** `Instrument Sans` — neutral grotesque, good at long UK financial copy, deliberately
  *not* Inter (which is the visual signature of generic AI output).
- Tabular numerals for all statistics and figures.

Fluid scale via `clamp()`, named steps rather than t-shirt sizes:
`display-1`, `display-2`, `heading-1..3`, `body-lg`, `body`, `body-sm`, `eyebrow`.

### Space, container, grid

- 4px base unit, but section rhythm is itself a token: `--space-section-sm|md|lg` as fluid clamps,
  so vertical rhythm is never hand-tuned per section.
- Container: 1440 max, 1280 for measure-limited prose, gutter `clamp(20px, 5vw, 96px)`.
- Grid: 12 / 8 / 4 columns at desktop / tablet / mobile. Full-bleed escape hatch for imagery.

### Radius, borders, elevation — the anti-generic constraints

- `--radius-sm: 2px` is the **maximum**. There is no large radius token. This structurally
  prevents the rounded-card look.
- No shadow tokens above a single subtle `--shadow-lift` reserved for the mobile nav overlay.
  Separation comes from hairlines and whitespace.

### Motion

- Durations `150 / 250 / 400 / 700ms`; `--ease-out-quart: cubic-bezier(0.22, 1, 0.36, 1)`.
- One reveal primitive: opacity + `translateY(16px)`, 60ms stagger, fires once.
- Transform and opacity only. No animated blur, filter, box-shadow or layout properties.

### Focus

`:focus-visible` only, 2px outline + 2px offset, with **two** tokens (on-paper and on-dark) so
focus stays visible over the video hero.

### Buttons

Exactly three, no more: **primary** (solid), **secondary** (hairline outline), **tertiary**
(text with an animated rule). Squared. No pills, no badges as decoration.

### Image ratios

`3:2` editorial, `4:5` adviser portrait, `16:9` hero, `21:9` architectural band.

## 6. Homepage component architecture

```
app/
  layout.tsx                     fonts, MotionConfig, skip link, landmarks
  page.tsx                       homepage composition only — no styling logic
  styles/tokens.css              the entire design system
components/
  layout/  SiteHeader  PrimaryNav  MobileNavDrawer  SiteFooter  SkipLink
  ui/      Button  Container  Eyebrow  SectionHeader  Rule
           AspectImage  Reveal  Stat  LogoMarquee  PendingContent
  home/    HeroVideo  ServiceDivisions  Positioning  CredibilityStats
           AdviserFeature  CaseStudies  SocialProof  HowGuideWorks
           InsightsPreview  ConsultationCta
content/
  site.ts        verified globals from the migration pack
  services.ts    the four divisions
  home.ts        homepage copy
  pending.ts     registry of every placeholder, with what's needed and from whom
  redirects.ts   legacy URL → new URL map, consumed by next.config.ts
```

Two mechanisms keep placeholders honest:

1. **`<PendingContent>`** renders a visible dev-only marker around unapproved content.
2. **`content/pending.ts`** is a typed registry. A script prints the outstanding-content report,
   and the production build fails if any entry is still `status: 'placeholder'`. Fake data
   cannot reach production by accident.

### Section compositions — how each avoids the template look

**Hero.** Full-bleed London video, single headline, one supporting line, one primary CTA plus a
restrained secondary. The poster still is the LCP element and the video cross-fades in on
`canplay`, so Core Web Vitals are measured against an optimised image, not a video. Video is
never fetched under `prefers-reduced-motion`, Save-Data, or narrow viewports. Header sits
transparent over it and transitions to solid paper on scroll.

**Service divisions.** *Not four cards.* A two-column editorial index: a numbered list
(01–04) set in large serif on the left, and one large architectural image on the right that
crossfades as each division becomes active. On mobile it becomes a stacked editorial sequence,
each division a wide image band, a numeral, a title and a hairline. No icons, no shadows.

**Credibility statistics.** A single horizontal band, hairline-separated, large tabular figures
with small-caps labels — closer to an annual report than a dashboard.

**Lender marquee.** See §7.

**Advisers.** 4:5 portraits in an asymmetric editorial arrangement, name and qualification in
restrained type. Deliberately different rhythm from the divisions section.

**Case studies.** Large-scale, few in number, editorial captioning. Not a card grid.

**Social proof / process / insights** each get a distinct composition — one is a quiet quote
band, one a numbered horizontal sequence, one an editorial three-up with unequal weighting.
No two sections on the page share a layout.

## 7. LogoMarquee — build approach

Duplicated track, `transform: translate3d()`, CSS keyframes, `will-change: transform`, animation
duration derived from track width so speed is constant regardless of logo count. Pause on hover
*and* on focus-within. `mask-image` edge fades. Each logo in a fixed-height flex slot with
`object-fit: contain` so inconsistent source dimensions optically balance without distortion.
Under `prefers-reduced-motion`, the animation is removed and the logos present as a clean static
wrapped grid — not a frozen strip. The list is `aria-label="Lenders and providers we work with"`
with real `alt` text per logo.

No carousel library. Roughly 60 lines of component plus 15 of CSS.

Wording stays **"Lenders & Providers We Work With"** until the firm supplies approved
relationship wording. Nothing will imply partnership.

## 8. Legacy URL migration

`content/redirects.ts` maps all 59 URLs, consumed by `next.config.ts` with `permanent: true`,
plus a test asserting every line in `source-urls.txt` has a destination. Zero URLs get dropped.

**An SEO decision I need from you before I write the map.** The current site has ~40 thin,
individually-targeted service pages (`/fixed-rate-mortgages`, `/offset-mortgages`,
`/gfs-auction-finance`, …). These are almost certainly earning long-tail organic traffic.
Collapsing them many-to-one into four hubs would be a significant, hard-to-reverse traffic
risk. My recommendation is to **keep them as child pages under the new hubs**
(`/mortgages/fixed-rate`, `/property-finance/auction-finance`) rather than redirect them into
the hub. That is a commercial decision, not a design one — I'd want Guide's view, ideally with
Search Console data.

The two legal PDFs are currently at `/sites/default/files/clients/966/…`. I'd keep those exact
paths alive as redirects to `/documents/…` so any external links and regulatory references
continue to resolve.

## 9. Dependencies we should avoid

| Avoid | Reason |
| --- | --- |
| Component kits (MUI, Chakra, wholesale shadcn) | They carry a house style. Adopting one guarantees the site looks like every other site built with it |
| Carousel libraries (Swiper, Embla) | ~25KB for an effect that is a duplicated div and one keyframe |
| **GSAP** | Nothing on this homepage needs a timeline. Reveals and crossfades are Motion or plain CSS. Revisit only if a genuinely cinematic scroll sequence gets approved |
| **Lenis / smooth-scroll** | Native scrolling is already smooth. Hijacking it costs scroll-linked a11y, breaks touch momentum on iOS, and adds an rAF loop that competes with the video decode. I'd want a specific approved effect that provably requires it before adding it |
| AOS / react-scroll-parallax | Replaced by one ~30-line `Reveal` component |
| Icon mega-libraries | A handful of hand-authored inline SVGs |
| **WEBPRO calculator iframes** | Licensing must be confirmed before reuse — the pack flags this. Assume Guide-owned calculators are needed |
| GTM on the critical path | Defer until after interaction so it can't damage LCP |

## 10. Skills — an honest status

The brief names seven skills: `frontend-design`, `design-taste-frontend`, `brand-guidelines`,
`web-design-guidelines`, `image-to-code`, `webapp-testing`, `Ponytail`.

**None of them are installed in this session.** I checked the session skill list, the synced
skills directory on disk, and searched your claude.ai skill catalogue — no matches. I'm not
going to claim to have used them.

The closest thing available to install is the **Design** plugin from the `knowledge-work-plugins`
marketplace (`design:design-critique`, `design:design-system`, `design:accessibility-review`,
`design:ux-copy`). If those seven are a private/org set, enabling them for this workspace before
implementation starts would be worthwhile — the brief leans on them heavily.

Until then, here is what I will actually do at each stage, and what each substitutes for:

| Phase | Intended skill | What I will do instead |
| --- | --- | --- |
| Art direction, composition | frontend-design | Explicit composition brief per section before coding, held against the §5 anti-generic constraints |
| Visual critique | design-taste-frontend | Screenshot-based self-critique pass at all five breakpoints, against a written checklist, before presenting |
| Brand system | brand-guidelines | The token layer in §5, flagged as provisional pending Guide's real brand |
| A11y / UX audit | web-design-guidelines | Playwright + axe-core automated audit, plus manual keyboard, focus, contrast and heading-hierarchy passes |
| Reference analysis | image-to-code | Written analysis of any reference you send — structure, hierarchy, spacing, scale — before any code, translated into Guide tokens, never copied |
| Browser QA | webapp-testing | Playwright directly (already installed): screenshots at 1440/1024/768/430/390, overflow assertions, reduced-motion runs |
| Complexity review | Ponytail | Explicit dependency and abstraction review before presenting, with the §9 table as the standard. Design intent will not be simplified away |

## 11. Proposed phase 1 sequence (after approval)

1. Scaffold Next.js + TypeScript strict + Tailwind v4, ESLint/a11y, Playwright.
2. Build the token layer and primitives. Nothing page-specific yet.
3. Header, footer, navigation — including mobile drawer and focus management.
4. Homepage sections in order, each with its composition brief written first.
5. `content/pending.ts` registry + build guard.
6. Run it, Playwright QA at all five breakpoints, reduced-motion and keyboard passes.
7. axe-core audit, fix, re-test.
8. Self-critique pass, fix, re-test.
9. Complexity/dependency review.
10. **Stop and present for approval.** No service pages.
