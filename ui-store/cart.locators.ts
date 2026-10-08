import { Locator, Page } from '@playwright/test';

/** Locators of the Cart Items page. All are best guesses - verify with Inspect. */
export class CartLocators {
  readonly items: Locator;
  readonly itemImage: Locator;
  readonly itemName: Locator;
  readonly itemSize: Locator;
  readonly itemQuantity: Locator;
  readonly sellingPrice: Locator;
  readonly mrp: Locator;
  readonly summaryDiscount: Locator;
  readonly summaryTotal: Locator;
  readonly loginToProceed: Locator;

  constructor(page: Page) {
    this.items = page.getByTestId('cart-item'); // verify with Inspect
    this.itemImage = this.items.first().locator('img').first();
    this.itemName = this.items.first().getByTestId('cart-item:title'); // verify with Inspect
    this.itemSize = this.items.first().getByTestId('cart-item:size'); // verify with Inspect
    this.itemQuantity = this.items.first().getByTestId('cart-item:quantity'); // verify with Inspect
    this.sellingPrice = this.items.first().getByTestId('cart-item:selling-price'); // verify with Inspect
    this.mrp = this.items.first().getByTestId('cart-item:mrp'); // verify with Inspect
    this.summaryDiscount = page.getByTestId('order-summary:discount'); // verify with Inspect
    this.summaryTotal = page.getByTestId('order-summary:total'); // verify with Inspect
    this.loginToProceed = page.getByRole('button', { name: /login to proceed/i });
  }
}
