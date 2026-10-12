import { Locator, Page } from '@playwright/test';
export class ProductDetailsLocators {
  readonly brand: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly mainImage: Locator;
  readonly pageNotFound: Locator;
  readonly applicationError: Locator;
  readonly breadcrumbs: Locator;
  readonly productId: Locator;
  readonly mrp: Locator;
  readonly ratingValue: Locator;
  readonly reviewLink: Locator;
  readonly colourThumbnails: Locator;
  readonly colorOptions: Locator;
  readonly sizeSection: Locator;
  readonly sizeOptions: Locator;
  readonly enabledSizeOptions: Locator;
  readonly sizeError: Locator;
  readonly lowStockLabel: Locator;
  readonly cartActionButton: Locator;
  readonly gotoCartButton: Locator;
  readonly addToCartConfirmationClose: Locator;

  constructor(private readonly page: Page) {
    this.brand = page.getByTestId('pdp-product-info-desktop:brand');
    this.name = page.getByTestId('pdp-product-info-name');
    this.price = page.getByTestId('pdp-price-desktop:selling-price');
    this.mainImage = page.getByTestId('pdp-product-image:image').first();
    this.pageNotFound = page.getByText(/page not found/i);
    this.applicationError = page.getByText(/something went wrong|application error/i);

    this.breadcrumbs = page.locator('nav[aria-label*="readcrumb" i]').or(page.getByTestId('breadcrumbs-desktop:breadcrumbs'));
    this.productId = page.getByText(/^ID\s*:?\s*\d+/).first();
    this.mrp = page.getByTestId('pdp-price-desktop:mrp');
    this.ratingValue = page.getByTestId('pdp-rating-desktop:value');
    this.reviewLink = page.getByTestId('pdp-rating-desktop:review-button');

    this.colourThumbnails = page.getByTestId('pdp-color-selector-desktop:title');
    this.colorOptions = page.getByTestId('pdp-color-selector-desktop:option-button');

    this.sizeSection = page.getByTestId('pdp-size-selector-desktop:title');
    this.sizeOptions = page.locator("ul[data-test-id='pdp-size-selector-desktop:grid'] > li > button");
    this.enabledSizeOptions = this.sizeOptions.and(page.locator(':not([disabled])'));
    this.sizeError = page.getByTestId('pdp-size-selector:error');
    this.lowStockLabel = page.getByTestId('pdp-size-selector:low-stock');
    this.cartActionButton = page.getByRole('button', { 'name': 'Add to cart' });
    this.gotoCartButton = page.getByTestId('button');
    this.addToCartConfirmationClose = page.locator("div[aria-label='Close']");
  }

  sizeOption(size: string): Locator {
    return this.sizeOptions.filter({ hasText: new RegExp(`^\\s*${size.replace('.', '\\.')}\\b`) }).first();
  }

  textOnPage(text: string): Locator {
    return this.page.getByText(text, { exact: true }).first();
  }
}
