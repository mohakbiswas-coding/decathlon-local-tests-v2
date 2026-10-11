import { expect, Locator, Page } from "@playwright/test";
import { CartLocators } from "../ui-store/cart.locators";
import { BasePage } from "./basePage";

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
    await expect(this.cart.items.first()).toContainText(brand, {
      ignoreCase: true,
    });
  }

  async verifyItemImageIsVisible(): Promise<void> {
    await expect(this.cart.itemImage).toBeVisible();
  }

  async verifyItemName(expectedName: string): Promise<void> {
    await expect(this.cart.itemName).toContainText(expectedName, {
      ignoreCase: true,
    });
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

  async clickGuestCheckoutAction(): Promise<void> {
    await this.click(this.cart.loginToProceed);
  }

  /** A guest must be taken to an authentication step before proceeding to checkout. */
  async verifyLoginGateIsDisplayed(): Promise<void> {
    const loginHeading = this.page
      .getByRole("heading", { name: /log ?in|sign ?in/i })
      .first();
    const loginField = this.page
      .locator(
        'input[type="tel"], input[autocomplete="tel"], input[placeholder*="mobile" i], input[placeholder*="phone" i], input[placeholder*="email" i]',
      )
      .first();
    const dialog = this.page.getByRole("dialog").first();

    await expect
      .poll(
        async () => {
          const url = this.page.url().toLowerCase();
          if (/login|sign[-_]?in|auth/.test(url)) return true;
          if (await loginHeading.isVisible().catch(() => false)) return true;
          if (await loginField.isVisible().catch(() => false)) return true;
          return dialog.isVisible().catch(() => false);
        },
        {
          timeout: 10_000,
          message:
            "Expected the guest checkout action to open an authentication step.",
        },
      )
      .toBe(true);
  }

  /** The quantity can be plain text or an input value. */
  private async readValue(locator: Locator): Promise<string> {
    await expect(locator).toBeVisible();
    const text = (await locator.innerText().catch(() => "")).trim();
    return text !== "" ? text : locator.inputValue().catch(() => "");
  }
}
