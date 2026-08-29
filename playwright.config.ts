import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    launchOptions: {
      executablePath: '/opt/pw-browsers/chromium',
      // Chromium does not honour no_proxy, so local traffic would otherwise be
      // routed through this sandbox's agent proxy. Bypass it so the dev server
      // is reached directly. (Next also blocks dev chunks for non-localhost origins.)
      args: ['--no-proxy-server'],
    },
  },
});
