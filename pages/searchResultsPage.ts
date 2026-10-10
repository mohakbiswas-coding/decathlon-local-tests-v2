import { expect, Page } from '@playwright/test';
import { ProductCardLocators } from '../ui-store/productCard.locators';
import { SearchResultsLocators } from '../ui-store/searchResults.locators';
import { logger } from '../utils/logger';
import { BasePage } from './basePage';

export class SearchResultsPage extends BasePage {
  readonly results: SearchResultsLocators;

  constructor(page: Page) {
    super(page);
    this.results = new SearchResultsLocators(page);
  }

  /** Opens a results page directly, e.g. openResults('/search?query=', 'Shoes for men'). */
  async openResults(resultsUrl: string, keyword: string): Promise<void> {
    await this.open(resultsUrl + encodeURIComponent(keyword));
  }

  /** Returns the locators of the Nth visible product card (0 = first). */
  card(index: number): ProductCardLocators {
    return new ProductCardLocators(this.results.productCards.nth(index));
  }

  // ---- page state ----
  async waitForResults(): Promise<void> {
    await expect(this.results.productCards.first()).toBeVisible();
  }

  async verifyUrlContainsQuery(queryParam: string): Promise<void> {
    await expect(this.page.url()).toContain(queryParam);
  }

  async verifyProductCardIsVisible(): Promise<void> {
    await expect(this.results.productCards.first()).toBeVisible();
  }

  async verifyPageIsNotBlocked(): Promise<void> {
    await expect(this.results.loader).toBeHidden();
  }

  // ---- reading values ----
  async getHeadingText(): Promise<string> {
    return (await this.results.heading.innerText()).trim();
  }

  async getUrlQueryValue(queryParam: string): Promise<string> {
    return new URL(this.page.url()).searchParams.get(queryParam) ?? '';
  }

  async logResultSummary(namesToInspect = 3): Promise<void> {
    const count = await this.results.productCards.count();
    logger.info(`Product cards displayed: ${count}`);
    for (let i = 0; i < Math.min(count, namesToInspect); i++) {
      logger.info(`Result ${i + 1}: ${(await this.card(i).name.innerText()).trim()}`);
    }
  }

  // ---- product card checks ----
  /** Core info every card must show, plus optional info logged when present. */
  async verifyCardInfo(index: number): Promise<void> {
    const card = this.card(index);

    await expect(card.image).toBeVisible();
    await expect(card.name).toBeVisible();
    await expect(card.price).toBeVisible();
    await expect(card.wishlist).toBeVisible();
    await expect(card.addToCart).toBeVisible();

    await this.verifyIfAvailable(card.mrp, `Card ${index + 1} MRP`);
    await this.verifyIfAvailable(card.rating, `Card ${index + 1} rating`);
    await this.verifyIfAvailable(card.discount, `Card ${index + 1} discount`);
  }

  async getCardName(index: number): Promise<string> {
    return (await this.card(index).name.innerText()).trim();
  }

  async openProductFromCard(index: number): Promise<void> {
    await this.click(this.card(index).name);
  }
}
