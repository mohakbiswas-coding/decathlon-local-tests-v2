import { Locator, Page } from '@playwright/test';

export class HeaderLocators {
  readonly logo: Locator;
  readonly searchField: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.logo = page.getByTestId("header-desktop:logo-link");
    this.searchField = page.getByTestId("search-input-desktop:container");
    this.cartIcon = page.getByTestId("header-desktop:cart-link");
    this.cartBadge = page.getByTestId("header-desktop:cart-count-badge");
  }
}
