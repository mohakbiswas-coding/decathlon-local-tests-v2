// Product page
// Author: Mohak Biswas
// Description: Product Details Page (PDP).

import { expect, Locator, Page } from "@playwright/test";
import { HeaderLocators } from "../ui-store/header.locators";
import { ProductDetailsLocators } from "../ui-store/productDetails.locators";
import { BasePage } from "./basePage";
import { logger } from "../utils/logger";
import { runReport } from "../utils/runReport";
import { handleError } from "../utils/errorHandlerUtil";

export class ProductPage extends BasePage {
  readonly product: ProductDetailsLocators;
  readonly header: HeaderLocators;

  constructor(page: Page) {
    super(page);
    this.product = new ProductDetailsLocators(page);
    this.header = new HeaderLocators(page);
  }

  /**
   * Author: Mohak Biswas
   * Finds an enabled size option other than the given size.
   *
   * @param size Size already in use
   * @returns Promise<Locator>
   */
  private async findOtherEnabledSize(size: string): Promise<Locator> {
    const options = this.product.enabledSizeOptions;
    const count = await options.count();
    for (let i = 0; i < count; i++) {
      const text = (await options.nth(i).innerText()).trim();
      if (!text.startsWith(size)) return options.nth(i);
    }
    throw new Error(`No other enabled size found next to ${size}`);
  }

  /**
   * Author: Mohak Biswas
   * Method Name: getMainImageSource
   * Description: Returns the src attribute of the main product image.
   * Parameter: None
   * Return Type: Promise<string>
   */
  async getMainImageSource(): Promise<string> {
    return (await this.product.mainImage.getAttribute("src")) ?? "";
  }

