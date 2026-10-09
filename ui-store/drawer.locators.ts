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

  constructor(private readonly page: Page) {
    this.ProdDetailsdrawer = page.getByTestId('pdp-product-tabs-desktop:drawer-title-product-details');
    this.ProdDetailscloseButton = page.getByTestId('drawer-close-button');
    this.PinCodeDrawer = page.getByTestId('pdp-delivery-options-desktop:change-pincode');
    this.pincodeInput = page.getByTestId("location-promt-desktop:pincode-input-field");
    this.pincodeSubmit = page.getByTestId('location-promt-desktop:pincode-submit-button');
    this.productDetails = page.locator('[data-test-id="pdp-product-tabs-desktop:tab-button-product-details"]');
    this.drawerId = page.getByTestId("pdp-product-tabs-desktop:drawer-product-id");
    this.drawerText = page.getByTestId("pdp-product-tabs-desktop:drawer-product-description");
    this.drawerLoginMessage = page.locator("div[class='mt-2.5 text-sm text-rock-400']");
    this.pinCodeError = page.getByTestId("location-promt-desktop:pincode-error-text");
    this.drawerClose = page.locator("button[class*='flex h-12 w-12']").first();
    this.prodSpecifications = page.getByTestId("pdp-product-tabs-desktop:drawer-title-product-specifications");
    this.prodSpecButton = page.getByTestId("pdp-product-tabs-desktop:tab-button-title-product-specifications");
  }
}
