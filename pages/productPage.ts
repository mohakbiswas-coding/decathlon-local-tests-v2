import { expect, Page } from '@playwright/test';
import { ProductDetailsLocators } from '../ui-store/productDetails.locators';
import { BasePage } from './basePage';

/** Product Details Page (PDP). */
export class ProductPage extends BasePage {
  readonly product: ProductDetailsLocators;

  constructor(page: Page) {
    super(page);
    this.product = new ProductDetailsLocators(page);
  }

  async verifyUrlHasProductPath(productPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(productPath));
  }

  async verifyBrandAndNameAreVisible(): Promise<void> {
    await expect(this.product.brand).toBeVisible();
    await expect(this.product.name).toBeVisible();
  }

  async verifyNameMatches(expectedName: string): Promise<void> {
    const shown = (await this.product.name.innerText()).toLowerCase();
    expect(shown).toContain(expectedName.toLowerCase());
  }

  async verifyPriceAndImageAreVisible(): Promise<void> {
    await expect(this.product.price).toBeVisible();
    await expect(this.product.mainImage).toBeVisible();
  }

  async verifyNoPageNotFound(): Promise<void> {
    await expect(this.product.pageNotFound).toBeHidden();
  }
}
