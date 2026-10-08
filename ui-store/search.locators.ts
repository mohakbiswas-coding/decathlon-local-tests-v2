import { Locator, Page } from '@playwright/test';

export class SearchLocators {
  readonly backdrop: Locator;
  readonly overlayInput: Locator;
  readonly trendingSearchesTitle: Locator;
  readonly recommendedForYouTitle: Locator;
  readonly bestsellersTitle: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.backdrop = page.locator('[data-test-id="search-box-desktop:backdrop"]');
    this.overlayInput = page.getByTestId("search-input-desktop:container").first();
    this.trendingSearchesTitle = page.getByTestId("trending-search:title");
    this.recommendedForYouTitle = page.getByText('Recommended For You', { exact: true });
    this.bestsellersTitle = page.getByText('Bestsellers', { exact: true });
    this.closeButton = page.locator(
      '[data-test-id="search-box-desktop:close"], ' +
      '[data-test-id="search-box-desktop:close-button"], ' +
      'button[aria-label*="close" i]'
    ).first();
  }
}
