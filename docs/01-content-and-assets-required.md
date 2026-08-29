# Homepage — Content & Assets Still Required

**For:** Guide Financial Services
**Purpose:** every item below is needed before the new homepage can carry production content.
Until each is supplied and approved, the corresponding component ships with a visible
development placeholder. Nothing on this list will be invented, estimated or inferred.

**Priority key:** 🔴 blocks a production launch · 🟠 blocks the design being judged fairly · 🟡 can follow

---

## 0. Before anything else 🔴

**Obtain the Drupal export / database backup / public-files archive from WEBPRO.**

The migration pack we hold contains page *summaries only* — no body copy, no images, no PDFs,
no SEO metadata. If the WEBPRO relationship ends before this export is taken, the existing
content, media library and metadata are unrecoverable. This is the highest-priority item on
the project and it is not a design task.

Also required from the firm: **GTM container ID, GA4 property access, and Search Console
access**, so analytics continuity and SEO history survive the migration.

---

## 1. Brand 🔴

- Logo as **SVG** — full lockup and any mark-only variant, in both dark-on-light and light-on-dark.
- Brand colour values (hex). We are currently working to a proposed palette that is **ours, not
  Guide's** — it will be replaced once the real values arrive.
- Brand typefaces and their **licences**. If none exist, confirm the open-source pairing we've
  proposed (Newsreader + Instrument Sans) is acceptable.
- Any existing brand guidelines document.
- Favicon / app icon source.

## 2. Hero video 🔴

- The London financial-district footage itself, with **confirmed ownership or licence**
  (stock licence reference, or shot for Guide).
- Ideally 8–12 seconds, silent, loopable, no on-screen text or recognisable branding.
- A poster still from the same footage — this becomes the LCP image.
- Confirmation of the approved **headline** and **one supporting line**. We will not write
  positioning copy for a regulated firm without sign-off.
- Approved labels for the primary and secondary CTAs.

## 3. Credibility statistics 🔴

**No statistics exist anywhere in the source material.** We need, for each figure Guide wants
to show:

- the figure itself,
- what exactly it measures,
- the source and as-at date,
- who approved it.

Typical candidates — *these are prompts, not suggestions of values*: years established, number
of advisers, size of lender panel, cases arranged. Note that published figures are financial
promotions and need compliance sign-off.

## 4. Lender & provider logos 🔴

- The approved list of lenders and providers.
- Logo files (SVG preferred).
- **Written permission to display each mark**, since displaying a third-party logo without it
  is a trademark exposure.
- The approved wording for the relationship. We are using *"Lenders & Providers We Work With"*
  and will not use "partners" unless Guide confirms these are contractual partnerships.

The current homepage has a partner/membership logo section, but the migration pack does not
record which logos it contains — so the list has to come from the firm.

## 5. Case studies 🔴

**The current site has no case-study content at all.** Required per case study: the scenario,
what Guide did, the outcome, and compliance sign-off. Also needed:

- Confirmation of whether Guide may publish **past case outcomes** at all, and under what
  wording — past results in a regulated context carry specific restrictions.
- Confirmation that each is anonymised to the firm's satisfaction, with client consent where
  identifying.

## 6. Reviews / social proof 🟠

- The **actual testimonial text** from `/testimonials` (four pages of it, per the crawl) — we
  hold only the summary that it exists.
- Whether Guide has a **Google Business Profile** and/or **Trustpilot** listing, and the
  profile IDs, if we are to display live ratings.
- Permission to keep reviewer names as currently published.
- Compliance note: client testimonials on a regulated firm's site are a financial-promotion
  consideration and should be reviewed before republication.

## 7. Advisers / leadership 🟠

The unlinked `/our_team` page names **Jiwan Singh Dhanik, Pravin Singh, Rajesh D'sa and
Prasanna Shetty**. Required:

- Confirmation the team page is **current** — it has been removed from the main navigation,
  which often means it is stale.
- Professional photography (portrait orientation).
- Approved bios and roles.
- Verified qualifications — we will not restate a qualification we cannot confirm.
- Direct contact details, if these are to be shown.

## 8. Insights 🟠

The current site has **no blog, news or insights section**. Either:

- supply at least three approved articles (title, author, date, body, image), or
- confirm we launch with the Insights section hidden from the homepage.

The navigation the brief specifies includes Insights, so a decision is needed either way.

## 9. "How Guide Works" process 🟠

An unlinked `/gfs-how-we-work` page exists describing a six-phase process. **The migration pack
itself flags that it contains investment-planning language that does not align with the current
four-pillar proposition and should be compliance-reviewed before reuse.** We need an approved
3–5 step process reflecting how Guide actually works today.

## 10. Regulatory footer wording 🔴

The pack lists the footer's *topics* but not its verbatim text. We need the exact approved
wording for:

- the FCA authorisation statement,
- the secured-lending / repossession risk warning,
- the lender-criteria qualification,
- the Buy-to-Let regulatory qualification,
- the protection policy-lapse warning,
- the statement covering Wills, Estate Planning and Commercial Mortgages,
- the UK-regime targeting statement.

Also: confirm whether the footer should lead with **Asset Guide Limited** (legal entity) or
**Guide Financial Services** (trading name).

## 11. Contradictions in the current site to resolve 🔴

These are flagged in the migration pack and must be settled before either version is republished:

1. **Office count.** The Company page names three offices; the footer lists four (Leeds is the
   difference). Which is correct?
2. **Contact details.** The Terms of Business and Privacy Notice PDFs use a **Manchester/Sale
   address and `info@guidemortgages.co.uk`**, while the public site uses the **Brentford address
   and `enquiries@guidefs.co.uk`**. Regulatory documents disagreeing with the website on how to
   contact the firm is a compliance risk, not a copy inconsistency.
3. **`/our_team`** is publicly reachable but removed from navigation — publish or retire it.
4. **`/gfs-how-we-work`** is publicly reachable with off-proposition language — see §9.

## 12. Photography 🟠

The premium direction depends on photography more than on any code we write. Required:
architectural / London / interior / client-meeting imagery, **owned or licensed**, high
resolution. Generic stock will visibly undercut the intended quality level.

## 13. Forms and routing 🟡

- Where "Speak to an Adviser" and the callback form should submit — CRM endpoint, email, or a
  third-party form service.
- The required fields, and the consent/privacy wording to show at the point of submission.
- Whether a phone-only path is acceptable at launch.

## 14. Legal documents 🟡

- Current Terms of Business and Privacy Notice (or confirmation the May 2025 versions stand).
- Confirmation that the existing PDF URLs should be preserved via redirect.
- Cookie/consent approach, given GTM is in use.

## 15. SEO decision 🔴

The current site has roughly 40 thin service pages that likely earn long-tail organic traffic.
Consolidating them into four hubs risks that traffic irreversibly. **Recommendation:** retain
them as child pages under the new hubs rather than redirecting many-to-one. This needs Guide's
decision, ideally informed by Search Console data.
