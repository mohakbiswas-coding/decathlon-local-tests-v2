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
    this.items = page.getByTestId('in-stock-cart-items');
    this.itemImage = page.getByTestId("image:cart-product-image");
    this.itemName = page.getByTestId('text:cart-product-name');
    this.itemSize = page.getByTestId('selected-size-display');
    this.itemQuantity = page.getByTestId('qty-display');
    this.sellingPrice = page.getByTestId('cart:product-selling-price');
    this.mrp = page.getByTestId('cart:product-mrp-price');
    this.summaryDiscount = page.getByTestId('cart:cart-checkout-discount');
    this.summaryTotal = page.locator("div[data-test-id='cart:cart-checkout-total-cart-value'] > p");
    this.loginToProceed = page.getByRole('button', { 'name' : 'Login to Proceed' });
  }
}
