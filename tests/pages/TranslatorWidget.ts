import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class TranslatorWidget {
  private page: Page;
  private frame: FrameLocator;

  selectors = {
    iframeTranslator: '#lwt-widget',
    sourceTextArea: 'textarea.cdk-textarea-autosize.lw-source-text__input',
    translatedLanguage: 'div.lw-output-text__title.hide-gt-sm',
    outputText:'div.lw-output-text__text',
    removeUploadFileButton: "button.lw-source-document__remove-document-button.mdc-icon-button.mat-mdc-icon-button.mat-unthemed.mat-mdc-button-base",

};

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator(this.selectors.iframeTranslator);
  }



  async selectLanguage(language: string, deviceType?: string) {
    const isMobile = deviceType === 'mobile';

    if (isMobile) {
      await this.frame.getByRole('button', { name: 'English (UK)' }).click();
      await this.frame.getByText(language).click();
    } else {
      await this.frame.getByText('English (UK)keyboard_arrow_down').click();
      await this.frame.getByText(language).click();
    }
  }

  async enterText(input: string) {
    await this.frame.locator(this.selectors.sourceTextArea).fill(input);
  }

  async uploadFile(filePath: string) {
    await this.frame.locator('input[type="file"]').setInputFiles(filePath);
  }

  async clickTranslateTo(language: string) {
    await this.frame.getByRole('button', { name: `Translate to ${language}` }).click();
  }

  async swapLanguages() {
    await this.frame.getByRole('button').filter({ hasText: 'sync_alt' }).click();
  }

  async assertTranslatedText(text: string) {
    await expect(this.frame.locator(this.selectors.outputText)).toContainText(text);
  }

  async assertTargetLanguage(text: string) {
    await expect(this.frame.locator(this.selectors.translatedLanguage)).toContainText(text);
  }

  async assertFileUploadVisible(fileName: string) {
    await expect(this.frame.locator(`span[title='${fileName}']`)).toBeVisible();
    await expect(this.frame.locator(this.selectors.removeUploadFileButton)).toBeVisible();
  }

  async assertPostTranslationButtons() {
    await expect(this.frame.getByRole('button', { name: 'Translate more' })).toBeVisible();
    await expect(this.frame.getByRole('button', { name: 'Download' })).toBeVisible();
  }
}
