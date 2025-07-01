import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import '../fixtures/testSetup';
import { createHtmlReport } from 'axe-html-reporter';
import path from 'path';

// ✅ Use a relative path to avoid axe-html-reporter from mangling it
const reportDir = 'tests/reports';
const reportName = 'accessibility-report.html';

test('Accessibility check', async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  createHtmlReport({
    results: accessibilityScanResults,
    options: {
      outputDir: reportDir,         // ✅ RELATIVE PATH ONLY
      reportFileName: reportName,
    },
  });

  // ✅ Log the absolute path cleanly for your reference
  const fullPath = path.join(process.cwd(), reportDir, reportName);
  console.log(`Accessibility report saved at: ${fullPath}`);

  // Optional: strict checking
  // expect(accessibilityScanResults.violations).toEqual([]);
});
