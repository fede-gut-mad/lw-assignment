import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',
  // fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  timeout: 30000,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'always' }]],
  use: {
    baseURL: 'https://www.languagewire.com',
    trace: 'retain-on-failure', //'on-first-retry'
    screenshot: 'only-on-failure',
    headless: true, //switch to true for CI
    viewport: { width: 1280, height: 720 }, //to set a default viewport size
    ignoreHTTPSErrors: true, //to avoid HTTPS errors
    // video: 'retain-on-failure',
  },
  projects: [
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
    // Uncomment the following projects to enable testing on different devices
    // Currently disabled due to website security restrictions on multiple requests
    // {
    //   name: 'tablet',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     viewport: { 
    //       width: 1024,
    //       height: 768 
    //       } 
    //   },
    // },
    // {
    //   name: 'laptop',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     viewport: { 
    //       width: 1280, 
    //       height: 800 
    //     } 
    //   },
    // },
    // {
    //   name: 'desktop-full',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     viewport: { 
    //       width: 1920, 
    //       height: 1080 
    //     } 
    //   },
    // },
    // {
    //   name: 'mobile',
    //   use: { 
    //     ...devices['Pixel 5'] },
    // },
  ],
});
