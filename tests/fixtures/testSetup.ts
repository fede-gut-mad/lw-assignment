import { test } from '@playwright/test';
import { removeCookieBanner } from '../helpers/helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/products/languagewire-translate/');
  await page.waitForTimeout(3000);
  await removeCookieBanner(page);
  await page.locator('iframe#lwt-widget').scrollIntoViewIfNeeded();
  
});