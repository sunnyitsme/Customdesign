import { expect, test } from '@playwright/test';

/**
 * Phase 1 approved-state capture.
 *
 * Capture only — this suite must not change the design. It produces the review
 * set for the frozen header plus the hero and the four core divisions.
 *
 * Output: shots/phase1/
 */

const OUT = 'shots/phase1';

/** Scroll the divisions section to the top of the viewport. */
async function toServices(page: import('@playwright/test').Page, offset = 32) {
  await page.evaluate((off) => {
    const section = document.querySelector('section[aria-labelledby="divisions-heading"]');
    if (section) {
      window.scrollTo({
        top: window.scrollY + section.getBoundingClientRect().top - off,
        behavior: 'instant',
      });
    }
  }, offset);
  // Let the header's colour transition and the plate cross-fade settle.
  await page.waitForTimeout(700);
}

const VIEWPORTS = [
  { name: '1440x1000', width: 1440, height: 1000 },
  { name: '1280x900', width: 1280, height: 900 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '430x932', width: 430, height: 932 },
  { name: '390x844', width: 390, height: 844 },
];

for (const vp of VIEWPORTS) {
  test(`${vp.name} — hero at initial load`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Confirm we are capturing the true initial state, not a scrolled one.
    const header = await page.locator('header').evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(header, `header should be transparent at rest (${vp.name})`).toBe('rgba(0, 0, 0, 0)');

    await page.screenshot({ path: `${OUT}/${vp.name}-1-hero.png` });
  });

  test(`${vp.name} — services section`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/', { waitUntil: 'networkidle' });
    await toServices(page);
    await page.screenshot({ path: `${OUT}/${vp.name}-2-services.png` });
  });
}

test('390x844 — mobile menu open', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const dialog = page.getByRole('dialog', { name: 'Site navigation' });
  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: /Show Mortgages services/ }).click();
  await expect(page.getByRole('button', { name: /Hide Mortgages services/ })).toBeVisible();
  await page.waitForTimeout(400);

  await page.screenshot({ path: `${OUT}/390x844-3-menu-open.png` });
});

test('1440 — full page, complete Phase 1', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);

  await page.screenshot({ path: `${OUT}/1440-full-page.png`, fullPage: true });
});
