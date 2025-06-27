import {test, expect} from '@playwright/test';
import '../fixtures/testSetup';
import '../fixtures/test-fixtures';

test('Copy & Paste translation from English to Danish', async({page, deviceType}) =>{

    //scroll to demo section
    //iframe#lwt-widget
    await page.locator('iframe#lwt-widget').scrollIntoViewIfNeeded();
    console.log('Running on:', deviceType);
    //Handle the iframe
    const frame = page.frameLocator('#lwt-widget');

    //set translation to Danish
    await frame.getByRole('button', { name: 'English (UK)' }).click();
    // await frame.locator('span.mdc-button__label').getByText('Danish').click();
    await frame.getByText('Danish').click();

    //copy and paste translation
    await frame.locator('textarea.cdk-textarea-autosize.lw-source-text__input').fill('Hello, this is a test!');

    //catch api response and wait for translation to be processed
    try {
        const response = await page.waitForResponse(res => 
            res.url().includes('/translations/text') && 
            res.status() === 200, 
            {timeout: 5000} 
        );
        console.log('API response received:', response.status(), response.statusText());
    }catch (error) {
        console.error('API response error', error);
    }

    //assert translation danish
    await expect(frame.locator('div.lw-output-text__title.hide-gt-sm')).toContainText('Danish');
    await expect(frame.locator('div.lw-output-text__text')).toContainText('Hej, dette er en test!');




})