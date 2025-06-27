import {test as base} from '@playwright/test';

export const test = base.extend<{
    deviceType: string;
  }>({
    deviceType: async ({}, use, testInfo) => {
      await use(testInfo.project.name); 
    },
  });