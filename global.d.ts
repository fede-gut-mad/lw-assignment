import { TestArgs } from '@playwright/test';

declare module '@playwright/test' {
  interface TestArgs {
    deviceType: string;
  }
}
