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
    this.section = page.getByTestId('pdp-reviews:container'); // verify with Inspect
    this.overallRating = this.section.getByTestId('pdp-reviews:overall-rating'); // verify with Inspect
    this.reviewCountLink = this.section.getByTestId('pdp-reviews:review-count'); // verify with Inspect
    this.ratingDistribution = this.section.getByTestId('pdp-reviews:rating-distribution'); // verify with Inspect
    this.reviewEntries = this.section.getByTestId('pdp-reviews:review-card'); // verify with Inspect
    this.reviewTitles = this.section.getByTestId('pdp-reviews:review-title'); // verify with Inspect
    this.reviewMeta = this.section.getByTestId('pdp-reviews:review-meta'); // verify with Inspect
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
