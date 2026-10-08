import { test } from '@playwright/test';
import productData from '../test-data/product.json';
import { ProductPage } from '../pages/productPage';
import { takeErrorScreenshot, takeNormalScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_28 - Size selection is mandatory', async ({ page }) => {
  const productPage = new ProductPage(page);
  let cartCountBefore = 0;

  await test.step('1. Open a valid size-based Product Details Page', async () => {
    await productPage.openProduct(productData.urls.pdp);
  });

  await test.step('2. Wait for the Select size section to be visible', async () => {
    await productPage.waitUntilVisible(productPage.product.sizeOptions.first());
  });

  await test.step('5. Record the current Cart badge count', async () => {
    cartCountBefore = await productPage.getCartCount();
  });

  await test.step('6. Click Add to cart without selecting a size', async () => {
    await productPage.clickAddToCart();
  });

  await test.step('7. Verify the red message "Please select a size" appears', async () => {
    await productPage.verifySizeErrorIsVisible(productData.labels.selectSizeError);
    await takeNormalScreenshot(page, 'TC_28 size error message');
  });

  await test.step('8. Verify size options remain available', async () => {
    await productPage.verifySizeOptionsRemainAvailable();
  });

  await test.step('10. Verify no size is automatically selected', async () => {
    await productPage.verifyNoSizeIsSelected();
  });

  await test.step('11. Verify the Cart badge does not increase', async () => {
    await productPage.verifyCartCountIs(cartCountBefore);
  });

  await test.step('12. Verify the shopper remains on the Product Details Page', async () => {
    await productPage.verifyStillOnProductPage(productData.urls.productPath);
  });
});
