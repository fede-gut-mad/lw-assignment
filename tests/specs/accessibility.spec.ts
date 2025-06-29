import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import '../fixtures/testSetup';
import { createHtmlReport } from 'axe-html-reporter';
import fs from 'fs';
import path from 'path';

// Report path: tests/reports/
const reportDir = path.resolve(__dirname, '..', 'reports');
const reportName = 'accessibility-report.html';

test('Accessibility check', async ({ page }) => {

  //analize page  
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  //create HTML report
  const reportHTML = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      outputDir: reportDir,
      reportFileName: reportName,
    },
  });

  fs.mkdirSync(reportDir, { recursive: true });

  const reportPath = path.join(reportDir, reportName);
  fs.writeFileSync(reportPath, reportHTML);

  console.log(`Accessibility report saved at: ${reportPath}`);

  //Strict mode - can be commented in order to not have it fail
  expect(accessibilityScanResults.violations).toEqual([]);
});

