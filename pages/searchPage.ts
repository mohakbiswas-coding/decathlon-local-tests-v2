import { expect, Page } from '@playwright/test';
import { SearchLocators } from '../ui-store/search.locators';
import { BasePage } from './basePage';

/** The Search overlay that opens from the header. */
export class SearchPage extends BasePage {
  readonly search: SearchLocators;

  constructor(page: Page) {
    super(page);
    this.search = new SearchLocators(page);
  }

  // ---- overlay open / close ----
  async verifyOverlayIsOpen(): Promise<void> {
    await expect(this.search.backdrop).toBeVisible();
  }

  async verifySearchInputIsVisible(): Promise<void> {
    await expect(this.search.overlayInput).toBeVisible();
  }

  // On the site the backdrop is the control that dismisses the overlay.
  async verifyCloseControlIsVisible(): Promise<void> {
    await expect(this.search.backdrop).toBeVisible();
  }

  async closeOverlay(): Promise<void> {
    await this.search.backdrop.click({ position: { x: 5, y: 5 } });
  }

  async verifyOverlayIsClosed(): Promise<void> {
    await expect(this.search.backdrop).toBeHidden();
  }

  // ---- discovery sections ----
  async verifyTrendingSearchesIfAvailable(): Promise<void> {
    await this.verifyIfAvailable(this.search.trendingTitle, 'Trending searches');
  }

  async verifySectionIfAvailable(title: string): Promise<void> {
    await this.verifyIfAvailable(this.search.sectionTitle(title), title);
  }

  async getFirstTrendingTerm(): Promise<string> {
    await expect(this.search.trendingTitle).toBeVisible();
    const term = await this.search.trendingTerms.first().innerText();
    return term.trim();
  }

  async clickTrendingTerm(term: string): Promise<void> {
    await this.click(this.search.trendingTerms.filter({ hasText: term }).first());
  }

  // ---- typing and submitting ----
  async clearSearchText(): Promise<void> {
    await this.type(this.search.searchInput, '');
  }

  async enterKeyword(keyword: string): Promise<void> {
    await this.click(this.search.searchInput);
    await this.type(this.search.searchInput, keyword);
  }

  async verifyInputHasValue(keyword: string): Promise<void> {
    await expect(this.search.searchInput).toHaveValue(keyword);
  }

  async verifyClearButtonIsVisible(): Promise<void> {
    await expect(this.search.clearButton).toBeVisible();
  }

  async submitSearch(): Promise<void> {
    await this.pressEnter(this.search.searchInput);
  }

  async getInputValue(): Promise<string> {
    return this.search.searchInput.inputValue();
  }
}
