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
    sourceTextArea: 'textarea.cdk-textarea-autosize.lw-source-text__input',
    translatedLanguage: 'div.lw-output-text__title.hide-gt-sm',
    outputText:'div.lw-output-text__text',
};

test('Swap languages', async ({page, deviceType}) => {

    //Handle the iframe
    const frame = page.frameLocator(selectors.iframeTranslator);

    //set translation to Danish
    await setLanguageOption(frame, Languages.Danish, deviceType);

    //copy and paste translation
    await frame.locator(selectors.sourceTextArea).fill('Hello, this is a test!');

    //catch api response and wait for translation to be processed
    await validateOkResponseApi(page, '/translations/text');

    //Swap languages
    await frame.getByRole('button').filter({ hasText: 'sync_alt' }).click();


    //assert translation swap
     await expect(frame.locator(selectors.translatedLanguage)).toContainText(Languages.EnglishUk);
     await expect(frame.locator(selectors.outputText)).toContainText('Hello, this is a test!');
})