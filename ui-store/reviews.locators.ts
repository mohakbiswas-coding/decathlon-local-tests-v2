import { Locator, Page } from '@playwright/test';

/** Locators of the Reviews section on the PDP. All are best guesses - verify with Inspect. */
export class ReviewsLocators {
  readonly section: Locator;
  readonly overallRating: Locator;
  readonly reviewCountLink: Locator;
  readonly ratingDistribution: Locator;
  readonly reviewEntries: Locator;
  readonly reviewTitles: Locator;
  readonly reviewMeta: Locator;
  readonly viewAll: Locator;

  constructor(private readonly page: Page) {
    this.section = page.getByTestId('pdp-rating-summary-desktop:title');
    this.overallRating = page.getByTestId('pdp-average-rating-desktop:score');
    this.reviewCountLink = page.getByTestId('pdp-average-rating-desktop:count');
    this.ratingDistribution = page.getByTestId('pdp-average-rating-desktop:distribution-list');
    this.reviewEntries = page.getByTestId('pdp-review-summary-desktop:item-wrapper');
    this.reviewTitles = page.getByTestId('pdp-review-item:title');
    this.reviewMeta = page.getByTestId('pdp-review-item:comment-container');
    this.viewAll = page.locator("a[href*='/reviews/']");
  }
}
