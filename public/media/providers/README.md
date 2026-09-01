# Lender and provider marks

**Do not add a file here without written permission on record.**

A logo is someone else's trade mark. Downloading one from a search result, a
press page, or a broker portal is not permission to publish it, and an
intermediary relationship is not automatically a licence to use the brand.

For each mark the firm must confirm either:

1. written permission from the lender/provider to display the mark, or
2. confirmed intermediary brand-usage rights covering this website.

Record which one, and where the evidence lives, in `docs/media-licences/`.

Then set `permissionConfirmed: true` on that provider in `content/providers.ts`.
Until that flag is true the site renders a neutral placeholder slot instead of
the mark — the file being present on disk does not display it. That is
deliberate: permission is tracked in reviewable code, not in whoever remembered
to check.

See `content/pending.ts` → `providers.list`.
