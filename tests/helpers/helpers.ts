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

export async function validateOkResponseApi(page: Page, callUrl:string) {
  try {
    const response = await page.waitForResponse(res => 
        res.url().includes(callUrl) && 
        res.status() === 200, 
        {timeout: 5000} 
    );
    console.log('API response received:', response.status(), response.statusText());
}catch (error) {
    console.error('API response error', error);
}
}