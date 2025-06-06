import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.{ts,tsx}',
  timeout: 10000,
  expect: {
    timeout: 5000
  },
  fullyParallel: !process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'html' : 'line',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    }
  ],
  webServer: {
    command: 'npm run dev -- --port 3001',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
    stderr: 'pipe',
    stdout: 'pipe',
  },
});
