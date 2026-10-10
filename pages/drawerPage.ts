import { expect, Page } from "@playwright/test";
import { DrawerLocators } from "../ui-store/drawer.locators";
import { logger } from "../utils/logger";
import { BasePage } from "./basePage";

/** The right-side drawers on the PDP: Product details, Product specifications, Delivery location. */
export class DrawerPage extends BasePage {
  readonly drawer: DrawerLocators;

  constructor(page: Page) {
    super(page);
    this.drawer = new DrawerLocators(page);
  }

  // ---- open / close ----
  async openProduct(drawerUrl: string): Promise<void> {
    await this.open(drawerUrl);
  }

  async openDrawer(): Promise<void> {
    await this.click(this.drawer.productDetails);
  }

  async verifyTriggerIsVisible(): Promise<void> {
    await expect(this.drawer.productDetails).toBeVisible();
  }

  async openProdSpecDrawer(): Promise<void> {
    await this.click(this.drawer.prodSpecButton);
  }

  async openPincodeDrawer(): Promise<void> {
    await this.click(this.drawer.PinCodeDrawer);
  }

  async verifyDrawerIsOpen(): Promise<void> {
    await expect(this.drawer.ProdDetailsdrawer).toBeVisible();
  }

  async verifyProdSpecIsOpen(): Promise<void> {
    await expect(this.drawer.prodSpecDrawer).toBeVisible();
  }

  async verifyPincodeDrawerIsOpen(): Promise<void> {
    await expect(this.drawer.pinCodeHeading).toBeVisible();
  }

  async verifyDrawerHeading(): Promise<void> {
    await expect(this.drawer.productDetails).toBeVisible();
  }

  async verifyProdSpecHeading(): Promise<void> {
    await expect(this.drawer.prodSpecDrawer).toBeVisible();
  }

  async verifyDeliveryIsVisible(): Promise<void> {
    await expect(this.drawer.deliveryHeading).toBeVisible();
  }

  async verifyCloseButtonIsVisible(): Promise<void> {
    await expect(this.drawer.drawerClose).toBeVisible();
  }

  async closeDrawer(): Promise<void> {
    await this.click(this.drawer.drawerClose);
  }

  async verifyDrawerIsClosed(): Promise<void> {
    await expect(this.drawer.ProdDetailsdrawer).toBeHidden();
  }

  // ---- drawer content ----
  async verifyTextInDrawer(text: string): Promise<void> {
    await expect(this.drawer.drawerId).toContainText(text);
  }

  // ---- delivery location ----
  async verifyGuestLoginMessage(): Promise<void> {
    await expect(this.drawer.pinCodeLoginMessage).toBeVisible();
  }

  async enterPincode(pincode: string): Promise<void> {
    await this.waitUntilVisible(this.drawer.pincodeInput);
    await this.click(this.drawer.pincodeInput);
    await this.drawer.pincodeInput.fill(pincode);
  }

  async submitPincode(): Promise<void> {
    await this.click(this.drawer.pincodeSubmit);
  }

  async closePinCodeDrawer(): Promise<void> {
    await this.click(this.drawer.closePinCodeDrawer);
  }

  async verifyPincodeError(message: string): Promise<void> {
    await expect(this.drawer.pinCodeError).toBeVisible();
  }
}
