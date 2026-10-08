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
    await this.scrollTo(this.drawer.trigger(text));
  }

  async verifyTriggerIsVisible(text: string): Promise<void> {
    await expect(this.drawer.trigger(text)).toBeVisible();
  }

  async openDrawer(triggerText: string): Promise<void> {
    await this.click(this.drawer.trigger(triggerText));
  }

  async verifyDrawerIsOpen(): Promise<void> {
    await expect(this.drawer.drawer).toBeVisible();
  }

  async verifyBackgroundIsDimmed(): Promise<void> {
    await expect(this.drawer.overlay).toBeVisible();
  }

  async verifyDrawerHeading(title: string): Promise<void> {
    await expect(this.drawer.textInDrawer(title)).toBeVisible();
  }

  async verifyCloseButtonIsVisible(): Promise<void> {
    await expect(this.drawer.closeButton).toBeVisible();
  }

  async closeDrawer(): Promise<void> {
    await this.click(this.drawer.closeButton);
  }

  async verifyDrawerIsClosed(): Promise<void> {
    await expect(this.drawer.drawer).toBeHidden();
  }

  async verifyPageIsActive(): Promise<void> {
    await expect(this.drawer.overlay).toBeHidden();
  }

  // ---- drawer content ----
  async verifyTextInDrawer(text: string): Promise<void> {
    await expect(this.drawer.drawer).toContainText(text);
  }

  /** Descriptive text = anything in the drawer besides the heading and the ID line. */
  async verifyDescriptionIsDisplayed(textToIgnore: string[]): Promise<void> {
    let text = await this.drawer.drawer.innerText();
    for (const ignored of textToIgnore) text = text.replace(ignored, '');
    expect(text.trim().length, 'no descriptive text found in the drawer').toBeGreaterThan(0);
  }

  /** Checks a "label  value" pair, e.g. Distance -> From 1 to 10 km. */
  async verifySpecification(label: string, value: string): Promise<void> {
    const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.drawer.drawer).toContainText(new RegExp(`${escape(label)}\\s*${escape(value)}`));
  }

  async verifyEntriesAreVisible(labels: string[]): Promise<void> {
    for (const label of labels) {
      await expect(this.drawer.textInDrawer(label)).toBeVisible();
    }
  }

  /** Scrolls the scrollable part of the drawer to its end. */
  async scrollInsideDrawer(): Promise<void> {
    const scrolled = await this.drawer.drawer.evaluate((root) => {
      const area = [root, ...Array.from(root.querySelectorAll('*'))].find(
        (node) => node.scrollHeight > node.clientHeight + 1 && ['auto', 'scroll'].includes(getComputedStyle(node).overflowY)
      );
      if (!area) return false;
      area.scrollTop = area.scrollHeight;
      return true;
    });
    logger.info(scrolled ? 'Scrolled inside the drawer' : 'Drawer content fits without scrolling');
  }

  // ---- delivery location ----
  async verifyGuestLoginMessage(text: string): Promise<void> {
    await expect(this.drawer.textInDrawer(text)).toBeVisible();
  }

  async enterPincode(pincode: string): Promise<void> {
    await this.waitUntilVisible(this.drawer.pincodeInput);
    await this.type(this.drawer.pincodeInput, '');
    await this.type(this.drawer.pincodeInput, pincode);
  }

  async submitPincode(): Promise<void> {
    await this.click(this.drawer.pincodeSubmit);
  }

  async verifyPincodeError(message: string): Promise<void> {
    await expect(this.drawer.drawer.getByText(message)).toBeVisible();
  }
}
