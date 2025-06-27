import { expect } from '@playwright/test'; 
import { test } from '../fixtures/test-fixtures';
import '../fixtures/testSetup';
import '../fixtures/test-fixtures';
import { validateOkResponseApi } from '../helpers/helpers';

export const selectors = {
    demoTranslatorSection: 'iframe#lwt-widget',
    iframeTranslator: '#lwt-widget',
    inputTranslatorTest: 'textarea.cdk-textarea-autosize.lw-source-text__input',
    translatedLanguage: 'div.lw-output-text__title.hide-gt-sm',
    translatedText:'div.lw-output-text__text',
};

test('Copy & Paste translation from English to Danish', async({page, deviceType}) =>{
    console.log('currently on this device:', deviceType);
    const isMobile: boolean = deviceType === 'mobile';

    //scroll to demo section
    await page.locator(selectors.demoTranslatorSection).scrollIntoViewIfNeeded();
    console.log('Running on:', deviceType);
    //Handle the iframe
    const frame = page.frameLocator(selectors.iframeTranslator);

    //set translation to Danish
    if(isMobile) {
        await frame.getByRole('button', { name: 'English (UK)' }).click();
        await frame.getByText('Danish').click();
    } else {
        await frame.getByText('English (UK)keyboard_arrow_down').click();
        await frame.getByText('Danish').click();
    }


    //copy and paste translation
    await frame.locator(selectors.inputTranslatorTest).fill('Hello, this is a test!');

    //catch api response and wait for translation to be processed
    await validateOkResponseApi(page, '/translations/text');

    //assert translation danish
    await expect(frame.locator(selectors.translatedLanguage)).toContainText('Danish');
    await expect(frame.locator(selectors.translatedText)).toContainText('Hej, dette er en test!');

});