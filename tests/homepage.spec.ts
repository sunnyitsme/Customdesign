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

/**
 * Header breakpoint regression.
 *
 * The desktop navigation switches on at 74rem (1184px). Below that the drawer
 * is active. This previously collided at 1024-1080: the nav wrapper carried
 * min-w-0, so the <ul> reported a shrunken box while its children overflowed
 * unclipped and the CTA sat on top of "Insights".
 */
const HEADER_WIDTHS = [1024, 1080, 1100, 1152, 1180, 1200, 1280, 1440];
const DESKTOP_NAV_FROM = 1184;

for (const width of HEADER_WIDTHS) {
  test(`header at ${width}px — correct mode, no collision, no clipping`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);

    const desktop = width >= DESKTOP_NAV_FROM;
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    const cta = page.getByRole('banner').getByRole('link', { name: 'Speak to an adviser' });

    if (desktop) {
      await expect(trigger).toBeHidden();
      await expect(cta).toBeVisible();

      const geometry = await page.evaluate(() => {
        // Top-level hub controls only; panel links inside are hidden.
        const items = Array.from(document.querySelectorAll('header nav > ul > li'))
          .map((li) => li.querySelector(':scope > a, :scope > button'))
          .filter((el): el is HTMLElement => el !== null);
        const actions = document.querySelector('header > div')?.lastElementChild;
        const actionsLeft = actions ? actions.getBoundingClientRect().left : Infinity;
        return {
          lastRight: Math.round(items[items.length - 1]!.getBoundingClientRect().right),
          actionsLeft: Math.round(actionsLeft),
          // Any nav label whose text is clipped by its own box.
          clipped: items.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent),
        };
      });

      const gap = geometry.actionsLeft - geometry.lastRight;
      expect(geometry.clipped, `clipped nav labels at ${width}px`).toEqual([]);
      expect(gap, `nav/actions gap at ${width}px`).toBeGreaterThanOrEqual(40);
    } else {
      await expect(trigger).toBeVisible();
      await expect(page.locator('header nav[aria-label="Primary"]')).toBeHidden();
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  });
}

/**
 * Utility-login disclosure regression.
 *
 * Both portal links inline cost 152px and left a 25-36px nav/actions gap at
 * every width from 1536 up — the header bar is capped at --container-max, so a
 * wider viewport yields *less* content width, not more. The compact disclosure
 * costs 41px and appears at 85rem (1360px), the first width that clears the
 * phone number switching on at 82rem with a relaxed gap.
 */
const PORTAL_LOGIN_FROM = 1360;
const COMFORTABLE_GAP = 56;

for (const width of [1440, 1500, 1536, 1600, 1663, 1664, 1680, 1728, 1760, 1920]) {
  test(`header at ${width}px — utility login present and header stays relaxed`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(220);

    const login = page.getByRole('button', { name: 'Login' });
    await expect(login).toBeVisible();
    await expect(login).toHaveAttribute('aria-expanded', 'false');

    // CTA and phone must both survive at every desktop width.
    await expect(page.getByRole('banner').getByRole('link', { name: 'Speak to an adviser' })).toBeVisible();
    await expect(page.getByRole('banner').getByRole('link', { name: '0333 034 8993' })).toBeVisible();

    const geometry = await page.evaluate(() => {
      const bar = document.querySelector('header > div')!;
      const actions = bar.lastElementChild!;
      const items = Array.from(document.querySelectorAll('header nav > ul > li'))
        .map((li) => li.querySelector(':scope > a, :scope > button'))
        .filter((el): el is HTMLElement => el !== null);
      const controls = [...items, ...Array.from(actions.querySelectorAll('a, button'))] as HTMLElement[];
      return {
        gap: Math.round(actions.getBoundingClientRect().left - items[items.length - 1]!.getBoundingClientRect().right),
        clipped: controls.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    expect(geometry.clipped, `clipped header controls at ${width}px`).toEqual([]);
    expect(geometry.gap, `nav/actions gap at ${width}px`).toBeGreaterThanOrEqual(COMFORTABLE_GAP);
    expect(geometry.overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  });
}

test(`utility login is hidden below ${PORTAL_LOGIN_FROM}px`, async ({ page }) => {
  await page.setViewportSize({ width: PORTAL_LOGIN_FROM - 1, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('button', { name: 'Login' })).toBeHidden();
  // Still reachable in the drawer at widths where the drawer is the navigation.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Client login' })).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Advisor login' })).toBeVisible();
});

test('utility login disclosure — keyboard operable, Escape closes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const login = page.getByRole('button', { name: 'Login' });
  await login.focus();
  await page.keyboard.press('Enter');
  await expect(login).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Client login' })).toBeVisible();
  await expect(page.getByRole('banner').getByRole('link', { name: 'Advisor login' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(login).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Client login' })).toBeHidden();
});
