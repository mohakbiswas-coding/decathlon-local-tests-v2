import { Locator } from '@playwright/test';

/** Locators inside ONE product card. Pass in the card, get its parts. */
export class ProductCardLocators {
  readonly image: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly mrp: Locator;
  readonly rating: Locator;
  readonly discount: Locator;
  readonly colours: Locator;
  readonly wishlist: Locator;
  readonly addToCart: Locator;

  constructor(card: Locator) {
    this.image = card.locator('img').first();
    this.name = card.getByTestId('product-card:name'); // verify with Inspect
    this.price = card.getByTestId('product-card:price'); // verify with Inspect
    this.mrp = card.getByTestId('product-card:mrp'); // verify with Inspect
    this.rating = card.getByTestId('product-card:rating'); // verify with Inspect
    this.discount = card.getByTestId('product-card:discount'); // verify with Inspect
    this.colours = card.getByTestId('product-card:colours'); // verify with Inspect
    this.wishlist = card.getByRole('button', { name: /wishlist/i });
    this.addToCart = card.getByRole('button', { name: /add to cart/i });
  }
}
