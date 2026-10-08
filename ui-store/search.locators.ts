import { Locator, Page } from '@playwright/test';

export class SearchLocators {
  readonly backdrop: Locator;
  readonly searchInput: Locator;
  readonly clearButton: Locator;
  readonly trendingTitle: Locator;
  readonly trendingTerms: Locator;

  constructor(private readonly page: Page) {
    this.backdrop = page.getByTestId('search-box-desktop:backdrop');
    this.searchInput = page.getByTestId('search-input-desktop:container');
    this.clearButton = page.getByTestId('search-input-desktop:close-icon');
    this.trendingTitle = page.getByTestId('trending-search:title');
    this.trendingTerms = page.getByTestId('trending-search:button');
  }

  /** A section heading whose text comes from the test data. */
  sectionTitle(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }
}
