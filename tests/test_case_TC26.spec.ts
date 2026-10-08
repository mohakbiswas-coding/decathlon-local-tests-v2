import { test } from '@playwright/test';
import productData from '../test-data/product.json';
import { ProductPage } from '../pages/productPage';
import { takeErrorScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_26 - Core product information', async ({ page }) => {
  const productPage = new ProductPage(page);

  await test.step('1. Open the valid product URL for the product ID', async () => {
    await productPage.openProduct(productData.urls.pdp);
  });

  await test.step('2. Wait for the Product Details Page to load', async () => {
    await productPage.waitForProductToLoad();
  });

  await test.step('3. Verify breadcrumbs are visible', async () => {
    await productPage.verifyBreadcrumbs(productData.product.breadcrumbs);
  });

  await test.step('4. Verify the brand is displayed', async () => {
    await productPage.verifyBrand(productData.product.brand);
  });

  await test.step('5. Verify the product name is displayed', async () => {
    await productPage.verifyNameContains(productData.product.name);
  });

  await test.step('6. Verify the product ID is displayed', async () => {
    await productPage.verifyProductId(productData.product.id);
  });

  await test.step('7. Verify the main product image is visible', async () => {
    await productPage.waitUntilVisible(productPage.product.mainImage);
  });

  await test.step('8. Verify the selling price is displayed', async () => {
    await productPage.waitUntilVisible(productPage.product.price);
  });

  await test.step('9. Verify MRP is displayed', async () => {
    await productPage.verifyMrpIsVisible();
  });

  await test.step('10. Verify the rating value and review link are visible', async () => {
    await productPage.verifyRatingAndReviewLinkAreVisible();
  });

  await test.step('11. Verify colour options are displayed', async () => {
    await productPage.verifyColourOptionsAreVisible();
  });

  await test.step('12. Verify size options and Add to cart are displayed', async () => {
    await productPage.verifySizeOptionsAndAddToCartAreVisible();
  });
});
