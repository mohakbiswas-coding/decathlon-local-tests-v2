import { expect, Page } from '@playwright/test';
import { HeaderLocators } from '../ui-store/header.locators';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly header: HeaderLocators;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderLocators(page);
  }

  async launch(): Promise<void> {
    await this.open('/');
  }

  async waitForHeader(): Promise<void> {
    await this.waitUntilVisible(this.header.logo);
    await this.waitUntilVisible(this.header.searchField);
  }

  async openSearch(): Promise<void> {
    await this.click(this.header.searchField);
  }

  async verifyBackgroundPageRemainsVisible(): Promise<void> {
    await expect(this.header.logo).toBeVisible();
  }
}
