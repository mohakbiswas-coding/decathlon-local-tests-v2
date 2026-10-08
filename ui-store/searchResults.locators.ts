import { Locator, Page } from '@playwright/test';

export class SearchResultsLocators {
  readonly heading: Locator;
  readonly productCards: Locator;
  readonly loader: Locator;

  constructor(page: Page) {
    this.heading = page.locator('h1').first();
    this.productCards = page.getByTestId('product-card'); // verify with Inspect
    this.loader = page.getByTestId('loader'); // verify with Inspect
  }
}
