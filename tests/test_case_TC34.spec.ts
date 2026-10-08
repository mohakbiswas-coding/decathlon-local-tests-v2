import { test } from '@playwright/test';
import productData from '../test-data/product.json';
import { ProductPage } from '../pages/productPage';
import { ReviewsPage } from '../pages/reviewsPage';
import { takeErrorScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_34 - Reviews section', async ({ page }) => {
  const productPage = new ProductPage(page);
  const reviewsPage = new ReviewsPage(page);
  const reviewData = productData.reviews;

  await test.step('1. Open the Product Details Page', async () => {
    await productPage.openProduct(productData.urls.pdp);
    await productPage.waitForProductToLoad();
  });

  await test.step('2. Scroll to the Reviews section', async () => {
    await reviewsPage.scrollToReviews(reviewData.heading);
  });

  await test.step('3. Verify the Reviews heading is visible', async () => {
    await reviewsPage.verifyHeadingIsVisible(reviewData.heading);
  });

  await test.step('4. Verify the overall rating is displayed', async () => {
    await reviewsPage.verifyOverallRating(reviewData.overallRating);
  });

  await test.step('5. Verify the review count link is displayed', async () => {
    await reviewsPage.verifyReviewCountLinkIsVisible();
  });

  await test.step('6. Verify the star-rating distribution is visible', async () => {
    await reviewsPage.verifyRatingDistributionIsVisible();
  });

  await test.step('7. Verify attribute ratings such as fitting comfort are displayed', async () => {
    await reviewsPage.verifyAttributeRatings(reviewData.attributes);
  });

  await test.step('8. Verify at least one written review title is displayed', async () => {
    await reviewsPage.verifyReviewTitleIsDisplayed();
  });

  await test.step('9. Verify review metadata is displayed where available', async () => {
    await reviewsPage.verifyReviewMetaIfAvailable();
  });

  await test.step('10. Verify multiple review entries can be seen', async () => {
    await reviewsPage.verifyMultipleReviews(reviewData.entriesToCheck);
  });

  await test.step('11. Verify View all reviews is visible', async () => {
    await reviewsPage.verifyViewAllIsVisible(reviewData.viewAllText);
  });

  await test.step('12. Verify the section remains readable without overlapping content', async () => {
    await reviewsPage.verifyReviewsDoNotOverlap(reviewData.entriesToCheck);
  });
});
