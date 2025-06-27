import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',
  // fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  timeout: 30000,
  // workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.languagewire.com/products/languagewire-translate/',
    trace: 'retain-on-failure', //'on-first-retry'
    headless: false, //switch to true for CI
    viewport: { width: 1280, height: 720 }, //to set a default viewport size
    ignoreHTTPSErrors: true, //to avoid HTTPS errors
    // video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'tablet',
      use: { 
        ...devices['Desktop Chrome'], 
        viewport: { 
          width: 1024,
          height: 768 
          } 
      },
    },
    {
      name: 'laptop',
      use: { 
        ...devices['Desktop Chrome'], 
        viewport: { 
          width: 1280, 
          height: 800 
        } 
      },
    },
    {
      name: 'desktop-standard',
      use: { 
        ...devices['Desktop Chrome'], 
        viewport: { 
          width: 1440, 
          height: 900 
        } 
      },
    },
    {
      name: 'desktop-full',
      use: { 
        ...devices['Desktop Chrome'], 
        viewport: { 
          width: 1920, 
          height: 1080 
        } 
      },
    },
    {
      name: 'mobile',
      use: { 
        ...devices['Pixel 5'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
