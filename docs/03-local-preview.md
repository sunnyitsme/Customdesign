# Live preview — running the site in your own browser

## Why this is a local workflow

The Claude Code session builds and tests this site inside an isolated cloud
container. That container has **no port forwarding to the outside world**: its
address is `192.0.2.2`, a reserved documentation range that is not routable, no
preview or forwarded-port URL is provided, and the session's egress proxy
explicitly does not support tunnel clients or non-443 ports.

So a dev server started in the session is reachable from the session and from
its automated browser, and from nowhere else. To click through the site
yourself, run it on your own machine.

## First time

```bash
git clone https://github.com/sunnyitsme/Custom-design.git
cd Custom-design
git checkout claude/guide-fs-website-rebuild-hx3nlg

corepack enable          # the repo uses pnpm; skip if you already have it
pnpm install
```

`npm install` and `npm run …` work too — the lockfile is pnpm's, so pnpm gives
an exact match.

## Run it

```bash
pnpm dev
```

Then open:

```
http://localhost:3000
```

`pnpm preview` is the same thing bound to `0.0.0.0`, for viewing on a phone or
another machine on the same network (`http://<your-computer-ip>:3000`).
`next.config.ts` already allows LAN origins, without which Next refuses to serve
its own dev chunks and the page loads unstyled and unhydrated.

## Review the production build instead

Development mode shows the placeholder markers and skips optimisation. For what
a visitor would actually get:

```bash
pnpm preview:prod
```

Same URL. The content gate still prints its report; it only refuses the build
under `GUIDE_STRICT_CONTENT=1`.

## What to exercise

- Scroll the full page — the rhythm is designed as one composition.
- **Resize across 1232px** — the desktop nav and Login disclosure appear
  together; below it the drawer takes over.
- **Resize across 1360px** — the telephone number joins.
- Open a hub menu (Mortgages, Property Finance…), then press `Escape`.
- Open the **Login** disclosure; `Escape` and outside-click both close it.
- Below 1232px, open the drawer: focus is trapped, `Escape` closes it and
  returns focus to the trigger.
- **Hover the lender marquee** — it stops dead, and resumes when you leave.
- **Hover the reviews marquee** — same, at roughly a third of the speed.
- On a touch device, swipe either marquee: it is a real scroll container, and
  the autoplay continues from where you left it.
- Turn on **Reduce Motion** in your OS and reload: both marquees stop and stay
  manually scrollable, and the hero video is never fetched.

## Screenshots

`scripts/capture.mjs` takes the standard review set — homepage at desktop and
mobile, the four hubs, a mortgage child page, a property-finance child page,
contact, both header states, and the footer.

```bash
npm run preview                 # in one terminal
node scripts/capture.mjs docs/screenshots
```

It needs a server already running; it does not start one. `CAPTURE_BASE`
overrides the URL if you are not on port 3000.

## Known, expected

- `/favicon.ico` returns 404 — no favicon exists yet. It is part of the
  outstanding `brand.identity` item, not a fault.
- The hero shows a placeholder plate, not video: the three files in
  `public/media/hero/` have not been supplied. Dropping them in activates the
  video path with no code change.
- Dashed labels mark unapproved content. They are development-only and are
  stripped from production builds.
