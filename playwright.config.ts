import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: "npm run start",
    port: 3000,
    timeout: 120 * 1000,
  },
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    // video: 'on-first-retry',
  },
  retries: 1,
  testMatch: /.*(spec)\.(js|ts)/,
  workers: process.env.CI ? 1 : 4,
};

module.exports = config;
