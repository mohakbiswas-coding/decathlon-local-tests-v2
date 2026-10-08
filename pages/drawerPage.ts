import { expect, Page } from '@playwright/test';
import { DrawerLocators } from '../ui-store/drawer.locators';
import { logger } from '../utils/Logger';
import { BasePage } from './basePage';

/** The right-side drawers on the PDP: Product details, Product specifications, Delivery location. */
export class DrawerPage extends BasePage {
  readonly drawer: DrawerLocators;

  constructor(page: Page) {
    super(page);
    this.drawer = new DrawerLocators(page);
  }

  // ---- open / close ----
  async scrollToTrigger(text: string): Promise<void> {
    await this.scrollTo(this.drawer.productDetails);
  }

  async verifyTriggerIsVisible(text: string): Promise<void> {
    await expect(this.drawer.productDetails).toBeVisible();
  }

  async openDrawer(triggerText: string): Promise<void> {
    await this.click(this.drawer.productDetails);
  }

  async verifyDrawerIsOpen(): Promise<void> {
    await expect(this.drawer.ProdDetailsdrawer).toBeVisible();
  }

  async verifyDrawerHeading(title: string): Promise<void> {
    await expect(this.drawer.productDetails).toBeVisible();
  }

  async verifyCloseButtonIsVisible(): Promise<void> {
    await expect(this.drawer.ProdDetailscloseButton).toBeVisible();
  }

  async closeDrawer(): Promise<void> {
    await this.click(this.drawer.ProdDetailscloseButton);
  }

  async verifyDrawerIsClosed(): Promise<void> {
    await expect(this.drawer.ProdDetailsdrawer).toBeHidden();
  }

  // ---- drawer content ----
  async verifyTextInDrawer(text: string): Promise<void> {
    await expect(this.drawer.drawerText).toContainText(text);
  }

  // ---- delivery location ----
  async verifyGuestLoginMessage(): Promise<void> {
    await expect(this.drawer.drawerLoginMessage).toBeVisible();
  }

  async enterPincode(pincode: string): Promise<void> {
    await this.drawer.PinCodeDrawer.click();
    await this.waitUntilVisible(this.drawer.pincodeInput);
    await this.type(this.drawer.pincodeInput, '');
    await this.type(this.drawer.pincodeInput, pincode);
  }

  async submitPincode(): Promise<void> {
    await this.click(this.drawer.pincodeSubmit);
  }

  async verifyPincodeError(message: string): Promise<void> {
    await expect(this.drawer.pinCodeError).toBeVisible();
  }
}
