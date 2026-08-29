# External Dependencies and Migration Risks

## WEBPRO Central calculators

Current calculator pages embed third-party iframes from:

`https://calcs.webprocentral.co.uk`

Affected current pages:
- `/gfs-mortgage-borrow`
- `/gfs-mortgage-repayment`
- `/gfs-how-much-can-i-borrow`
- `/gfs-overpayment`
- `/gfs-stamp-duty`

**Migration implication:** confirm contractual/licensing rights before assuming these can be reused after WEBPRO is removed. Prefer Guide-owned calculators in the new architecture if full independence is required.

## Client / adviser systems

- Client portal: `https://client.guidemortgages.co.uk`
- Adviser/CRM portal: `https://crm.guidemortgages.co.uk`

These are separate from the public marketing site and should be treated as external systems during the rebuild.

## Analytics

Google Tag Manager is present in the public HTML output.

**Migration implication:** obtain the firm's GTM, GA4 and Search Console access so tracking and SEO history are preserved.

## Legal PDFs

- Terms of Business: `https://guidefs.co.uk/sites/default/files/clients/966/Gfs-tob-may2025.pdf`
- Privacy Notice: `https://guidefs.co.uk/sites/default/files/clients/966/Gfs-privacy-notice.pdf`

Preserve the current public URLs or implement deliberate redirects if document locations change.
