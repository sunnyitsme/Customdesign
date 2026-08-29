import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 820 },
  { name: '768', width: 768, height: 1024 },
  { name: '430', width: 430, height: 932 },
  { name: '390', width: 390, height: 844 },
];

for (const vp of VIEWPORTS) {
  test(`${vp.name}px — renders, no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/', { waitUntil: 'networkidle' });

    // No horizontal page overflow at any supported viewport.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${vp.name}px`).toBeLessThanOrEqual(0);

    await page.screenshot({ path: `shots/home-${vp.name}.png`, fullPage: true });
  });
}

test('accessibility — axe, no serious or critical violations', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  if (serious.length > 0) {
    console.log(JSON.stringify(serious.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help })), null, 2));
  }
  expect(serious).toEqual([]);
});

test('heading hierarchy — one h1, no skipped levels', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const levels = await page.$$eval('h1,h2,h3,h4,h5,h6', (els) => els.map((e) => Number(e.tagName[1])));
  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
  }
});

test('keyboard — mega menu opens without hover and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const trigger = page.getByRole('button', { name: 'Mortgages' });
  await trigger.focus();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('link', { name: 'First-time buyers' })).toBeVisible();
  // Let the header's colour transition settle so the capture is not mid-flight.
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shots/megamenu-1440.png' });
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('mobile nav — native dialog traps focus and returns it', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const open = page.getByRole('button', { name: 'Open navigation menu' });
  await open.click();
  const dialog = page.getByRole('dialog', { name: 'Site navigation' });
  await expect(dialog).toBeVisible();
  await page.screenshot({ path: 'shots/mobilenav-390.png' });

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  // Native <dialog> returns focus to the trigger on close.
  await expect(open).toBeFocused();
});

test('reduced motion — hero video is not fetched', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const videoRequests: string[] = [];
  page.on('request', (r) => {
    if (/\.(webm|mp4)$/.test(r.url())) videoRequests.push(r.url());
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  expect(videoRequests).toEqual([]);
  await page.screenshot({ path: 'shots/home-reduced-motion.png', fullPage: true });
  await context.close();
});
