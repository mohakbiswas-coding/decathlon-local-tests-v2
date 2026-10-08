import { expect, Locator, Page } from '@playwright/test';
import { HeaderLocators } from '../ui-store/header.locators';
import { ProductDetailsLocators } from '../ui-store/productDetails.locators';
import { logger } from '../utils/Logger';
import { BasePage } from './basePage';

/** Product Details Page (PDP). */
export class ProductPage extends BasePage {
  readonly product: ProductDetailsLocators;
  readonly header: HeaderLocators;

  constructor(page: Page) {
    super(page);
    this.product = new ProductDetailsLocators(page);
    this.header = new HeaderLocators(page);
  }

  // ---- opening and loading ----
  async openProduct(productUrl: string): Promise<void> {
    await this.open(productUrl);
  }

  async waitForProductToLoad(): Promise<void> {
    await this.waitUntilVisible(this.product.name);
  }

  // ---- basic checks ----
  async verifyUrlHasProductPath(productPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(productPath));
  }

  async verifyBrandAndNameAreVisible(): Promise<void> {
    await expect(this.product.brand).toBeVisible();
    await expect(this.product.name).toBeVisible();
  }

  async verifyNameMatches(expectedName: string): Promise<void> {
    const shown = ("decathlon " + await this.product.name.innerText()).toLowerCase();
    expect(shown).toContain(expectedName.toLowerCase());
  }

  async verifyPriceAndImageAreVisible(): Promise<void> {
    await expect(this.product.price).toBeVisible();
    await expect(this.product.mainImage).toBeVisible();
  }

  async verifyNoPageNotFound(): Promise<void> {
    await expect(this.product.pageNotFound).toBeHidden();
  }

  async verifyNoApplicationError(): Promise<void> {
    await expect(this.product.applicationError).toBeHidden();
  }

  async verifyStillOnProductPage(productPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(productPath));
  }

  // ---- core product information ----
  async verifyBreadcrumbs(expectedItems: string[]): Promise<void> {
    await expect(this.product.breadcrumbs).toBeVisible();
    for (const item of expectedItems) {
      await expect(this.product.breadcrumbs).toContainText(item, { ignoreCase: true });
    }
  }

  async verifyBrand(expectedBrand: string): Promise<void> {
    await expect(this.product.brand).toContainText(expectedBrand, { ignoreCase: true });
  }

  async verifyNameContains(expectedName: string): Promise<void> {
    await expect(this.product.name).toContainText(expectedName, { ignoreCase: true });
  }

  async verifyProductId(expectedId: string): Promise<void> {
    await expect(this.product.productId).toContainText(expectedId);
  }

  async verifyMrpIsVisible(): Promise<void> {
    await expect(this.product.mrp).toBeVisible();
  }

  async verifyRatingAndReviewLinkAreVisible(): Promise<void> {
    await expect(this.product.ratingValue).toBeVisible();
    await expect(this.product.reviewLink).toBeVisible();
  }

  async verifyColourOptionsAreVisible(minimum = 1): Promise<void> {
    await expect(this.product.colourThumbnails.first()).toBeVisible();
    expect(await this.product.colourThumbnails.count()).toBeGreaterThanOrEqual(minimum);
  }

  async verifySizeOptionsAndAddToCartAreVisible(): Promise<void> {
    await expect(this.product.sizeOptions.first()).toBeVisible();
    await expect(this.product.cartActionButton).toBeVisible();
  }

  async verifyPriceAndSizeControlsAreVisible(): Promise<void> {
    await expect(this.product.price).toBeVisible();
    await expect(this.product.sizeOptions.first()).toBeVisible();
  }

  // ---- colour variants ----
  async getMainImageSource(): Promise<string> {
    return (await this.product.mainImage.getAttribute('src')) ?? '';
  }

  async selectColour(index: number): Promise<void> {
    await this.click(this.product.colorOptions.nth(index));
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyMainImageChanged(previousSource: string): Promise<void> {
    await expect.poll(() => this.getMainImageSource()).not.toBe(previousSource);
  }

  /** A colour can be a separate variant (new URL / product ID) or just a new image. */
  logVariantChange(urlBefore: string): void {
    const urlAfter = this.page.url();
    if (urlAfter !== urlBefore) {
      logger.info(`Colour is a separate variant. URL changed: ${urlBefore} -> ${urlAfter}`);
    } else {
      logger.info('Colour did not change the URL (same product page, new image)');
    }
  }

  // ---- size selection ----
  /** All sizes that can be bought must look the same, i.e. none is highlighted. */
  async verifyNoSizeIsSelected(): Promise<void> {
    await expect(this.product.enabledSizeOptions.first()).toBeVisible();
    const styles = new Set<string>();
    const count = await this.product.enabledSizeOptions.count();
    for (let i = 0; i < count; i++) {
      styles.add(await this.getHighlightStyle(this.product.enabledSizeOptions.nth(i)));
    }
    expect(styles.size, 'a size already looks selected').toBe(1);
  }

  async selectSize(size: string): Promise<void> {
    await this.click(this.product.sizeOption(size));
  }

  private async findOtherEnabledSize(size: string): Promise<Locator> {
    const options = this.product.enabledSizeOptions;
    const count = await options.count();
    for (let i = 0; i < count; i++) {
      const text = (await options.nth(i).innerText()).trim();
      if (!text.startsWith(size)) return options.nth(i);
    }
    throw new Error(`No other enabled size found next to ${size}`);
  }

  async verifySizeOptionsRemainAvailable(): Promise<void> {
    await expect(this.product.sizeOptions.first()).toBeVisible();
  }

  async verifyLowStockIfAvailable(label: string): Promise<void> {
    if (await this.isVisible(this.product.lowStockLabel)) {
      await expect(this.product.lowStockLabel).toContainText(label, { ignoreCase: true });
      logger.info(`Low-stock label is displayed: ${label}`);
    } else {
      logger.info('Low-stock label is not displayed (not applicable for this size)');
    }
  }

  async verifySizeErrorIsVisible(message: string): Promise<void> {
    await expect(this.product.textOnPage(message)).toBeVisible();
  }

  async verifySizeErrorIsHidden(message: string): Promise<void> {
    await expect(this.product.textOnPage(message)).toBeHidden();
  }

  // ---- add to cart ----
  async getCartCount(): Promise<number> {
    if (!(await this.isVisible(this.header.cartBadge))) return 0;
    const digits = (await this.header.cartBadge.innerText()).replace(/\D/g, '');
    return digits === '' ? 0 : Number(digits);
  }

  async clickAddToCart(): Promise<void> {
    await this.click(this.product.cartActionButton);
  }

  async verifyCartButtonText(label: string): Promise<void> {
    await expect(this.product.gotoCartButton).toHaveText(new RegExp(label, 'i'));
  }

  async verifyCartCountIs(expected: number): Promise<void> {
    await expect.poll(() => this.getCartCount()).toBe(expected);
  }

  async goToCart(): Promise<void> {
    await this.click(this.product.gotoCartButton);
  }
}
