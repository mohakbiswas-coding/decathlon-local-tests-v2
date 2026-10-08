import { Locator, Page } from '@playwright/test';

export class HeaderLocators {
  readonly logo: Locator;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.logo = page.getByTestId("header-desktop:logo-link");
    this.searchField = page.getByTestId("search-input-desktop:container");
  }
}
