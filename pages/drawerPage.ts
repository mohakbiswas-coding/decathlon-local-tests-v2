// Drawer page
// Author: Mohak Biswas
// Description: The right-side drawers on the PDP - Product details, Product specifications, Delivery location.

import { expect, Page } from "@playwright/test";
import { DrawerLocators } from "../ui-store/drawer.locators";
import { BasePage } from "./basePage";
import { logger } from "../utils/logger";
import { runReport } from "../utils/RunReport";
import { handleError } from "../utils/errorHandlerUtil";

export class DrawerPage extends BasePage {
  readonly drawer: DrawerLocators;

  constructor(page: Page) {
    super(page);
    this.drawer = new DrawerLocators(page);
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openProduct
   * Description: Opens the product page used to test the drawers.
   * Parameter: drawerUrl (string)
   * Return Type: Promise<void>
   */
  async openProduct(drawerUrl: string): Promise<void> {
    try {
      logger.info(`Opening the product page ${drawerUrl}`);
      runReport.record(`Opening the product page ${drawerUrl}`);

      await this.open(drawerUrl);

      logger.info("Product page opened successfully");
      runReport.record("Product page opened successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to open the product page");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openDrawer
   * Description: Opens the product details drawer.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async openDrawer(): Promise<void> {
    try {
      logger.info("Opening the product details drawer");
      runReport.record("Opening the product details drawer");

      await this.click(this.drawer.productDetails);

      logger.info("Product details drawer opened successfully");
      runReport.record("Product details drawer opened successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to open the product details drawer",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyTriggerIsVisible
   * Description: Verifies that the product details trigger is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyTriggerIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the product details trigger is visible");
      runReport.record("Verifying that the product details trigger is visible");

      await expect(this.drawer.productDetails).toBeVisible();

      logger.info("Product details trigger is visible");
      runReport.record("Product details trigger visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the product details trigger is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openProdSpecDrawer
   * Description: Opens the product specifications drawer.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async openProdSpecDrawer(): Promise<void> {
    try {
      logger.info("Opening the product specifications drawer");
      runReport.record("Opening the product specifications drawer");

      await this.click(this.drawer.prodSpecButton);

      logger.info("Product specifications drawer opened successfully");
      runReport.record("Product specifications drawer opened successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to open the product specifications drawer",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openPincodeDrawer
   * Description: Opens the delivery location drawer.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async openPincodeDrawer(): Promise<void> {
    try {
      logger.info("Opening the delivery location drawer");
      runReport.record("Opening the delivery location drawer");

      await this.click(this.drawer.PinCodeDrawer);

      logger.info("Delivery location drawer opened successfully");
      runReport.record("Delivery location drawer opened successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to open the delivery location drawer",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyDrawerIsOpen
   * Description: Verifies that the product details drawer is open.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyDrawerIsOpen(): Promise<void> {
    try {
      logger.info("Verifying that the product details drawer is open");
      runReport.record("Verifying that the product details drawer is open");

      await expect(this.drawer.ProdDetailsdrawer).toBeVisible();

      logger.info("Product details drawer is open");
      runReport.record("Product details drawer open state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the product details drawer is open",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyProdSpecIsOpen
   * Description: Verifies that the product specifications drawer is open.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyProdSpecIsOpen(): Promise<void> {
    try {
      logger.info("Verifying that the product specifications drawer is open");
      runReport.record(
        "Verifying that the product specifications drawer is open",
      );

      await expect(this.drawer.prodSpecDrawer).toBeVisible();

      logger.info("Product specifications drawer is open");
      runReport.record(
        "Product specifications drawer open state verified successfully",
      );
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the product specifications drawer is open",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyPincodeDrawerIsOpen
   * Description: Verifies that the delivery location drawer is open.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyPincodeDrawerIsOpen(): Promise<void> {
    try {
      logger.info("Verifying that the delivery location drawer is open");
      runReport.record("Verifying that the delivery location drawer is open");

      await expect(this.drawer.pinCodeHeading).toBeVisible();

      logger.info("Delivery location drawer is open");
      runReport.record("Delivery location drawer open state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the delivery location drawer is open",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyDrawerHeading
   * Description: Verifies that the product details heading is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyDrawerHeading(): Promise<void> {
    try {
      logger.info("Verifying that the product details heading is visible");
      runReport.record("Verifying that the product details heading is visible");

      await expect(this.drawer.productDetails).toBeVisible();

      logger.info("Product details heading is visible");
      runReport.record("Product details heading visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the product details heading is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyProdSpecHeading
   * Description: Verifies that the product specifications heading is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyProdSpecHeading(): Promise<void> {
    try {
      logger.info("Verifying that the product specifications heading is visible");
      runReport.record(
        "Verifying that the product specifications heading is visible",
      );

      await expect(this.drawer.prodSpecDrawer).toBeVisible();

      logger.info("Product specifications heading is visible");
      runReport.record(
        "Product specifications heading visibility verified successfully",
      );
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the product specifications heading is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyDeliveryIsVisible
   * Description: Verifies that the delivery heading is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyDeliveryIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the delivery heading is visible");
      runReport.record("Verifying that the delivery heading is visible");

      await expect(this.drawer.deliveryHeading).toBeVisible();

      logger.info("Delivery heading is visible");
      runReport.record("Delivery heading visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the delivery heading is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyCloseButtonIsVisible
   * Description: Verifies that the drawer close button is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyCloseButtonIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the drawer close button is visible");
      runReport.record("Verifying that the drawer close button is visible");

      await expect(this.drawer.drawerClose).toBeVisible();

      logger.info("Drawer close button is visible");
      runReport.record("Drawer close button visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the drawer close button is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: closeDrawer
   * Description: Closes the open drawer.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async closeDrawer(): Promise<void> {
    try {
      logger.info("Closing the drawer");
      runReport.record("Closing the drawer");

      await this.click(this.drawer.drawerClose);

      logger.info("Drawer closed successfully");
      runReport.record("Drawer closed successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to close the drawer");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyDrawerIsClosed
   * Description: Verifies that the product details drawer is closed.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyDrawerIsClosed(): Promise<void> {
    try {
      logger.info("Verifying that the product details drawer is closed");
      runReport.record("Verifying that the product details drawer is closed");

      await expect(this.drawer.ProdDetailsdrawer).toBeHidden();

      logger.info("Product details drawer is closed");
      runReport.record("Product details drawer closed state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the product details drawer is closed",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyTextInDrawer
   * Description: Verifies that the drawer contains the given text.
   * Parameter: text (string)
   * Return Type: Promise<void>
   */
  async verifyTextInDrawer(text: string): Promise<void> {
    try {
      logger.info(`Verifying that the drawer contains the text ${text}`);
      runReport.record(`Verifying that the drawer contains the text ${text}`);

      await expect(this.drawer.drawerId).toContainText(text);

      logger.info("Drawer text verified successfully");
      runReport.record("Drawer text verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the text in the drawer",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyGuestLoginMessage
   * Description: Verifies that the guest login message is visible in the delivery location drawer.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyGuestLoginMessage(): Promise<void> {
    try {
      logger.info("Verifying that the guest login message is visible");
      runReport.record("Verifying that the guest login message is visible");

      await expect(this.drawer.pinCodeLoginMessage).toBeVisible();

      logger.info("Guest login message is visible");
      runReport.record("Guest login message visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the guest login message is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: enterPincode
   * Description: Enters the pincode in the delivery location drawer.
   * Parameter: pincode (string)
   * Return Type: Promise<void>
   */
  async enterPincode(pincode: string): Promise<void> {
    try {
      logger.info(`Entering the pincode ${pincode}`);
      runReport.record(`Entering the pincode ${pincode}`);

      await this.waitUntilVisible(this.drawer.pincodeInput);
      await this.click(this.drawer.pincodeInput);
      await this.drawer.pincodeInput.fill(pincode);

      logger.info("Pincode entered successfully");
      runReport.record("Pincode entered successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to enter the pincode");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: submitPincode
   * Description: Submits the entered pincode.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async submitPincode(): Promise<void> {
    try {
      logger.info("Submitting the pincode");
      runReport.record("Submitting the pincode");

      await this.click(this.drawer.pincodeSubmit);

      logger.info("Pincode submitted successfully");
      runReport.record("Pincode submitted successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to submit the pincode");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: closePinCodeDrawer
   * Description: Closes the delivery location drawer.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async closePinCodeDrawer(): Promise<void> {
    try {
      logger.info("Closing the delivery location drawer");
      runReport.record("Closing the delivery location drawer");

      await this.click(this.drawer.closePinCodeDrawer);

      logger.info("Delivery location drawer closed successfully");
      runReport.record("Delivery location drawer closed successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to close the delivery location drawer",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyPincodeError
   * Description: Verifies that the pincode error is visible.
   * Parameter: message (string)
   * Return Type: Promise<void>
   */
  async verifyPincodeError(message: string): Promise<void> {
    try {
      logger.info(`Verifying the pincode error: ${message}`);
      runReport.record(`Verifying the pincode error: ${message}`);

      await expect(this.drawer.pinCodeError).toBeVisible();

      logger.info("Pincode error is visible");
      runReport.record("Pincode error visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the pincode error",
      );
    }
  }
}