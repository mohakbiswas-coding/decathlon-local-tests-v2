// Reviews page
// Author: Mohak Biswas
// Description: The Reviews section of the PDP.

import { expect, Page } from "@playwright/test";
import { ReviewsLocators } from "../ui-store/reviews.locators";
import { BasePage } from "./basePage";
import { logger } from "../utils/logger";
import { runReport } from "../utils/RunReport";
import { handleError } from "../utils/errorHandlerUtil";

export class ReviewsPage extends BasePage {
  readonly reviews: ReviewsLocators;

  constructor(page: Page) {
    super(page);
    this.reviews = new ReviewsLocators(page);
  }

  /**
   * Author: Mohak Biswas
   * Method Name: scrollToReviews
   * Description: Scrolls to the reviews section.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async scrollToReviews(): Promise<void> {
    try {
      logger.info("Scrolling to the reviews section");
      runReport.record("Scrolling to the reviews section");

      await this.page.waitForLoadState("domcontentloaded");
      await this.scrollTo(this.reviews.section);

      logger.info("Scrolled to the reviews section successfully");
      runReport.record("Scrolled to the reviews section successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to scroll to the reviews section",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyHeadingIsVisible
   * Description: Verifies that the reviews section heading is visible.
   * Parameter: heading (string)
   * Return Type: Promise<void>
   */
  async verifyHeadingIsVisible(heading: string): Promise<void> {
    try {
      logger.info(`Verifying that the reviews heading is visible: ${heading}`);
      runReport.record(
        `Verifying that the reviews heading is visible: ${heading}`,
      );

      await expect(this.reviews.section).toBeVisible();

      logger.info("Reviews heading is visible");
      runReport.record("Reviews heading visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the reviews heading is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyOverallRating
   * Description: Verifies the overall rating.
   * Parameter: rating (string)
   * Return Type: Promise<void>
   */
  async verifyOverallRating(rating: string): Promise<void> {
    try {
      logger.info(`Verifying the overall rating contains ${rating}`);
      runReport.record(`Verifying the overall rating contains ${rating}`);

      await expect(this.reviews.overallRating).toContainText(rating);

      logger.info("Overall rating verified successfully");
      runReport.record("Overall rating verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the overall rating",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyReviewCountLinkIsVisible
   * Description: Verifies that the review count link is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyReviewCountLinkIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the review count link is visible");
      runReport.record("Verifying that the review count link is visible");

      await expect(this.reviews.reviewCountLink).toBeVisible();

      logger.info("Review count link is visible");
      runReport.record("Review count link visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the review count link is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyRatingDistributionIsVisible
   * Description: Verifies that the rating distribution is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyRatingDistributionIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the rating distribution is visible");
      runReport.record("Verifying that the rating distribution is visible");

      await expect(this.reviews.ratingDistribution).toBeVisible();

      logger.info("Rating distribution is visible");
      runReport.record(
        "Rating distribution visibility verified successfully",
      );
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the rating distribution is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyReviewTitleIsDisplayed
   * Description: Verifies that the first review title is visible and not empty.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyReviewTitleIsDisplayed(): Promise<void> {
    try {
      logger.info("Verifying that the review title is displayed");
      runReport.record("Verifying that the review title is displayed");

      await expect(this.reviews.reviewTitles.first()).toBeVisible();
      expect(
        (await this.reviews.reviewTitles.first().innerText()).trim(),
      ).not.toBe("");

      logger.info("Review title is displayed");
      runReport.record("Review title display verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the review title is displayed",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyReviewMetaIfAvailable
   * Description: Verifies the review metadata when it is available.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyReviewMetaIfAvailable(): Promise<void> {
    try {
      logger.info("Verifying the review metadata if available");
      runReport.record("Verifying the review metadata if available");

      await this.verifyIfAvailable(
        this.reviews.reviewMeta.first(),
        "Review metadata",
      );

      logger.info("Review metadata check completed successfully");
      runReport.record("Review metadata check completed successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the review metadata",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyMultipleReviews
   * Description: Verifies that at least the minimum number of reviews are displayed.
   * Parameter: minimum (number)
   * Return Type: Promise<void>
   */
  async verifyMultipleReviews(minimum: number): Promise<void> {
    try {
      logger.info(`Verifying that at least ${minimum} reviews are displayed`);
      runReport.record(
        `Verifying that at least ${minimum} reviews are displayed`,
      );

      await expect(this.reviews.reviewEntries.first()).toBeVisible();
      expect(await this.reviews.reviewEntries.count()).toBeGreaterThanOrEqual(
        minimum,
      );

      logger.info("Multiple reviews are displayed");
      runReport.record("Multiple reviews display verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that multiple reviews are displayed",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyViewAllIsVisible
   * Description: Verifies that the view all reviews link is visible.
   * Parameter: text (string)
   * Return Type: Promise<void>
   */
  async verifyViewAllIsVisible(text: string): Promise<void> {
    try {
      logger.info(`Verifying that the view all link is visible: ${text}`);
      runReport.record(`Verifying that the view all link is visible: ${text}`);

      await expect(this.reviews.viewAll).toBeVisible();

      logger.info("View all link is visible");
      runReport.record("View all link visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the view all link is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyReviewsDoNotOverlap
   * Description: Verifies that each review starts below the end of the one before it.
   * Parameter: entriesToCheck (number)
   * Return Type: Promise<void>
   */
  async verifyReviewsDoNotOverlap(entriesToCheck: number): Promise<void> {
    try {
      logger.info(`Verifying that ${entriesToCheck} reviews do not overlap`);
      runReport.record(
        `Verifying that ${entriesToCheck} reviews do not overlap`,
      );

      const count = Math.min(
        await this.reviews.reviewEntries.count(),
        entriesToCheck,
      );
      let previousBottom = -Infinity;
      for (let i = 0; i < count; i++) {
        const box = await this.reviews.reviewEntries.nth(i).boundingBox();
        expect(
          box,
          `review ${i + 1} has no position on the page`,
        ).not.toBeNull();
        expect(
          box!.y + 1,
          `review ${i + 1} overlaps the one above`,
        ).toBeGreaterThanOrEqual(previousBottom);
        previousBottom = box!.y + box!.height;
      }

      logger.info(`${count} review entries checked for overlap`);
      runReport.record(`${count} review entries checked for overlap`);
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the reviews do not overlap",
      );
    }
  }
}