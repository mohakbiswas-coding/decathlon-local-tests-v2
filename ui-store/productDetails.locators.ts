import { Locator, Page } from '@playwright/test';

export class ProductDetailsLocators {
  readonly brand: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly mainImage: Locator;
  readonly pageNotFound: Locator;

  constructor(page: Page) {
    this.brand = page.getByTestId('pdp-product-info-desktop:brand');
    this.name = page.getByTestId('pdp-product-info-name');
    this.price = page.getByTestId('pdp-price-desktop:selling-price');
    this.mainImage = page.getByTestId('pdp-product-image:image').first();
    this.pageNotFound = page.getByText(/page not found/i);
  }
}
