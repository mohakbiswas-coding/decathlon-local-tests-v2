// Cart page
// Author: Mohak Biswas
// Description: Cart Items page.

import { expect, Locator, Page } from "@playwright/test";
import { CartLocators } from "../ui-store/cart.locators";
import { BasePage } from "./basePage";
import { logger } from "../utils/logger";
import { runReport } from "../utils/runReport";
import { handleError } from "../utils/errorHandlerUtil";

export class CartPage extends BasePage {
  readonly cart: CartLocators;

  constructor(page: Page) {
    super(page);
    this.cart = new CartLocators(page);
  }

  /**
   * Author: Mohak Biswas
   * Reads the quantity as plain text or as an input value.
   *
   * @param locator Quantity locator
   * @returns Promise<string>
   */
  private async readValue(locator: Locator): Promise<string> {
    await expect(locator).toBeVisible();
    const text = (await locator.innerText().catch(() => "")).trim();
    return text !== "" ? text : locator.inputValue().catch(() => "");
  }

  /**
   * Author: Mohak Biswas
   * Method Name: waitForCart
   * Description: Waits until the first cart item is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async waitForCart(): Promise<void> {
    try {
      logger.info("Waiting for the cart items to be visible");
      runReport.record("Waiting for the cart items to be visible");

      await this.waitUntilVisible(this.cart.items.first());

      logger.info("Cart items are visible");
      runReport.record("Cart items are visible");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to wait for the cart items to be visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyItemCount
   * Description: Verifies the number of items in the cart.
   * Parameter: expected (number)
   * Return Type: Promise<void>
   */
  async verifyItemCount(expected: number): Promise<void> {
    try {
      logger.info(`Verifying the cart item count is ${expected}`);
      runReport.record(`Verifying the cart item count is ${expected}`);

      await expect(this.cart.items).toHaveCount(expected);

      logger.info("Cart item count verified successfully");
      runReport.record("Cart item count verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the cart item count",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyItemBrand
   * Description: Verifies the brand of the first cart item.
   * Parameter: brand (string)
   * Return Type: Promise<void>
   */
  async verifyItemBrand(brand: string): Promise<void> {
    try {
      logger.info(`Verifying the cart item brand contains ${brand}`);
      runReport.record(`Verifying the cart item brand contains ${brand}`);

      await expect(this.cart.items.first()).toContainText(brand, {
        ignoreCase: true,
      });

      logger.info("Cart item brand verified successfully");
      runReport.record("Cart item brand verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the cart item brand",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyItemImageIsVisible
   * Description: Verifies that the cart item image is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyItemImageIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the cart item image is visible");
      runReport.record("Verifying that the cart item image is visible");

      await expect(this.cart.itemImage).toBeVisible();

      logger.info("Cart item image is visible");
      runReport.record("Cart item image visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the cart item image is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyItemName
   * Description: Verifies the name of the cart item.
   * Parameter: expectedName (string)
   * Return Type: Promise<void>
   */
  async verifyItemName(expectedName: string): Promise<void> {
    try {
      logger.info(`Verifying the cart item name contains ${expectedName}`);
      runReport.record(
        `Verifying the cart item name contains ${expectedName}`,
      );

      await expect(this.cart.itemName).toContainText(expectedName, {
        ignoreCase: true,
      });

      logger.info("Cart item name verified successfully");
      runReport.record("Cart item name verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the cart item name",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyItemSize
   * Description: Verifies the size of the cart item.
   * Parameter: size (string)
   * Return Type: Promise<void>
   */
  async verifyItemSize(size: string): Promise<void> {
    try {
      logger.info(`Verifying the cart item size contains ${size}`);
      runReport.record(`Verifying the cart item size contains ${size}`);

      await expect(this.cart.itemSize).toContainText(size);

      logger.info("Cart item size verified successfully");
      runReport.record("Cart item size verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the cart item size",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyItemQuantity
   * Description: Verifies the quantity of the cart item.
   * Parameter: quantity (string)
   * Return Type: Promise<void>
   */
  async verifyItemQuantity(quantity: string): Promise<void> {
    try {
      logger.info(`Verifying the cart item quantity contains ${quantity}`);
      runReport.record(
        `Verifying the cart item quantity contains ${quantity}`,
      );

      const shown = await this.readValue(this.cart.itemQuantity);
      expect(shown).toContain(quantity);

      logger.info("Cart item quantity verified successfully");
      runReport.record("Cart item quantity verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the cart item quantity",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySellingPrice
   * Description: Verifies the selling price of the cart item.
   * Parameter: digits (string)
   * Return Type: Promise<void>
   */
  async verifySellingPrice(digits: string): Promise<void> {
    try {
      logger.info(`Verifying the selling price ${digits}`);
      runReport.record(`Verifying the selling price ${digits}`);

      await this.verifyAmount(this.cart.sellingPrice, digits);

      logger.info("Selling price verified successfully");
      runReport.record("Selling price verified successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to verify the selling price");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyMrp
   * Description: Verifies the MRP of the cart item.
   * Parameter: digits (string)
   * Return Type: Promise<void>
   */
  async verifyMrp(digits: string): Promise<void> {
    try {
      logger.info(`Verifying the MRP ${digits}`);
      runReport.record(`Verifying the MRP ${digits}`);

      await this.verifyAmount(this.cart.mrp, digits);

      logger.info("MRP verified successfully");
      runReport.record("MRP verified successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to verify the MRP");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySummaryDiscount
   * Description: Verifies the discount in the order summary.
   * Parameter: digits (string)
   * Return Type: Promise<void>
   */
  async verifySummaryDiscount(digits: string): Promise<void> {
    try {
      logger.info(`Verifying the summary discount ${digits}`);
      runReport.record(`Verifying the summary discount ${digits}`);

      await this.verifyAmount(this.cart.summaryDiscount, digits);

      logger.info("Summary discount verified successfully");
      runReport.record("Summary discount verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the summary discount",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySummaryTotal
   * Description: Verifies the total in the order summary.
   * Parameter: digits (string)
   * Return Type: Promise<void>
   */
  async verifySummaryTotal(digits: string): Promise<void> {
    try {
      logger.info(`Verifying the summary total ${digits}`);
      runReport.record(`Verifying the summary total ${digits}`);

      await this.verifyAmount(this.cart.summaryTotal, digits);

      logger.info("Summary total verified successfully");
      runReport.record("Summary total verified successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to verify the summary total");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyGuestCheckoutAction
   * Description: Verifies that the guest checkout action is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyGuestCheckoutAction(): Promise<void> {
    try {
      logger.info("Verifying that the guest checkout action is visible");
      runReport.record("Verifying that the guest checkout action is visible");

      await expect(this.cart.loginToProceed).toBeVisible();

      logger.info("Guest checkout action is visible");
      runReport.record("Guest checkout action visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the guest checkout action",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: clickGuestCheckoutAction
   * Description: Clicks the guest checkout action.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async clickGuestCheckoutAction(): Promise<void> {
    try {
      logger.info("Clicking the guest checkout action");
      runReport.record("Clicking the guest checkout action");

      await this.click(this.cart.loginToProceed);

      logger.info("Guest checkout action clicked successfully");
      runReport.record("Guest checkout action clicked successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to click the guest checkout action",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyLoginGateIsDisplayed
   * Description: Verifies that a guest is taken to an authentication step before proceeding to checkout.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyLoginGateIsDisplayed(): Promise<void> {
    try {
      logger.info("Verifying that the login gate is displayed");
      runReport.record("Verifying that the login gate is displayed");

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

      logger.info("Login gate is displayed");
      runReport.record("Login gate display verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the login gate is displayed",
      );
    }
  }
}