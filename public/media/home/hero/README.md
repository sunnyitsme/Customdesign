# Homepage hero

The cinematic London sequence. Three files, exact names:

- `guide-london.webm`  — VP9 or AV1, primary
- `guide-london.mp4`   — H.264, fallback
- `guide-london-poster.webp` — first-frame poster still

Target a slow, locked-off or very slowly drifting shot, 10–20s, silent, that
loops without a visible cut. Grade it dark enough that white type sits over it
at 4.5:1 — the hero applies a scrim, but the scrim is not a rescue for a bright
plate.

All three present ⇒ the hero plays video. Any missing ⇒ it renders the still
placeholder instead. `lib/media.ts` makes that call at render time.

Licence record: `docs/media-licences/home-hero-london.md`.
