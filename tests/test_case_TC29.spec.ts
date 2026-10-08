import { test } from '@playwright/test';
import productData from '../test-data/product.json';
import { ProductPage } from '../pages/productPage';
import { takeErrorScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_29 - Successful Add to Cart', async ({ page }) => {
  const productPage = new ProductPage(page);
  const size = productData.size.toSelect;
  let cartCountBefore = 0;

  await test.step('1. Open a valid in-stock Product Details Page', async () => {
    await productPage.openProduct(productData.urls.pdp);
  });

  await test.step('2. Wait for the size options and Add to cart button', async () => {
    await productPage.verifySizeOptionsAndAddToCartAreVisible();
  });

  await test.step('3. Record the current Cart badge count', async () => {
    cartCountBefore = await productPage.getCartCount();
  });

  await test.step('4. Select the available size', async () => {
    await productPage.selectSize(size);
  });

  await test.step('5. Verify the low-stock label is displayed for the selected size when present', async () => {
    await productPage.verifyLowStockIfAvailable(productData.size.lowStockLabel);
  });

  await test.step('6-7. Click Add to cart and wait for the add operation to complete', async () => {
    await productPage.clickAddToCart();
  });

  await test.step('8. Verify Add to cart changes to Go to cart', async () => {
    await productPage.verifyCartButtonText(productData.labels.goToCart);
  });

  await test.step('9. Verify the Cart badge increases by one', async () => {
    await productPage.verifyCartCountIs(cartCountBefore + 1);
  });

  await test.step('10. Verify no size-validation message is displayed', async () => {
    await productPage.verifySizeErrorIsHidden(productData.labels.selectSizeError);
  });
});
