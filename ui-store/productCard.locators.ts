import { Locator } from '@playwright/test';

/** Locators inside ONE product card. Pass in the card, get its parts. */
export class ProductCardLocators {
  readonly image: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly mrp: Locator;
  readonly rating: Locator;
  readonly discount: Locator;
  readonly wishlist: Locator;
  readonly addToCart: Locator;

  constructor(card: Locator) {
    this.image = card.locator('img').first();
    this.name = card.getByTestId('product-card:product-card:title');
    this.price = card.getByTestId('product-card-product-card:selling-price');
    this.mrp = card.getByTestId('product-card-product-card:mrp');
    this.rating = card.getByTestId('product-card:review-count');
    this.discount = card.getByTestId('product-card-product-card:discount');
    this.wishlist = card.getByTestId("add-to-wishlist-button");
    this.addToCart = card.getByTestId("add-to-cart-button");
  }
}
