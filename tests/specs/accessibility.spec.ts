import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import '../fixtures/testSetup';
import { createHtmlReport } from 'axe-html-reporter';
import path from 'path';

const reportDir = 'tests/reports';
const reportName = 'accessibility-report.html';

test('Accessibility check', async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  createHtmlReport({
    results: accessibilityScanResults,
    options: {
      outputDir: reportDir,    
      reportFileName: reportName,
    },
  });

  const fullPath = path.join(process.cwd(), reportDir, reportName);
  console.log(`Accessibility report saved at: ${fullPath}`);

  // Optional: strict checking
  // expect(accessibilityScanResults.violations).toEqual([]);
});
