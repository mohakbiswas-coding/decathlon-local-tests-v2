import { Locator, Page } from '@playwright/test';

export class HeaderLocators {
  readonly logo: Locator;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.logo = page.locator('[data-test-id="header-desktop:logo-link"]');
    this.searchField = page.locator('[data-test-id="search-input-desktop:container"]');
  }
}
