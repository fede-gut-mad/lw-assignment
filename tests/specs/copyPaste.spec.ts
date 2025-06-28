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

test('Copy & Paste translation from English to Danish', async({page, deviceType}) =>{
    const translator = new TranslatorWidget(page);

    await translator.selectLanguage(Languages.Danish, deviceType);
    await translator.enterText('Hello, this is a test!');
    await validateOkResponseApi(page, '/translations/text');
    await translator.assertTargetLanguage(Languages.Danish);
    await translator.assertTranslatedText('Hej, dette er en test!');

});
