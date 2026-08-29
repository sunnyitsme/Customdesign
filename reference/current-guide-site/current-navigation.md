# Guide Financial Services — Current Public Site Structure

**Source:** https://guidefs.co.uk  
**Crawl date:** 2026-08-29

## Current navigation

- **Home** — `/`
- **About Us**
  - **Our Company** — `/gfs-our-company`
  - **Testimonials** — `/testimonials`
  - **FAQs** — `/faq`
  - **Terms of Business** — `/sites/default/files/clients/966/Gfs-tob-may2025.pdf`
  - **Privacy Notice** — `/sites/default/files/clients/966/Gfs-privacy-notice.pdf`
- **Services**
  - **Mortgages**
    - **Introduction To Mortgages** — `/introduction-to-mortgages`
    - **Mortgage Repayment** — `/mortgage-repayment`
    - **Buy-to-let** — `/buy-to-let-mortgages`
    - **Remortgaging** — `/remortgaging`
    - **Standard Variable Rate Mortgages** — `/standard-variable-rate-mortgages`
    - **Fixed Rate Mortgages** — `/fixed-rate-mortgages`
    - **Tracker Mortgages** — `/tracker-mortgages`
    - **Cashback Mortgages** — `/cashback-mortgages`
    - **Offset Mortgages** — `/offset-mortgages`
    - **Bad Credit Mortgages** — `/bad-credit-mortgages-direct`
  - **More Mortgage Options**
    - **First Time Buyer** — `/1st-time-buyer`
    - **Holiday Let Mortgages** — `/holiday-let-mortgages-direct`
    - **Limited Company Lending** — `/limited-company-lending-direct`
    - **Let-To-Buy Mortgages** — `/let-to-buy-mortgages-direct`
    - **Self Employed Mortgages** — `/self-employed-mortgages-direct`
    - **Second Properties** — `/second-properties-direct`
    - **High-Value Mortgages** — `/high-value-mortgages-direct`
    - **Retirement Interest Only Mortgages** — `/retirement-interest-only-mortgages-direct`
    - **Self Build Mortgages** — `/self-build-mortgages`
    - **Second Charge Mortgages** — `/second-charge-mortgages`
  - **Protection**
    - **Why Protection is Important** — `/why-protection-is-important`
    - **Life Assurance** — `/life-assurance`
    - **Family Income Benefit** — `/family-income-benefit`
    - **Income Protection** — `/income-protection`
    - **Private Medical Insurance** — `/private-medical`
    - **Critical Illness** — `/critical-illness`
    - **Landlord Insurance** — `/landlord-insurance-direct`
    - **Military Personnel** — `/military-personnel-direct`
  - **Business Protection**
    - **Introduction to Business Protection** — `/introduction-to-business-insurance`
    - **Directors' & Staff Benefits** — `/directors-and-staff-benefits`
    - **Income Protection** — `/income-protection-insurance`
    - **Share Protection** — `/share-protection`
    - **Key Person** — `/keyperson-insurance`
    - **Relevant Life Cover** — `/relevant-life-cover`
    - **Employers' Liability** — `/employers-liability-insurance`
    - **Professional Indemnity** — `/professional-indemnity-insurance`
  - **Specialist Lending & Property Finance**
    - **Introduction** — `/gfs-lending-and-property-finance`
    - **Bridging Loans** — `/gfs-bridging-loans`
    - **Development Finance** — `/gfs-development-finance`
    - **Commercial & Semi Commercial Mortgages** — `/gfs-commercial-and-semi-commercial-mortgages`
    - **Portfolio Landlord Finance** — `/gfs-portfolio-landlord-finance`
    - **Auction Finance** — `/gfs-auction-finance`
    - **House in Multiple Occupation (HMO) Finance** — `/gfs-house-in-multiple-occupation-finance`
    - **Second Charge & Debt Consolidation** — `/gfs-second-charge-and-debt-consolidation`
  - **Wills Writing Services** — `/gfs-wills-writing`
- **Calculators**
  - **Mortgage Borrow** — `/gfs-mortgage-borrow`
  - **Mortgage Repayment** — `/gfs-mortgage-repayment`
  - **How much can I borrow** — `/gfs-how-much-can-i-borrow`
  - **Overpayment** — `/gfs-overpayment`
  - **Stamp Duty** — `/gfs-stamp-duty`
- **Contact Us** — `/contact`
- **Client & Advisor**
  - **Client Login** — `https://client.guidemortgages.co.uk`
  - **Advisor Login** — `https://crm.guidemortgages.co.uk`

## Publicly available but not in the current main navigation

- `/our_team` — current Team page
- `/gfs-how-we-work` — legacy/currently unlinked How We Work page

## Page count

This migration inventory contains **59 first-party pages/documents** plus **4 known external dependencies/portals**.

## Important architecture notes

- The public site exposes a large service hierarchy with separate Mortgage, More Mortgage Options, Protection, Business Protection, Specialist Lending & Property Finance and Wills sections.
- Five calculator pages depend on `calcs.webprocentral.co.uk`.
- Client and adviser login destinations are separate external subdomains.
- Google Tag Manager is present on the public site.
