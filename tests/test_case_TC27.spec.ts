import { test } from '@playwright/test';
import productData from '../test-data/product.json';
import { ProductPage } from '../pages/productPage';
import { takeErrorScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_27 - Select colour variant', async ({ page }) => {
  const productPage = new ProductPage(page);
  const colourIndex = productData.colour.thumbnailToSelect;
  let urlBefore = '';
  let imageBefore = '';

  await test.step('1. Open the Product Details Page', async () => {
    await productPage.openProduct(productData.urls.pdp);
  });

  await test.step('2. Wait for the Colour section to be visible', async () => {
    await productPage.waitUntilVisible(productPage.product.colourThumbnails.first());
  });

  await test.step('3. Verify multiple colour thumbnails are displayed', async () => {
    await productPage.verifyColourOptionsAreVisible(productData.colour.minimumThumbnails);
  });

  await test.step('4. Record the current product URL', async () => {
    urlBefore = page.url();
  });

  await test.step('5. Record the current main product image', async () => {
    imageBefore = await productPage.getMainImageSource();
  });

  await test.step('6-7. Click a different colour thumbnail and wait for the variant update', async () => {
    await productPage.selectColour(colourIndex);
  });

  await test.step('8. Verify the main product image changes to the selected colour', async () => {
    await productPage.verifyMainImageChanged(imageBefore);
  });

  await test.step('9. Record whether the URL changed (separate colour variant)', async () => {
    productPage.logVariantChange(urlBefore);
  });

  await test.step('10. Verify price and size controls remain visible', async () => {
    await productPage.verifyPriceAndSizeControlsAreVisible();
  });

  await test.step('11. Verify the page does not display an application error', async () => {
    await productPage.verifyNoApplicationError();
    await productPage.verifyNoPageNotFound();
  });
});
