import { Page } from '@playwright/test';

export async function removeCookieBanner(page: Page) {
  const cookieButton = await page.getByRole('button', { name: /accept cookies/i });

  if (await cookieButton.isVisible()) {
    console.log('Cookie banner visible, clicking...');
    await cookieButton.click();
  } else {
    console.log('No cookie banner detected.');
  }
}
