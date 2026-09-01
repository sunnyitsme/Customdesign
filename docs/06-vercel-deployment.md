# Vercel deployment

Everything the project needs is configured and verified. **The deployment
itself could not be performed from the Claude Code environment** — see Blockers.

## Blockers (two, independent)

1. **`api.vercel.com` is unreachable.** The network egress proxy refuses the
   connection: `curl: (56) CONNECT tunnel failed, response 403`. Every Vercel
   CLI operation — login, link, deploy — goes through that host. The proxy's
   bypass list is fixed (npm, PyPI, crates, Go, Anthropic APIs, local ranges)
   and cannot be extended from inside a session.
2. **No authentication.** `vercel whoami` exits 1 and no `auth.json` exists.

Both must be cleared. A `VERCEL_TOKEN` alone would **not** be enough — blocker 1
stops the request before any credential is presented.

## How to deploy

The fastest path avoids the CLI entirely and uses Vercel's Git integration:

1. **https://vercel.com/new** → import `sunnyitsme/Custom-design`
2. **Project name:** `guide-fs` (fall back to `guide-financial-services`)
3. **Framework preset:** Next.js — auto-detected
4. **Root Directory:** `./`
5. Install and build commands come from `vercel.json`; leave Output Directory
   empty so Vercel manages Next.js output natively.
6. **Environment variables: none.** Add nothing. See below.
7. Deploy from branch `claude/guide-fs-website-rebuild-hx3nlg`.

Once the repo is connected, every push to that branch produces a preview
deployment automatically. Nothing needs merging to `main`.

To use the CLI instead, the domain has to be allowlisted first, then
`vercel login` → `vercel link` → `vercel --prebuilt=false`.

## Environment variables — none required

Every variable the app reads is optional and degrades honestly:

| Variable | If unset |
|---|---|
| `CRM_ENDPOINT` | `/api/contact` validates and returns `delivered: false` with "Validated, but not delivered". Nothing is faked. |
| `TURNSTILE_SECRET_KEY` | Verification hook stays inert. |
| `NEXT_PUBLIC_SITE_URL` | Falls back to `https://guidefs.co.uk` for sitemap/robots URLs. |
| `GUIDE_STRICT_CONTENT` | **Must stay unset.** Setting it to `1` refuses the build. |
| `VERCEL_ENV` | Set by Vercel automatically. |

**Do not add secrets to get the contact form "working".** Delivery needs a CRM
endpoint, credentials and a defined retention policy — `contact.delivery` in
`content/pending.ts`, still blocking launch.

## ⚠️ A production deployment will fail the build — by design

Verified:

```
VERCEL_ENV=production pnpm build  →  BUILD REFUSED: 14 item(s) block a
                                     production launch.   (exit 1)
VERCEL_ENV=preview    pnpm build  →  succeeds
```

`scripts/check-pending.ts` refuses any production build while launch-blocking
content is unresolved. That is the gate working, not a fault, and it should not
be weakened to obtain a URL.

**For a stable demo link, use the branch alias instead.** Vercel gives every
branch a URL that stays constant across pushes:

```
https://guide-fs-git-claude-guide-fs-website-rebuild-hx3nlg-<scope>.vercel.app
```

It is a preview deployment, so it builds cleanly and stays noindex. It gives you
the stable link without touching the gate.

## Vercel does not inherit the GitHub Pages config

The Pages export is behind `GUIDE_STATIC_EXPORT=1`, set only by
`scripts/build-pages.mjs`. Vercel sets none of those variables. Verified against
a clean `pnpm build`:

| | Value on Vercel |
|---|---|
| `basePath` | `""` |
| `output` | `null` (not `"export"`) |
| `images.unoptimized` | `false` — optimisation on |
| redirects | 56 |
| headers | 1 (`X-Robots-Tag`) |
| `/Custom-design` in output | none |

The site runs from `/`, and `/api/contact`, server components, redirects,
headers and Image optimisation all work.

## Preview stays out of Google

Three independent layers, none dependent on the host:

1. `app/layout.tsx` — `robots: { index: false, follow: false }`
2. `app/robots.ts` — `Disallow: /` unless `VERCEL_ENV === "production"`
3. `next.config.ts` `headers()` — `X-Robots-Tag: noindex, nofollow, noarchive`
   on every non-production deployment

## Upload size

`.vercelignore` keeps `shots/` (39MB of review screenshots), `docs/` (9MB),
`reference/`, `tests/` and `.github/` out of the upload — about 48MB that is
read at neither build nor run time. `public/` (31MB, mostly the hero mp4) ships,
because it is served.

## Media

All 38 `/media/` references resolve to files on disk. Two optional hero assets
are absent and are referenced **zero** times, so they cost no 404s:

- `guide-london.webm` — the mp4 is present and serves; a webm would be a smaller
  alternative encode.
- `guide-london-poster.webp` — the intended LCP still. Without it the hero shows
  flat navy until the 28MB mp4 becomes playable.

Adding either file activates it with no code change.
