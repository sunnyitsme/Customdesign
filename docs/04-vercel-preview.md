# Vercel preview deployment — setup

**Status: not deployed. Blocked on account access, which only you can grant.**

This document is the complete setup; everything on the repository side is done
and verified.

## Why I could not deploy it myself

Two independent blockers, both outside my control:

1. **No Vercel account access.** No token, no CLI, no `~/.vercel`, and no Vercel
   tool in this session. Per your instruction I did not invent credentials.
2. **The network blocks it anyway.** `api.vercel.com` returns
   `CONNECT tunnel failed, response 403` from this container's egress proxy. A
   token alone would not have been enough.

## What you need to click — about three minutes

1. Go to **https://vercel.com/new**.
2. **Import Git Repository** → connect GitHub if prompted → choose
   **`sunnyitsme/Custom-design`**.
   - If it is not listed, use *Adjust GitHub App Permissions* and grant access
     to that repository.
3. On the configure screen, leave everything at the detected defaults:
   - Framework preset: **Next.js** (auto-detected)
   - Install command: **`pnpm install`** (auto-detected from `pnpm-lock.yaml`)
   - Build command: **`pnpm build`**
   - Root directory: **`./`**
   - No environment variables are required.
4. Click **Deploy**.

The first deploy builds whatever `main` points at. `main` has no commits, so
either let it fail and use step 5, or set the Production Branch to something
other than `main` first — it does not matter for a preview.

5. **Deploy the review branch.** In the Vercel project:
   **Settings → Git → Production Branch** — leave as `main`, then go to
   **Deployments → Create Deployment**, and pick branch
   **`claude/guide-fs-website-rebuild-hx3nlg`**.

   Simpler alternative: open a pull request from that branch. Vercel comments
   the preview URL straight onto the PR and redeploys on every push. Say the
   word and I will open the PR — I have not, because you asked me not to create
   one without approval.

Your preview URL will look like
`https://custom-design-<hash>-<team>.vercel.app`.

## Do not do any of these

- Do **not** add the `guidefs.co.uk` domain in Vercel.
- Do **not** change any DNS record.
- Do **not** promote a deployment to production.
- Do **not** touch WEBPRO or the live site.

None of this is required for a preview, and none of it has been done.

## The content gate, and why production is safe

`scripts/check-pending.ts` runs before every build. Strict mode **refuses** the
build, and it turns on when either is true:

- `VERCEL_ENV === "production"` — any production deployment, on any host that
  sets it;
- `GUIDE_STRICT_CONTENT === "1"` — explicit opt-in, for local or CI checks.

Production strictness is therefore **derived from the deployment environment,
not from a variable anyone has to remember to set**. A preview cannot weaken it:
there is no value you can put in the preview environment that turns production
strict mode off — `GUIDE_STRICT_CONTENT=0` does not disable it, because only the
two conditions above are consulted.

Verified locally:

| Environment | Result |
| --- | --- |
| local | warns, builds |
| `VERCEL_ENV=preview` | warns, builds — placeholders render |
| `VERCEL_ENV=production` | **BUILD REFUSED**, exit 1 |
| `VERCEL_ENV=production` + `GUIDE_STRICT_CONTENT=0` | **BUILD REFUSED**, exit 1 |

So if anyone ever clicks *Promote to Production* while launch-blocking content
is outstanding, the build fails rather than publishing placeholders.

## Placeholder visibility

Placeholder markers are visible in every environment **except** a production
deployment — the review environment is exactly where they are needed. They are
stripped only when `VERCEL_ENV === "production"`, a build that is refused anyway
while blocking items remain.

## Indexing

`next.config.ts` sends `X-Robots-Tag: noindex, nofollow, noarchive` on every
response unless `VERCEL_ENV === "production"`, and the app metadata sets
`robots: index:false`. A preview URL cannot be indexed.

## Expected on the preview — not faults

- **Every navigation and footer link returns 404.** Only the homepage exists in
  this phase. `app/not-found.tsx` explains that rather than showing a bare
  framework 404. The browser console will also show ~28 prefetch 404s on load,
  from Next prefetching those same unbuilt routes.
- **`/favicon.ico` 404s.** No favicon yet; tracked under `brand.identity`. Left
  pending rather than inventing a temporary mark.
- **The hero shows a placeholder plate, not video.** The three files in
  `public/media/hero/` have not been supplied.

## Verified against the production bundle

I cannot open the deployed URL, so I built the production bundle exactly as a
preview deployment would (`VERCEL_ENV=preview pnpm build`), served it with
`next start`, and drove it with a real browser:

- No application runtime errors; CSS, Archivo and Source Serif 4 all load.
- Hero, header, footer and CTAs render.
- Mega menu and Login disclosure open and close on `Escape`.
- Mobile drawer opens and closes at 1024, 768, 430 and 390.
- Lender marquee moves 68px/1.5s and stops dead on hover.
- Reviews marquee moves 21px/1.5s and stops dead on hover.
- Reduced motion: both marquees still, hero video never fetched, both still
  manually scrollable.
- No horizontal overflow at 1440, 1024, 768, 430 or 390.

This is the same bundle Vercel will serve, so the deployed behaviour should
match. Confirm it once the URL exists.