  /**
   * Author: Mohak Biswas
   * Method Name: getCartCount
   * Description: Returns the number shown on the header cart badge, or 0 when it is not shown.
   * Parameter: None
   * Return Type: Promise<number>
   */
  async getCartCount(): Promise<number> {
    if (!(await this.isVisible(this.header.cartBadge))) return 0;
    const digits = (await this.header.cartBadge.innerText()).replace(/\D/g, "");
    return digits === "" ? 0 : Number(digits);
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openProduct
   * Description: Opens the product page.
   * Parameter: productUrl (string)
   * Return Type: Promise<void>
   */
  async openProduct(productUrl: string): Promise<void> {
    try {
      logger.info(`Opening the product page ${productUrl}`);
      runReport.record(`Opening the product page ${productUrl}`);

      await this.open(productUrl);

      logger.info("Product page opened successfully");
      runReport.record("Product page opened successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to open the product page");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: waitForProductToLoad
   * Description: Waits until the product name is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async waitForProductToLoad(): Promise<void> {
    try {
      logger.info("Waiting for the product to load");
      runReport.record("Waiting for the product to load");

      await this.waitUntilVisible(this.product.name);

      logger.info("Product loaded successfully");
      runReport.record("Product loaded successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to wait for the product to load",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyUrlHasProductPath
   * Description: Verifies that the URL contains the product path.
   * Parameter: productPath (string)
   * Return Type: Promise<void>
   */
  async verifyUrlHasProductPath(productPath: string): Promise<void> {
    try {
      logger.info(`Verifying that the URL has the product path ${productPath}`);
      runReport.record(
        `Verifying that the URL has the product path ${productPath}`,
      );

      await expect(this.page).toHaveURL(new RegExp(productPath));

      logger.info("Product path in the URL verified successfully");
      runReport.record("Product path in the URL verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the product path in the URL",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyBrandAndNameAreVisible
   * Description: Verifies that the product brand and name are visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyBrandAndNameAreVisible(): Promise<void> {
    try {
      logger.info("Verifying that the brand and name are visible");
      runReport.record("Verifying that the brand and name are visible");

      await expect(this.product.brand).toBeVisible();
      await expect(this.product.name).toBeVisible();

      logger.info("Brand and name are visible");
      runReport.record("Brand and name visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the brand and name are visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyNameMatches
   * Description: Verifies that the product name matches the expected name.
   * Parameter: expectedName (string)
   * Return Type: Promise<void>
   */
  async verifyNameMatches(expectedName: string): Promise<void> {
    try {
      logger.info(`Verifying that the product name matches ${expectedName}`);
      runReport.record(
        `Verifying that the product name matches ${expectedName}`,
      );

      const shown = (
        "decathlon " + (await this.product.name.innerText())
      ).toLowerCase();
      expect(shown).toContain(expectedName.toLowerCase());

      logger.info("Product name matches successfully");
      runReport.record("Product name matched successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the product name matches",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyPriceAndImageAreVisible
   * Description: Verifies that the product price and main image are visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyPriceAndImageAreVisible(): Promise<void> {
    try {
      logger.info("Verifying that the price and main image are visible");
      runReport.record("Verifying that the price and main image are visible");

      await expect(this.product.price).toBeVisible();
      await expect(this.product.mainImage).toBeVisible();

      logger.info("Price and main image are visible");
      runReport.record("Price and main image visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the price and main image are visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyNoPageNotFound
   * Description: Verifies that the page not found message is hidden.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyNoPageNotFound(): Promise<void> {
    try {
      logger.info("Verifying that the page not found message is hidden");
      runReport.record("Verifying that the page not found message is hidden");

      await expect(this.product.pageNotFound).toBeHidden();

      logger.info("Page not found message is hidden");
      runReport.record("Page not found message hidden state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the page not found message is hidden",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyNoApplicationError
   * Description: Verifies that the application error message is hidden.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyNoApplicationError(): Promise<void> {
    try {
      logger.info("Verifying that the application error message is hidden");
      runReport.record(
        "Verifying that the application error message is hidden",
      );

      await expect(this.product.applicationError).toBeHidden();

      logger.info("Application error message is hidden");
      runReport.record(
        "Application error message hidden state verified successfully",
      );
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the application error message is hidden",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyStillOnProductPage
   * Description: Verifies that the user is still on the product page.
   * Parameter: productPath (string)
   * Return Type: Promise<void>
   */
  async verifyStillOnProductPage(productPath: string): Promise<void> {
    try {
      logger.info(`Verifying that the user is still on ${productPath}`);
      runReport.record(`Verifying that the user is still on ${productPath}`);

      await expect(this.page).toHaveURL(new RegExp(productPath));

      logger.info("User is still on the product page");
      runReport.record("Product page URL verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the user is still on the product page",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyBreadcrumbs
   * Description: Verifies that the breadcrumbs are visible and contain the expected items.
   * Parameter: expectedItems (string[])
   * Return Type: Promise<void>
   */
  async verifyBreadcrumbs(expectedItems: string[]): Promise<void> {
    try {
      logger.info("Verifying the breadcrumbs");
      runReport.record("Verifying the breadcrumbs");

      await expect(this.product.breadcrumbs).toBeVisible();
      for (const item of expectedItems) {
        await expect(this.product.breadcrumbs).toContainText(item, {
          ignoreCase: true,
        });
      }

      logger.info("Breadcrumbs verified successfully");
      runReport.record("Breadcrumbs verified successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to verify the breadcrumbs");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyBrand
   * Description: Verifies the product brand.
   * Parameter: expectedBrand (string)
   * Return Type: Promise<void>
   */
  async verifyBrand(expectedBrand: string): Promise<void> {
    try {
      logger.info(`Verifying the product brand contains ${expectedBrand}`);
      runReport.record(`Verifying the product brand contains ${expectedBrand}`);

      await expect(this.product.brand).toContainText(expectedBrand, {
        ignoreCase: true,
      });

      logger.info("Product brand verified successfully");
      runReport.record("Product brand verified successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to verify the product brand");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyNameContains
   * Description: Verifies that the product name contains the expected text.
   * Parameter: expectedName (string)
   * Return Type: Promise<void>
   */
  async verifyNameContains(expectedName: string): Promise<void> {
    try {
      logger.info(`Verifying the product name contains ${expectedName}`);
      runReport.record(`Verifying the product name contains ${expectedName}`);

      await expect(this.product.name).toContainText(expectedName, {
        ignoreCase: true,
      });

      logger.info("Product name verified successfully");
      runReport.record("Product name verified successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to verify the product name");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyProductId
   * Description: Verifies the product ID.
   * Parameter: expectedId (string)
   * Return Type: Promise<void>
   */
  async verifyProductId(expectedId: string): Promise<void> {
    try {
      logger.info(`Verifying the product ID contains ${expectedId}`);
      runReport.record(`Verifying the product ID contains ${expectedId}`);

      await expect(this.product.productId).toContainText(expectedId);

      logger.info("Product ID verified successfully");
      runReport.record("Product ID verified successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to verify the product ID");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyMrpIsVisible
   * Description: Verifies that the MRP is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyMrpIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the MRP is visible");
      runReport.record("Verifying that the MRP is visible");

      await expect(this.product.mrp).toBeVisible();

      logger.info("MRP is visible");
      runReport.record("MRP visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the MRP is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyRatingAndReviewLinkAreVisible
   * Description: Verifies that the rating value and review link are visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyRatingAndReviewLinkAreVisible(): Promise<void> {
    try {
      logger.info("Verifying that the rating and review link are visible");
      runReport.record("Verifying that the rating and review link are visible");

      await expect(this.product.ratingValue).toBeVisible();
      await expect(this.product.reviewLink).toBeVisible();

      logger.info("Rating and review link are visible");
      runReport.record(
        "Rating and review link visibility verified successfully",
      );
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the rating and review link are visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyColourOptionsAreVisible
   * Description: Verifies that at least the minimum number of colour options are visible.
   * Parameter: minimum (number, default 1)
   * Return Type: Promise<void>
   */
  async verifyColourOptionsAreVisible(minimum = 1): Promise<void> {
    try {
      logger.info(`Verifying that at least ${minimum} colour options are visible`);
      runReport.record(
        `Verifying that at least ${minimum} colour options are visible`,
      );

      await expect(this.product.colourThumbnails.first()).toBeVisible();
      expect(
        await this.product.colourThumbnails.count(),
      ).toBeGreaterThanOrEqual(minimum);

      logger.info("Colour options are visible");
      runReport.record("Colour options visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the colour options are visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySizeOptionsAndAddToCartAreVisible
   * Description: Verifies that the size options and the add to cart button are visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifySizeOptionsAndAddToCartAreVisible(): Promise<void> {
    try {
      logger.info("Verifying that the size options and add to cart are visible");
      runReport.record(
        "Verifying that the size options and add to cart are visible",
      );

      await expect(this.product.sizeOptions.first()).toBeVisible();
      await expect(this.product.cartActionButton).toBeVisible();

      logger.info("Size options and add to cart are visible");
      runReport.record(
        "Size options and add to cart visibility verified successfully",
      );
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the size options and add to cart are visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyPriceAndSizeControlsAreVisible
   * Description: Verifies that the price and size controls are visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyPriceAndSizeControlsAreVisible(): Promise<void> {
    try {
      logger.info("Verifying that the price and size controls are visible");
      runReport.record("Verifying that the price and size controls are visible");

      await expect(this.product.price).toBeVisible();
      await expect(this.product.sizeOptions.first()).toBeVisible();

      logger.info("Price and size controls are visible");
      runReport.record(
        "Price and size controls visibility verified successfully",
      );
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the price and size controls are visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: selectColour
   * Description: Selects the colour option at the given index.
   * Parameter: index (number)
   * Return Type: Promise<void>
   */
  async selectColour(index: number): Promise<void> {
    try {
      logger.info(`Selecting the colour option at index ${index}`);
      runReport.record(`Selecting the colour option at index ${index}`);

      await this.click(this.product.colorOptions.nth(index));
      await this.page.waitForLoadState("domcontentloaded");

      logger.info("Colour option selected successfully");
      runReport.record("Colour option selected successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to select the colour option",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyMainImageChanged
   * Description: Verifies that the main image source differs from the previous one.
   * Parameter: previousSource (string)
   * Return Type: Promise<void>
   */
  async verifyMainImageChanged(previousSource: string): Promise<void> {
    try {
      logger.info("Verifying that the main image has changed");
      runReport.record("Verifying that the main image has changed");

      await expect
        .poll(() => this.getMainImageSource())
        .not.toBe(previousSource);

      logger.info("Main image changed successfully");
      runReport.record("Main image change verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the main image has changed",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: logVariantChange
   * Description: Logs whether a colour is a separate variant (new URL / product ID) or just a new image.
   * Parameter: urlBefore (string)
   * Return Type: void
   */
  logVariantChange(urlBefore: string): void {
    const urlAfter = this.page.url();
    if (urlAfter !== urlBefore) {
      logger.info(
        `Colour is a separate variant. URL changed: ${urlBefore} -> ${urlAfter}`,
      );
      runReport.record(
        `Colour is a separate variant. URL changed: ${urlBefore} -> ${urlAfter}`,
      );
    } else {
      logger.info(
        "Colour did not change the URL (same product page, new image)",
      );
      runReport.record(
        "Colour did not change the URL (same product page, new image)",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyNoSizeIsSelected
   * Description: Verifies that no enabled size looks selected, i.e. all sizes share the same style.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyNoSizeIsSelected(): Promise<void> {
    try {
      logger.info("Verifying that no size is selected");
      runReport.record("Verifying that no size is selected");

      await expect(this.product.enabledSizeOptions.first()).toBeVisible();
      const styles = new Set<string>();
      const count = await this.product.enabledSizeOptions.count();
      for (let i = 0; i < count; i++) {
        styles.add(
          await this.getHighlightStyle(this.product.enabledSizeOptions.nth(i)),
        );
      }
      expect(styles.size, "a size already looks selected").toBe(1);

      logger.info("No size is selected");
      runReport.record("No size selected state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that no size is selected",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: selectSize
   * Description: Selects the given size.
   * Parameter: size (string)
   * Return Type: Promise<void>
   */
  async selectSize(size: string): Promise<void> {
    try {
      logger.info(`Selecting the size ${size}`);
      runReport.record(`Selecting the size ${size}`);

      await this.click(this.product.sizeOption(size));

      logger.info("Size selected successfully");
      runReport.record("Size selected successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to select the size");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySizeOptionsRemainAvailable
   * Description: Verifies that the size options are still available.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifySizeOptionsRemainAvailable(): Promise<void> {
    try {
      logger.info("Verifying that the size options remain available");
      runReport.record("Verifying that the size options remain available");

      await expect(this.product.sizeOptions.first()).toBeVisible();

      logger.info("Size options remain available");
      runReport.record("Size options availability verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the size options remain available",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyLowStockIfAvailable
   * Description: Verifies the low-stock label when it is displayed.
   * Parameter: label (string)
   * Return Type: Promise<void>
   */
  async verifyLowStockIfAvailable(label: string): Promise<void> {
    try {
      logger.info(`Verifying the low-stock label ${label} if available`);
      runReport.record(`Verifying the low-stock label ${label} if available`);

      if (await this.isVisible(this.product.lowStockLabel)) {
        await expect(this.product.lowStockLabel).toContainText(label, {
          ignoreCase: true,
        });
        logger.info(`Low-stock label is displayed: ${label}`);
        runReport.record(`Low-stock label is displayed: ${label}`);
      } else {
        logger.info(
          "Low-stock label is not displayed (not applicable for this size)",
        );
        runReport.record(
          "Low-stock label is not displayed (not applicable for this size)",
        );
      }
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the low-stock label",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySizeErrorIsVisible
   * Description: Verifies that the size error message is visible.
   * Parameter: message (string)
   * Return Type: Promise<void>
   */
  async verifySizeErrorIsVisible(message: string): Promise<void> {
    try {
      logger.info(`Verifying that the size error is visible: ${message}`);
      runReport.record(`Verifying that the size error is visible: ${message}`);

      await expect(this.product.textOnPage(message)).toBeVisible();

      logger.info("Size error is visible");
      runReport.record("Size error visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the size error is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySizeErrorIsHidden
   * Description: Verifies that the size error message is hidden.
   * Parameter: message (string)
   * Return Type: Promise<void>
   */
  async verifySizeErrorIsHidden(message: string): Promise<void> {
    try {
      logger.info(`Verifying that the size error is hidden: ${message}`);
      runReport.record(`Verifying that the size error is hidden: ${message}`);

      await expect(this.product.textOnPage(message)).toBeHidden();

      logger.info("Size error is hidden");
      runReport.record("Size error hidden state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the size error is hidden",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: clickAddToCart
   * Description: Clicks the add to cart button.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async clickAddToCart(): Promise<void> {
    try {
      logger.info("Clicking the add to cart button");
      runReport.record("Clicking the add to cart button");

      await this.click(this.product.cartActionButton);

      logger.info("Add to cart button clicked successfully");
      runReport.record("Add to cart button clicked successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to click the add to cart button",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyCartButtonText
   * Description: Verifies the text of the go to cart button.
   * Parameter: label (string)
   * Return Type: Promise<void>
   */
  async verifyCartButtonText(label: string): Promise<void> {
    try {
      logger.info(`Verifying the cart button text matches ${label}`);
      runReport.record(`Verifying the cart button text matches ${label}`);

      await expect(this.product.gotoCartButton).toHaveText(
        new RegExp(label, "i"),
      );

      logger.info("Cart button text verified successfully");
      runReport.record("Cart button text verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the cart button text",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyCartCountIs
   * Description: Verifies the number shown on the header cart badge.
   * Parameter: expected (number)
   * Return Type: Promise<void>
   */
  async verifyCartCountIs(expected: number): Promise<void> {
    try {
      logger.info(`Verifying that the cart count is ${expected}`);
      runReport.record(`Verifying that the cart count is ${expected}`);

      await expect.poll(() => this.getCartCount()).toBe(expected);

      logger.info("Cart count verified successfully");
      runReport.record("Cart count verified successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to verify the cart count");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: closeAddToCartConfirmationIfVisible
   * Description: Closes the add to cart confirmation.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async closeAddToCartConfirmationIfVisible(): Promise<void> {
    try {
      logger.info("Closing the add to cart confirmation");
      runReport.record("Closing the add to cart confirmation");

      await this.click(this.product.addToCartConfirmationClose);

      logger.info("Add to cart confirmation closed successfully");
      runReport.record("Add to cart confirmation closed successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to close the add to cart confirmation",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: goToCart
   * Description: Clicks the go to cart button.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async goToCart(): Promise<void> {
    try {
      logger.info("Going to the cart");
      runReport.record("Going to the cart");

      await this.click(this.product.gotoCartButton);

      logger.info("Navigated to the cart successfully");
      runReport.record("Navigated to the cart successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to go to the cart");
    }
  }
}