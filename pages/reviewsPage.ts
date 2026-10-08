import { expect, Page } from '@playwright/test';
import { ReviewsLocators } from '../ui-store/reviews.locators';
import { logger } from '../utils/Logger';
import { BasePage } from './basePage';

/** The Reviews section of the PDP. */
export class ReviewsPage extends BasePage {
  readonly reviews: ReviewsLocators;

  constructor(page: Page) {
    super(page);
    this.reviews = new ReviewsLocators(page);
  }

  async scrollToReviews(heading: string): Promise<void> {
    await this.scrollTo(this.reviews.heading(heading));
  }

  async verifyHeadingIsVisible(heading: string): Promise<void> {
    await expect(this.reviews.heading(heading)).toBeVisible();
  }

  async verifyOverallRating(rating: string): Promise<void> {
    await expect(this.reviews.overallRating).toContainText(rating);
  }

  async verifyReviewCountLinkIsVisible(): Promise<void> {
    await expect(this.reviews.reviewCountLink).toBeVisible();
  }

  async verifyRatingDistributionIsVisible(): Promise<void> {
    await expect(this.reviews.ratingDistribution).toBeVisible();
  }

  async verifyAttributeRatings(attributes: string[]): Promise<void> {
    for (const attribute of attributes) {
      await expect(this.reviews.attribute(attribute)).toBeVisible();
    }
  }

  async verifyReviewTitleIsDisplayed(): Promise<void> {
    await expect(this.reviews.reviewTitles.first()).toBeVisible();
    expect((await this.reviews.reviewTitles.first().innerText()).trim()).not.toBe('');
  }

  async verifyReviewMetaIfAvailable(): Promise<void> {
    await this.verifyIfAvailable(this.reviews.reviewMeta.first(), 'Review metadata');
  }

  async verifyMultipleReviews(minimum: number): Promise<void> {
    await expect(this.reviews.reviewEntries.first()).toBeVisible();
    expect(await this.reviews.reviewEntries.count()).toBeGreaterThanOrEqual(minimum);
  }

  async verifyViewAllIsVisible(text: string): Promise<void> {
    await expect(this.reviews.viewAll(text)).toBeVisible();
  }

  /** Each review must start below the end of the one before it. */
  async verifyReviewsDoNotOverlap(entriesToCheck: number): Promise<void> {
    const count = Math.min(await this.reviews.reviewEntries.count(), entriesToCheck);
    let previousBottom = -Infinity;
    for (let i = 0; i < count; i++) {
      const box = await this.reviews.reviewEntries.nth(i).boundingBox();
      expect(box, `review ${i + 1} has no position on the page`).not.toBeNull();
      expect(box!.y + 1, `review ${i + 1} overlaps the one above`).toBeGreaterThanOrEqual(previousBottom);
      previousBottom = box!.y + box!.height;
    }
    logger.info(`${count} review entries checked for overlap`);
  }
}
