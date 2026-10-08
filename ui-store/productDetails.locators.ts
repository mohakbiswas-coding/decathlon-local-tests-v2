import { Locator, Page } from '@playwright/test';

/**
 * Locators of the Product Details Page (PDP).
 * brand, name, price, mainImage and pageNotFound are confirmed.
 * Everything marked "verify with Inspect" is a best guess - check it once in DevTools.
 */
export class ProductDetailsLocators {
  // ---- confirmed ----
  readonly brand: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly mainImage: Locator;
  readonly pageNotFound: Locator;
  readonly applicationError: Locator;

  // ---- core information ----
  readonly breadcrumbs: Locator;
  readonly productId: Locator;
  readonly mrp: Locator;
  readonly ratingValue: Locator;
  readonly reviewLink: Locator;

  // ---- colour ----
  readonly colourThumbnails: Locator;

  // ---- size and cart ----
  readonly sizeSection: Locator;
  readonly sizeOptions: Locator;
  readonly enabledSizeOptions: Locator;
  readonly sizeError: Locator;
  readonly lowStockLabel: Locator;
  /** One button that reads "Add to cart" first and "Go to cart" after adding. */
  readonly cartActionButton: Locator;

  constructor(private readonly page: Page) {
    this.brand = page.getByTestId('pdp-product-info-desktop:brand');
    this.name = page.getByTestId('pdp-product-info-name');
    this.price = page.getByTestId('pdp-price-desktop:selling-price');
    this.mainImage = page.getByTestId('pdp-product-image:image').first();
    this.pageNotFound = page.getByText(/page not found/i);
    this.applicationError = page.getByText(/something went wrong|application error/i); // verify with Inspect

    this.breadcrumbs = page.locator('nav[aria-label*="readcrumb" i]').or(page.getByTestId('breadcrumb:container')); // verify with Inspect
    this.productId = page.getByText(/^ID\s*:?\s*\d+/).first(); // verify with Inspect
    this.mrp = page.getByTestId('pdp-price-desktop:mrp'); // verify with Inspect
    this.ratingValue = page.getByTestId('pdp-product-info-desktop:rating'); // verify with Inspect
    this.reviewLink = page.getByTestId('pdp-product-info-desktop:review-link'); // verify with Inspect

    this.colourThumbnails = page.getByTestId('pdp-colour-selector:thumbnail'); // verify with Inspect

    this.sizeSection = page.getByTestId('pdp-size-selector:container'); // verify with Inspect
    this.sizeOptions = page.getByTestId('pdp-size-selector:size-button'); // verify with Inspect
    this.enabledSizeOptions = this.sizeOptions.and(page.locator(':not([disabled])'));
    this.sizeError = page.getByTestId('pdp-size-selector:error'); // verify with Inspect
    this.lowStockLabel = page.getByTestId('pdp-size-selector:low-stock'); // verify with Inspect
    this.cartActionButton = page.getByRole('button', { name: /add to cart|go to cart/i }).first();
  }

  /** The size button whose text is the given size, e.g. "6.5". */
  sizeOption(size: string): Locator {
    return this.sizeOptions.filter({ hasText: new RegExp(`^\\s*${size.replace('.', '\\.')}\\b`) }).first();
  }

  /** A piece of text that is shown on the page, e.g. the "Please select a size" message. */
  textOnPage(text: string): Locator {
    return this.page.getByText(text, { exact: true }).first();
  }
}
