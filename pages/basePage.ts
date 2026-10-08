import { expect, Locator, Page } from '@playwright/test';
import { logger } from '../utils/Logger';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitUntilVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async type(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async pressEnter(locator: Locator): Promise<void> {
    await locator.press('Enter');
  }

  async scrollTo(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async isVisible(locator: Locator, timeout = 3_000): Promise<boolean> {
    return locator.isVisible({ timeout }).catch(() => false);
  }

  /** For "when available / when applicable" checks: asserts only if the element is shown. */
  async verifyIfAvailable(locator: Locator, label: string): Promise<void> {
    if (await this.isVisible(locator)) {
      await expect(locator).toBeVisible();
      logger.info(`${label} is displayed`);
    } else {
      logger.info(`${label} is not displayed (not available / not applicable)`);
    }
  }

  /** Asserts the element shows a money value, e.g. expected "4999" matches "₹4,999". */
  async verifyAmount(locator: Locator, expectedDigits: string): Promise<void> {
    await expect(locator).toBeVisible();
    const text = (await locator.innerText()).replace(/,/g, '');
    expect(text).toMatch(new RegExp(`(^|\\D)${expectedDigits}(\\D|$)`));
  }

  /** The look of an element that changes when it is selected (border, background, weight). */
  async getHighlightStyle(locator: Locator): Promise<string> {
    return locator.evaluate((element) => {
      const style = getComputedStyle(element);
      return [style.borderTopWidth, style.borderTopColor, style.backgroundColor, style.fontWeight].join('|');
    });
  }
}
