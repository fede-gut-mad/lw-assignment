import { expect } from '@playwright/test'; 
import { test } from '../fixtures/fixtures';
import '../fixtures/testSetup';
import { validateOkResponseApi, setLanguageOption } from '../helpers/helpers';

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

export const selectors = {
    iframeTranslator: '#lwt-widget',
};

test('Reload and verify language selection', async ({page, deviceType}) => {
    //Handle the iframe
    const frame = page.frameLocator(selectors.iframeTranslator);
    
    //set translation to Danish
    await setLanguageOption(frame, Languages.Danish, deviceType);

    // Reload the full page or the iframe
    await page.reload();

    await page.waitForLoadState('domcontentloaded');

    const newFrame = page.frameLocator(selectors.iframeTranslator);

    // Assert that Danish is still the selected target language
    await expect(newFrame.getByRole('button', { name: Languages.Danish })).toBeVisible();
        

})
