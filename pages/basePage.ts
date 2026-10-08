import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitUntilVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async isVisible(locator: Locator, timeout = 3_000): Promise<boolean> {
    return locator.isVisible({ timeout }).catch(() => false);
  }
}
