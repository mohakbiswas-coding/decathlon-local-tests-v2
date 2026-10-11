import { test, type BrowserContext, type Page } from "@playwright/test";
import productData from "../test-data/product.json";
import { ProductPage } from "../pages/productPage";
import { takeErrorScreenshot, takeNormalScreenshot } from "../utils/ScreenshotUtil";

test.describe("Decathlon India - Size selection is mandatory", () => {
  let context: BrowserContext;
  let page: Page;
  let productPage: ProductPage;

  test.describe.configure({ mode: "serial" });

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    productPage = new ProductPage(page);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.afterEach(async ({page}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await takeErrorScreenshot(page, testInfo.title);
    }
  });

  test('TC_28 - Size selection is mandatory', async () => {
    let cartCountBefore = 0;

    await test.step('1. Open a valid size-based Product Details Page', async () => {
      await productPage.openProduct(productData.urls.pdp);
    });

    await test.step('2. Wait for the Select size section to be visible', async () => {
      await productPage.waitUntilVisible(productPage.product.sizeOptions.first());
    });

    await test.step('3. Record the current Cart badge count', async () => {
      cartCountBefore = await productPage.getCartCount();
    });

    await test.step('4. Click Add to cart without selecting a size', async () => {
      await productPage.clickAddToCart();
    });

    await test.step('5. Verify the red message "Please select a size" appears', async () => {
      await productPage.verifySizeErrorIsVisible(productData.labels.selectSizeError);
      await takeNormalScreenshot(page, 'TC_28 size error message');
    });

    await test.step('6. Verify size options remain available', async () => {
      await productPage.verifySizeOptionsRemainAvailable();
    });

    await test.step('7. Verify no size is automatically selected', async () => {
      await productPage.verifyNoSizeIsSelected();
    });

    await test.step('8. Verify the Cart badge does not increase', async () => {
      await productPage.verifyCartCountIs(cartCountBefore);
    });

    await test.step('9. Verify the shopper remains on the Product Details Page', async () => {
      await productPage.verifyStillOnProductPage(productData.urls.productPath);
    });
  });
});
