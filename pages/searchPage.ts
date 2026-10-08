import { expect, Page } from '@playwright/test';
import { SearchLocators } from '../ui-store/search.locators';
import { BasePage } from './basePage';

export class SearchPage extends BasePage {
  readonly search: SearchLocators;

  constructor(page: Page) {
    super(page);
    this.search = new SearchLocators(page);
  }

  async verifyOverlayIsOpen(): Promise<void> {
    await expect(this.search.backdrop).toBeVisible();
  }

  async verifySearchInputIsVisible(): Promise<void> {
    await expect(this.search.overlayInput).toBeVisible();
  }

  async verifyTrendingSearchesWhenAvailable(): Promise<void> {
    if (await this.isVisible(this.search.trendingSearchesTitle)) {
      await expect(this.search.trendingSearchesTitle).toBeVisible();
    }
  }

  async verifyRecommendationsWhenAvailable(): Promise<void> {
    const recommendedVisible = await this.isVisible(this.search.recommendedForYouTitle);
    const bestsellersVisible = await this.isVisible(this.search.bestsellersTitle);

    if (recommendedVisible || bestsellersVisible) {
      await expect(
        recommendedVisible
          ? this.search.recommendedForYouTitle
          : this.search.bestsellersTitle
      ).toBeVisible();
    }
  }

  async verifyCloseControlIsVisible(): Promise<void> {
    if (await this.isVisible(this.search.closeButton)) {
      await expect(this.search.closeButton).toBeVisible();
      return;
    }

    // Current Codegen identifies the backdrop as the dismiss control.
    await expect(this.search.backdrop).toBeVisible();
  }

  async closeOverlay(): Promise<void> {
    if (await this.isVisible(this.search.closeButton)) {
      await this.search.closeButton.click();
    } else {
      await this.search.backdrop.click({ position: { x: 5, y: 5 } });
    }
  }

  async verifyOverlayIsClosed(): Promise<void> {
    await expect(this.search.backdrop).toBeHidden();
  }
}
