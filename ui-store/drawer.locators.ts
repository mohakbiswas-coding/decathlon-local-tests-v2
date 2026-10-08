import { Locator, Page } from '@playwright/test';

/**
 * The right-side drawer shared by Product details, Product specifications
 * and Select delivery location. Only one drawer is open at a time.
 */
export class DrawerLocators {
  readonly drawer: Locator;
  readonly overlay: Locator;
  readonly closeButton: Locator;
  readonly pincodeInput: Locator;
  readonly pincodeSubmit: Locator;

  constructor(private readonly page: Page) {
    this.drawer = page.getByRole('dialog').or(page.getByTestId('drawer:container')); // verify with Inspect
    this.overlay = page.getByTestId('drawer:overlay'); // verify with Inspect
    this.closeButton = this.drawer.getByRole('button', { name: /close/i }).or(this.drawer.getByTestId('drawer:close-icon')); // verify with Inspect
    this.pincodeInput = this.drawer.getByPlaceholder(/pincode/i);
    this.pincodeSubmit = this.drawer.getByTestId('pincode:submit-button'); // verify with Inspect
  }

  /** The row on the PDP that opens a drawer, e.g. "Product details". */
  trigger(text: string): Locator {
    return this.page.getByText(text, { exact: true }).first();
  }

  /** A piece of text inside the open drawer. */
  textInDrawer(text: string): Locator {
    return this.drawer.getByText(text, { exact: true }).first();
  }
}
