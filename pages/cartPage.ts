import { expect, Locator, Page } from '@playwright/test';
import { CartLocators } from '../ui-store/cart.locators';
import { BasePage } from './basePage';

/** Cart Items page. */
export class CartPage extends BasePage {
  readonly cart: CartLocators;

  constructor(page: Page) {
    super(page);
    this.cart = new CartLocators(page);
  }

  async waitForCart(): Promise<void> {
    await this.waitUntilVisible(this.cart.items.first());
  }

  async verifyItemCount(expected: number): Promise<void> {
    await expect(this.cart.items).toHaveCount(expected);
  }

  async verifyItemBrand(brand: string): Promise<void> {
    await expect(this.cart.items.first()).toContainText(brand, { ignoreCase: true });
  }

  async verifyItemImageIsVisible(): Promise<void> {
    await expect(this.cart.itemImage).toBeVisible();
  }

  async verifyItemName(expectedName: string): Promise<void> {
    await expect(this.cart.itemName).toContainText(expectedName, { ignoreCase: true });
  }

  async verifyItemSize(size: string): Promise<void> {
    await expect(this.cart.itemSize).toContainText(size);
  }

  async verifyItemQuantity(quantity: string): Promise<void> {
    const shown = await this.readValue(this.cart.itemQuantity);
    expect(shown).toContain(quantity);
  }

  async verifySellingPrice(digits: string): Promise<void> {
    await this.verifyAmount(this.cart.sellingPrice, digits);
  }

  async verifyMrp(digits: string): Promise<void> {
    await this.verifyAmount(this.cart.mrp, digits);
  }

  async verifySummaryDiscount(digits: string): Promise<void> {
    await this.verifyAmount(this.cart.summaryDiscount, digits);
  }

  async verifySummaryTotal(digits: string): Promise<void> {
    await this.verifyAmount(this.cart.summaryTotal, digits);
  }

  async verifyGuestCheckoutAction(): Promise<void> {
    await expect(this.cart.loginToProceed).toBeVisible();
  }

  /** The quantity can be plain text or an input value. */
  private async readValue(locator: Locator): Promise<string> {
    await expect(locator).toBeVisible();
    const text = (await locator.innerText().catch(() => '')).trim();
    return text !== '' ? text : locator.inputValue().catch(() => '');
  }
}
