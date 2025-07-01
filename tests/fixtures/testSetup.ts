import { test } from '@playwright/test';
import { removeCookieBanner } from '../helpers/helpers';

test.beforeEach(async ({ page, context }) => {
  // Block GDPR privacy cookie banner script
  await page.route('**/uc.js', route => route.abort());

  await page.goto('/products/languagewire-translate/');
  await page.waitForTimeout(3000);
  // await removeCookieBanner(page);
  await page.locator('iframe#lwt-widget').scrollIntoViewIfNeeded();
  
});