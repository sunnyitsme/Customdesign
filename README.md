# Guide Financial Services — Website Rebuild

Complete rebuild of https://guidefs.co.uk as an original Guide Financial Services design.

The existing site is treated **only** as a source of approved content and existing URL
knowledge. None of its visual design, layout, component styling or page templates are carried
over.

## Run it locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

See [`docs/03-local-preview.md`](docs/03-local-preview.md) for the full preview
workflow, including why the cloud session cannot expose its own dev server, and
what to exercise when reviewing.

## Status

**Phase 0 — foundation proposal. Awaiting approval.** No application code yet.

- [`docs/00-rebuild-plan.md`](docs/00-rebuild-plan.md) — stack, design system, homepage
  architecture, dependency policy, URL migration approach
- [`docs/01-content-and-assets-required.md`](docs/01-content-and-assets-required.md) — every
  piece of content and every asset still needed from the firm
- [`reference/current-guide-site/`](reference/current-guide-site/) — migration pack from the
  2026-08-29 public crawl

## Content policy

Financial statistics, lender relationships, client numbers, case-study results, regulatory
claims, reviews, adviser qualifications, awards, office details, FCA permissions and
trust/legal/tax claims are **never invented**. Where approved content is missing, the component
is built with a clearly labelled placeholder recorded in `content/pending.ts`, and the
production build fails while any placeholder remains.

## Immediate action outside this repository

Obtain the **Drupal export / database backup / public-files archive** from the current provider
before the WEBPRO relationship ends. The migration pack contains page summaries only — no body
copy, media, PDFs or SEO metadata. See `docs/01-content-and-assets-required.md` §0.
