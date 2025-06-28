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

test('Swap languages', async ({page, deviceType}) => {
    const translator = new TranslatorWidget(page);

    await translator.selectLanguage(Languages.Danish, deviceType);
    await translator.enterText('Hello, this is a test!');
    await validateOkResponseApi(page, '/translations/text');
    await translator.swapLanguages();
    await translator.assertTargetLanguage(Languages.EnglishUk);
    await translator.assertTranslatedText('Hello, this is a test!');

})
