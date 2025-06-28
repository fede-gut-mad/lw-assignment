import { Page } from '@playwright/test';
import '../fixtures/testSetup';
import '../fixtures/fixtures';
import { test } from '../fixtures/fixtures';


export async function removeCookieBanner(page: Page) {
  const cookieButton = await page.getByRole('button', { name: /accept cookies/i });

  if (await cookieButton.isVisible()) {
    console.log('Cookie banner visible, clicking...');
    await cookieButton.click();
  } else {
    console.log('No cookie banner detected.');
  }
}

export async function validateOkResponseApi(page: Page, callUrl:string, status: number = 200) {
  try {
    const response = await page.waitForResponse(res => 
        res.url().includes(callUrl) && 
        res.status() === status, 
        {timeout: 5000} 
    );
    console.log(`'API response received for ${callUrl}:'`, response.status(), response.statusText());
  } catch (error) {
    console.error(`'API response error received for ${callUrl}:'`, error);
    throw error
  }
}

export async function checkForUnexpectedError(page: Page): Promise<boolean> {
  const frame = page.frameLocator('#lwt-widget');
  const errorPopup = frame.getByText('An unexpected error has');

  try {
    return await errorPopup.isVisible();
  } catch {
    return false; // If not found, treat as no error
  }
}