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

  constructor(private readonly page: Page) {
    this.section = page.getByTestId('pdp-reviews-desktop:wrapper');
    this.overallRating = this.section.getByTestId('pdp-average-rating-desktop:score');
    this.reviewCountLink = this.section.getByTestId('pdp-average-rating-desktop:count');
    this.ratingDistribution = this.section.getByTestId('pdp-average-rating-desktop:distribution-list');
    this.reviewEntries = this.section.getByTestId('pdp-review-summary-desktop:item-wrapper');
    this.reviewTitles = this.section.getByTestId('pdp-review-item:title');
    this.reviewMeta = this.section.getByTestId('pdp-review-item:comment-container');
  }

  /** Section heading, e.g. "Reviews". */
  heading(text: string): Locator {
    return this.page.getByRole('heading', { name: text, exact: true });
  }

  /** A rating attribute label, e.g. "Fitting comfort". */
  attribute(text: string): Locator {
    return this.section.getByText(text, { exact: false }).first();
  }

  /** The "View all reviews" link or button. */
  viewAll(text: string): Locator {
    return this.page.getByText(text, { exact: true }).first();
  }
}
