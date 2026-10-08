import { Locator, Page } from '@playwright/test';

export class ProductDetailsLocators {
  readonly brand: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly mainImage: Locator;
  readonly pageNotFound: Locator;

  constructor(page: Page) {
    this.brand = page.getByTestId('pdp:brand'); // verify with Inspect
    this.name = page.getByTestId('pdp:product-name'); // verify with Inspect
    this.price = page.getByTestId('pdp:price'); // verify with Inspect
    this.mainImage = page.getByTestId('pdp:main-image'); // verify with Inspect
    this.pageNotFound = page.getByText(/page not found/i);
  }
}
