# **LanguageWire QA Automation Challenge**

## **Tech Stack**

- Playwright with TypeScript
- Target CI/CD: Azure DevOps
- Performance test using k6
- Accessibility testing with axe-core

## **Overview**

This repo contains an automated test suite for LanguageWire's QA Automation assignmnet. The suite tests a demo version of LW's translation platform embedded on their public business page.

The suite covers the following use-cases:

-Copy & Paste translation from English to Danish
-Document translation upload and translation (using a .pptx file due to .docx upload issues)
-Language swap functionality using the swap button
-Persistence of the last selected language combination on page reload

Test suite uses Playwright with Typescript language. It is designed to run across multiple devices and viewports sizes, but focusing on Chrome as the main web-browser as per requirements.

## **Getting started**

-Requirements:
-Node.js v16 or higher
-npm package installed
-playwright dependencies installed

Steps

1. Open a project on your preferred code editor
2. Clone the repo (lw-assignment)
3. Install dependencies

```bash
npm install
npx playwright install
npm install --save-dev @types/node
```

## **Usage**

Run all tests in headed mode
``
npx playwright test --headed

Run all tests headlessly
``
npx playwright test --headless

Run tests with Playwright's UI
``
npx playwright test --ui

Run tests for an specific project(devices, can be found on playwright.config.ts)
``
npx playwright test --project=mobile

## **Test Structure**

tests/specs/: Contains the main test scenarios

tests/fixtures/: Custom fixtures to handle setup, device context, and common hooks

tests/helpers/: Utility functions for common actions like cookie banner removal, API validation, and language selection

Tests use Playwright’s project feature to cover multiple devices and viewport sizes as per requirements(responsive testing).

## **Known Limitations and Assumptions**

-No staging environment was provided — tests run against the demo site, which may introduce security restrictions or rate limits.

-Parsing errors encountered during uploading .docx testing. Limitation to only .pptx.

-Many elements lack unique selectors (e.g. missing data-testid, id, or unique aria-labels), making some locators brittle or dependent on visible text.

## **Responsiveness**

-Viewport sizes tests:
--Tablet (1024x768)
--Laptop (1280x800)
--Desktop Standard (1440x900)
--Desktop Full (1920x1080)
--Mobile (Pixel 5)

## **Performance Testing with k6**

You can simulate traffic to the text translation endpoint using k6 (https://k6.io/):

Install k6(for mac):

```
brew install k6


To run the load test and generate an html report

```

k6 run tests/performance/load-test.js --out json=test.json

## **Accessibility Testing**

This project includes an automated accessibility test powered by @axe-core/playwright and axe-html-reporter.

It loads the page using PW and runs an accessibility scan using axe-core. Finally, generates an html report listing all accessibility violations.

There is an option to comment the final assetions and turn strict mode off

To run the accessibility test on a particular device

```
npx playwright test tests/specs/accessibility.spec.ts --project=desktop-full

Report is saved to tests/reports/accessibility-report.html and it includes total violations count, grouped by severity and then a snippet with a summary and fix suggestions

## **CI/CD Integration**

-Tests can be integrated into Azure DevOps pipelines by running the appropriate npx playwright test commands.

-Environment variables (e.g. DEVICE, BASE_URL) can be injected via pipeline settings or .env files.
```

## **CI/CD Integration (Azure DevOps)**

This project includes a placeholder setup for Azure DevOps pipelines.

azure-pipelines.yml
The azure-pipelines.yml file is located in the root directory and defines a basic CI/CD pipeline for:

-Installing dependencies
-Running Playwright tests in headless mode
-Generating accessibility reports (axe-core)

-Pipeline Highlights
-Node.js environment setup with npm dependencies
-npx playwright install for browser dependencies
-Execution of all tests with HTML reporting
-Artifacts are stored and published if needed

-How to use
To use the pipeline:
1.Push this project to a Git repository (e.g., Azure Repos or GitHub).
2.Link the repo to Azure DevOps.
3.Create a new pipeline using the azure-pipelines.yml in the root.
4.Run the pipeline and monitor test execution + reports.

Note: Performance testing with k6 is currently excluded.
