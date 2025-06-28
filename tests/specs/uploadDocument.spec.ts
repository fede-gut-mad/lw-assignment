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
    removeUploadFileButton: "button.lw-source-document__remove-document-button.mdc-icon-button.mat-mdc-icon-button.mat-unthemed.mat-mdc-button-base",
};

test('Upload & Translate document', async ({page, deviceType}) => {

    //Handle the iframe
    const frame = page.frameLocator(selectors.iframeTranslator);

    //set translation to Danish
    await setLanguageOption(frame, Languages.Danish, deviceType);
    
    const handleUploader = frame.locator('input[type="file"]');
    await handleUploader.setInputFiles('tests/data/testSlide.pptx');

    await expect(frame.locator("span[title='testSlide.pptx']")).toBeVisible();
    await expect(frame.locator(selectors.removeUploadFileButton )).toBeVisible();
    await frame.getByRole('button', { name: 'Translate to Danish' }).click();


    //validate API responses on translate
    await validateOkResponseApi(page, '/translations/documents/upload', 201);
    await validateOkResponseApi(page, '/translations/documents/translate', 201);
    await validateOkResponseApi(page, '/analyzing.json', 200);
    await validateOkResponseApi(page, '/building-target.json', 200);
    await validateOkResponseApi(page, '/translations/documents/download/', 200);

    //Validate post translation elements
    await expect(frame.getByRole('button', { name: 'Translate more' })).toBeVisible({timeout: 10000});
    await expect(frame.getByRole('button', { name: 'Download' })).toBeVisible({timeout: 10000});

    //TODO: sad path, catching the error and retry, parametrize file name to later catch the selector

});
