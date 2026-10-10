import { Locator, Page } from '@playwright/test';

/**
 * The right-side drawer shared by Product details, Product specifications
 * and Select delivery location. Only one drawer is open at a time.
 */
export class DrawerLocators {
  readonly ProdDetailsdrawer: Locator;
  readonly ProdDetailscloseButton: Locator;
  readonly PinCodeDrawer: Locator;
  readonly pincodeInput: Locator;
  readonly pincodeSubmit: Locator;
  readonly productDetails: Locator;
  readonly drawerText: Locator;
  readonly drawerLoginMessage: Locator;
  readonly pinCodeError: Locator;
  readonly drawerId: Locator;
  readonly drawerClose: Locator;
  readonly prodSpecifications: Locator;
  readonly prodSpecButton: Locator;
  readonly prodSpecDrawer: Locator;
  readonly deliveryHeading: Locator;
  readonly pinCodeHeading: Locator;
  readonly pinCodeLoginMessage: Locator;
  readonly closePinCodeDrawer: Locator;

  constructor(private readonly page: Page) {
    this.ProdDetailsdrawer = page.getByTestId('pdp-product-tabs-desktop:drawer-title-product-details');
    this.prodSpecDrawer = page.locator("h2[data-test-id='pdp-product-tabs-desktop:drawer-title-product-specifications']")
    this.ProdDetailscloseButton = page.getByTestId('drawer-close-button');
    this.deliveryHeading = page.locator("#delivery-services-heading");
    this.pinCodeHeading = page.getByTestId("location-promt-desktop:drawer-title")
    this.PinCodeDrawer = page.locator("button[aria-label='Change delivery pincode']");
    this.pinCodeLoginMessage = page.getByTestId("location-promt-desktop:login-description-text")
    this.pincodeInput = page.locator("#pincode-input-login");
    this.pincodeSubmit = page.locator("button[aria-label='Submit pincode']");
    this.productDetails = page.locator('[data-test-id="pdp-product-tabs-desktop:tab-button-product-details"]');
    this.drawerId = page.getByTestId("pdp-product-tabs-desktop:drawer-product-id");
    this.drawerText = page.getByTestId("pdp-product-tabs-desktop:drawer-product-description");
    this.drawerLoginMessage = page.locator("div[class='mt-2.5 text-sm text-rock-400']");
    this.pinCodeError = page.locator("p[class*='mt-2']");
    this.drawerClose = page.locator("button[class*='flex h-12 w-12']").first();
    this.closePinCodeDrawer = page.locator("button[aria-label='Close drawer']");
    this.prodSpecifications = page.getByTestId("pdp-product-tabs-desktop:drawer-title-product-specifications");
    this.prodSpecButton = page.getByTestId("pdp-product-tabs-desktop:tab-button-title-product-specifications");
  }
}
