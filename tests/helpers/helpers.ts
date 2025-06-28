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
}catch (error) {
    console.error(`'API response error received for ${callUrl}:'`, error);
}
}

export async function setLanguageOption(frame: any, language: string, deviceType?: string) {
  const isMobile: boolean = deviceType === 'mobile';
  if (isMobile) {
    await frame.getByRole('button', { name: 'English (UK)' }).click();
    await frame.getByText(language).click();
  } else {
    await frame.getByText('English (UK)keyboard_arrow_down').click();
    await frame.getByText(language).click();
  }
} 