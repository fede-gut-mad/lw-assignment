import { test } from '@playwright/test';
import { removeCookieBanner } from '../helpers/helpers.ts';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.languagewire.com/products/languagewire-translate/');
  await page.waitForTimeout(3000);
  await removeCookieBanner(page);
});