# Decision Record

## D-001 — Framework: Next.js 16 ✅ Confirmed 2026-08-29

App Router, TypeScript strict mode. Astro considered and rejected.

Rationale: `redirects()` handles the 59-URL permanent 301 migration as first-class
configuration; the Metadata API protects the SEO transfer; server components keep client JS
small under a video hero; and the roadmap (Insights hub, forms, adviser filtering, Guide-owned
calculators) pulls toward React regardless.

## D-002 — Legacy service pages retained as child pages ✅ Confirmed 2026-08-29

The ~40 thin service pages are **not** consolidated into four hubs. They become child pages
under the new hub structure.

```
/introduction-to-mortgages          → /mortgages
/fixed-rate-mortgages               → /mortgages/fixed-rate
/offset-mortgages                   → /mortgages/offset
/1st-time-buyer                     → /mortgages/first-time-buyer
/gfs-bridging-loans                 → /property-finance/bridging-finance
/gfs-auction-finance                → /property-finance/auction-finance
/why-protection-is-important        → /protection
/life-assurance                     → /protection/life-assurance
/keyperson-insurance                → /protection/business/key-person
/gfs-wills-writing                  → /wills-estate-planning
/gfs-our-company                    → /about
/our_team                           → /about/team
/testimonials                       → /about/testimonials
/gfs-stamp-duty                     → /calculators/stamp-duty
```
*(Indicative — the full map is authored in `content/redirects.ts` with a test asserting every
URL in `source-urls.txt` resolves.)*

**Consequence for phase 1:** the primary navigation must carry a third level. `PrimaryNav` is
built as a panel/mega-menu that can present a hub plus its children, not a flat link row. This
is a phase-1 architectural requirement, not a later addition.

## D-003 — Proceed on the proposed palette ✅ Confirmed 2026-08-29

Guide's brand assets are not available. The token layer in `docs/00-rebuild-plan.md` §5 is
used as a provisional system.

**This means the first homepage review judges composition, hierarchy, typography and rhythm —
not final brand.** When Guide's logo, colour values and typefaces arrive, they replace the
tokens in one file. Item 01 in `docs/01-content-and-assets-required.md` remains open.

## D-004 — Skills to be enabled before implementation ⏸ Blocked 2026-08-29

The seven skills named in the brief — `frontend-design`, `design-taste-frontend`,
`brand-guidelines`, `web-design-guidelines`, `image-to-code`, `webapp-testing`, `Ponytail` —
are not installed. Verified against the session skill list, the on-disk synced skills
directory, and the claude.ai skill and plugin catalogues.

**Decision: they will be enabled for this workspace before homepage implementation begins.**

Implementation is therefore on hold. Nothing further is built until the skills are available
and the go-ahead is given.

## Still open

- The 15 content items in `docs/01-content-and-assets-required.md`.
- Highest priority, and outside this repository: obtain the **Drupal export, database backup
  and public-files archive** from the current provider before the WEBPRO relationship ends.
