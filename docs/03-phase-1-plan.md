# Phase 1 Plan — Foundation, Header, Hero, Services

**Scope:** six deliverables. Nothing else on the homepage is built until this is reviewed.
**Gate:** awaiting approval of the skill check (D-004) before any code is written.

---

## Build order

**1 · Scaffold**
Next.js 16 App Router · React · TypeScript strict · Tailwind CSS 4 · ESLint with
`jsx-a11y` · Prettier · Playwright. No CMS, no database, no component kit.

**2 · Design plan — before any component code**
Using `/mnt/skills/public/frontend-design/SKILL.md`, produce a compact token system:
palette as 4–6 named hex values, typefaces for display / body / utility roles, a layout
concept, and the one signature element the page is remembered by.

Then review that plan against the brief and revise anything that reads as a default rather
than a choice. **This step exists because the palette in `docs/00-rebuild-plan.md` §5 failed
exactly that test** — warm cream, high-contrast serif, warm-clay accent is the first AI cluster
the skill names (D-003). The re-derivation is grounded in the subject: London property,
private-client advisory, architectural restraint.

I'll show you the revised plan before building from it.

**3 · Global design tokens**
`app/styles/tokens.css`. Tailwind's stock theme deleted (`--color-*: initial`) so only Guide
tokens exist. Colour, surface, border, focus (on-paper and on-dark), radius capped at 2px,
motion durations and easing, breakpoints.

**4 · Typography foundation**
Self-hosted variable faces via `next/font`. Fluid `clamp()` scale with named steps —
`display-1`, `display-2`, `heading-1..3`, `body-lg`, `body`, `body-sm`, `eyebrow`. Tabular
numerals for figures.

**5 · Responsive container and grid**
`Container` with fluid gutter `clamp(20px, 5vw, 96px)`, 1440 max, 1280 measure-limited, plus a
full-bleed escape hatch. 12 / 8 / 4 columns at desktop / tablet / mobile. Section rhythm as a
token, never hand-tuned.

**6 · Header and navigation**
Six hubs — Mortgages, Property Finance, Protection, Wills & Estate Planning, About, Insights.
Utility actions: Client Login, Advisor Login, Speak to an Adviser.

Desktop: curated mega-menu panel per hub — hub landing page, selected child services, optional
featured slot. Panel contents driven by a `featured` flag in the service data (D-002).
Mobile: accessible drawer with focus trap, `Escape` to close, and focus returned to the
trigger. Transparent over the hero, transitioning to a solid surface on scroll.

**7 · Cinematic London hero**
Full-bleed video, minimal overlay: one headline, one supporting line, one primary CTA and a
restrained secondary. The poster still is the LCP element; the video cross-fades in on
`canplay`, so Core Web Vitals measure an optimised image rather than a video decode. Not
fetched under `prefers-reduced-motion`, Save-Data, or at narrow viewports.

*Placeholder:* no approved footage or headline exists. Built with a labelled placeholder
still and `[FIRM CONFIRMATION REQUIRED]` copy — no invented positioning statement for a
regulated firm.

**8 · Four core services**
01 Mortgages · 02 Property Finance · 03 Protection · 04 Wills & Estate Planning.

Not four cards. A two-column editorial index: numbered list set large on the left, one
architectural image on the right that crossfades as each division becomes active. On mobile,
a stacked editorial sequence — wide image band, numeral, title, hairline, per division.

*Note on the numbering:* the `frontend-design` skill is explicit that numbered markers are
only appropriate where the content genuinely is a sequence. These four are divisions, not
steps. **I'll test the composition both with and without the numerals and keep whichever
earns its place** — if the numerals are decoration, they go.

**9 · Browser QA**
Playwright at 1440 / 1024 / 768 / 430 / 390. Screenshots at each. Assertions: no horizontal
overflow at any width; keyboard path through header, mega menu and drawer; visible focus on
every control including over the video; reduced-motion run confirming no video fetch and no
animation.

**10 · Audit and critique**
axe-core pass, fixes, re-test. Then a self-critique against the design plan — Chanel's rule:
remove one accessory. Then a dependency review against the §7 policy.

**11 · Stop and present.**
Screenshots at all five breakpoints, plus what I'd change next. No further homepage sections.

---

## Placeholder policy in force

`<PendingContent>` renders a visible development marker; `content/pending.ts` is a typed
registry that fails the production build while any entry is `status: 'placeholder'`. Conflicted
company data renders `[FIRM CONFIRMATION REQUIRED]` (D-006). Nothing is fabricated to make the
design look finished.

## What Phase 1 will not show

Real brand (D-003), approved copy, statistics, lender logos, case studies, reviews, adviser
photography, or insights. Judge it on composition, typography, hierarchy, spacing, responsive
behaviour, interaction quality and visual direction.

## Deliberately out of scope

The remaining nine homepage sections · service pages · Payload/PostgreSQL (D-007) · the
redirect map implementation · calculators.
