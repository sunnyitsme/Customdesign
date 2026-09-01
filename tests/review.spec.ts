import { expect, test } from '@playwright/test';

/**
 * Phase 1 visual review pass.
 *
 * Capture and measurement only — this suite must not change the design. It
 * produces the review screenshot set and the overflow / text-wrap measurements
 * reported alongside them.
 */

const VIEWPORTS = [
  { name: '1440x1000', width: 1440, height: 1000 },
  { name: '1280x900', width: 1280, height: 900 },
  { name: '1024x900', width: 1024, height: 900 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '430x932', width: 430, height: 932 },
  { name: '390x844', width: 390, height: 844 },
];

/** Horizontal overflow, plus any element extending past the viewport edge. */
async function measureOverflow(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const offenders: { tag: string; cls: string; right: number }[] = [];
    for (const el of Array.from(document.querySelectorAll('body *'))) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > de.clientWidth + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName,
          cls: String((el as HTMLElement).className).slice(0, 70),
          right: Math.round(r.right),
        });
      }
    }
    return { overflow: de.scrollWidth - de.clientWidth, viewport: de.clientWidth, offenders: offenders.slice(0, 6) };
  });
}

/**
 * Line-box measurement for headings. Flags orphans — a final line carrying a
 * small fraction of the widest line, which is what "awkward wrapping" usually
 * means in practice.
 */
async function measureWrapping(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const out: { tag: string; text: string; lines: number; lastPct: number; clipped: boolean }[] = [];
    for (const el of Array.from(document.querySelectorAll('h1, h2, h3, p, a, span, button'))) {
      const text = (el.textContent ?? '').trim();
      if (!text || el.children.length > 0) continue;
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0);
      if (rects.length === 0) continue;
      const widths = rects.map((r) => r.width);
      const max = Math.max(...widths);
      const last = widths[widths.length - 1] ?? 0;
      const clipped = el.scrollWidth > el.clientWidth + 1;
      if (rects.length > 1 || clipped) {
        out.push({
          tag: el.tagName,
          text: text.slice(0, 46),
          lines: rects.length,
          lastPct: Math.round((last / max) * 100),
          clipped,
        });
      }
    }
    return out;
  });
}

const report: Record<string, unknown> = {};

for (const vp of VIEWPORTS) {
  test(`capture ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const overflow = await measureOverflow(page);
    const wrapping = await measureWrapping(page);
    report[vp.name] = { overflow, wrapping };

    console.log(`\n[${vp.name}] overflow=${overflow.overflow}px offenders=${overflow.offenders.length}`);
    for (const o of overflow.offenders) console.log(`   OVERFLOW ${o.tag} .${o.cls} right=${o.right}`);
    const orphans = wrapping.filter((w) => w.lines > 1 && w.lastPct < 18);
    const clipped = wrapping.filter((w) => w.clipped);
    for (const o of orphans) console.log(`   ORPHAN  ${o.tag} "${o.text}" ${o.lines} lines, last=${o.lastPct}%`);
    for (const c of clipped) console.log(`   CLIPPED ${c.tag} "${c.text}"`);
    if (orphans.length === 0 && clipped.length === 0) console.log('   no orphans, no clipped text');

    await page.screenshot({ path: `shots/review/full-${vp.name}.png`, fullPage: true });
    expect(overflow.overflow).toBeLessThanOrEqual(0);
  });
}

test('A — desktop hero, initial load, transparent navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const header = await page.locator('header').evaluate((el) => getComputedStyle(el).backgroundColor);
  console.log(`\n[A] header background at scrollY=0: ${header}`);
  expect(header).toBe('rgba(0, 0, 0, 0)');
  await page.screenshot({ path: 'shots/review/A-hero-transparent-nav-1440.png' });
});

test('B — desktop navigation, scrolled solid state', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const before = await page.locator('header').evaluate((el) => getComputedStyle(el).backgroundColor);
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(900); // let the 420ms colour transition finish
  const after = await page.locator('header').evaluate((el) => getComputedStyle(el).backgroundColor);

  // Resolve --color-ground rather than hardcoding a hex. A literal here turns
  // every palette change into a test failure that says nothing about behaviour;
  // what this test is actually asserting is that the header goes from
  // transparent to the page ground.
  const ground = await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = 'var(--color-ground)';
    document.body.appendChild(probe);
    const value = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return value;
  });

  console.log(`\n[B] header transition: ${before} -> ${after} (ground ${ground})`);
  expect(before).toBe('rgba(0, 0, 0, 0)');
  expect(after).toBe(ground);

  await page.screenshot({ path: 'shots/review/B-nav-scrolled-solid-1440.png' });
});

test('C — desktop services section', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });
  // scrollIntoViewIfNeeded is a no-op here: at 1000px tall the heading is
  // already on screen at rest. Scroll to the section explicitly instead.
  await page.evaluate(() => {
    const section = document.querySelector('section[aria-labelledby="divisions-heading"]');
    if (section) window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - 40, behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'shots/review/C-services-desktop-1440.png' });
});

test('D — mobile hero and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'shots/review/D-hero-nav-mobile-390.png' });
});

test('E — mobile menu open, keyboard operable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  // Reach and open the trigger by keyboard alone.
  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  await trigger.focus();
  await expect(trigger).toBeFocused();
  await page.keyboard.press('Enter');

  const dialog = page.getByRole('dialog', { name: 'Site navigation' });
  await expect(dialog).toBeVisible();

  // Tab into the dialog and expand a hub with the keyboard.
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const mortgages = page.getByRole('button', { name: /Show Mortgages services/ });
  await mortgages.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: /Hide Mortgages services/ })).toBeVisible();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'shots/review/E-mobile-menu-open-390.png' });

  // Focus must stay inside the modal dialog while it is open.
  const focusInside = await page.evaluate(() => {
    const dlg = document.querySelector('dialog');
    return dlg ? dlg.contains(document.activeElement) : false;
  });
  console.log(`\n[E] focus contained inside dialog: ${focusInside}`);
  expect(focusInside).toBe(true);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  console.log('[E] Escape closed the dialog and returned focus to the trigger');
});

test('F — mobile services section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const section = document.querySelector('section[aria-labelledby="divisions-heading"]');
    if (section) window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - 24, behavior: 'instant' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'shots/review/F-services-mobile-390.png' });
});

test('G — prefers-reduced-motion honoured', async ({ browser }) => {
  const context = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const media: string[] = [];
  page.on('request', (r) => {
    if (/\.(webm|mp4)$/.test(r.url())) media.push(r.url());
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const durations = await page.evaluate(() =>
    Array.from(document.querySelectorAll('header, h1, section'))
      .map((el) => getComputedStyle(el).transitionDuration)
      .filter(Boolean),
  );
  console.log(`\n[G] video requests under reduced motion: ${media.length}`);
  console.log(`[G] transition durations: ${[...new Set(durations)].join(', ')}`);
  expect(media).toEqual([]);

  await page.screenshot({ path: 'shots/review/G-reduced-motion-1440.png', fullPage: true });
  await context.close();
});
