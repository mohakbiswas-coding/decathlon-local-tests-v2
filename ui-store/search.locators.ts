import { Locator, Page } from '@playwright/test';

export class SearchLocators {
  readonly backdrop: Locator;
  readonly overlayInput: Locator;
  readonly searchInput: Locator;
  readonly clearButton: Locator;
  readonly trendingTitle: Locator;
  readonly trendingTerms: Locator;

  constructor(private readonly page: Page) {
    this.backdrop = page.getByTestId('search-box-desktop:backdrop');
    this.overlayInput = page.getByTestId('search-input-desktop:container').first();
    this.searchInput = this.overlayInput.locator('input');
    this.clearButton = page.getByTestId('search-input-desktop:clear'); // verify with Inspect
    this.trendingTitle = page.getByTestId('trending-search:title');
    this.trendingTerms = page.getByTestId('trending-search:item'); // verify with Inspect
  }

  /** A section heading whose text comes from the test data. */
  sectionTitle(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }
}
