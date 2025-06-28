import { TranslatorWidget } from '../pages/TranslatorWidget';
import { expect } from '@playwright/test'; 
import { test } from '../fixtures/fixtures';
import '../fixtures/testSetup';
import { validateOkResponseApi } from '../helpers/helpers';

export const Languages = {
    Danish: 'Danish',
    EnglishUk: 'English (UK)',
    German: 'German',
    Spanish: 'Spanish',
    French: 'French',
    EnglishUs: 'English (US)',
    Dutch: 'Dutch',
    Norwegian: 'Norwegian',
    Swedish: 'Swedish',
}

test('Reload and verify language selection', async ({page, deviceType}) => {
    const translator = new TranslatorWidget(page);

    await translator.selectLanguage(Languages.Danish, deviceType);
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    const newFrame = page.frameLocator('#lwt-widget');
    // Assert that Danish is still the selected target language
    await expect(newFrame.getByRole('button', { name: Languages.Danish })).toBeVisible();

})
