import { test, type BrowserContext, type Page } from "@playwright/test";
import productData from "../test-data/product.json";
import { DrawerPage } from "../pages/drawerPage";
import { ProductPage } from "../pages/productPage";
import { takeErrorScreenshot } from "../utils/ScreenshotUtil";

test.describe("Decathlon India - Product specifications drawer", () => {
  let context: BrowserContext;
  let page: Page;
  let productPage: ProductPage;
  let drawerPage: DrawerPage;

  test.describe.configure({ mode: "serial" });

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    productPage = new ProductPage(page);
    drawerPage = new DrawerPage(page);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.afterEach(async ({page}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await takeErrorScreenshot(page, testInfo.title);
    }
  });

  test('TC_32 - Product specifications drawer', async () => {
    const specs = productData.drawers.specifications;

    await test.step('1. Open the Product Details Page', async () => {
      await productPage.openProduct(productData.urls.pdp);
      await productPage.waitForProductToLoad();
    });

    await test.step('2. Scroll to Product specifications', async () => {
      await page.mouse.wheel(0, 1500);
    });

    await test.step('3. Click Product specifications', async () => {
      await drawerPage.openProdSpecDrawer();
    });

    await test.step('4. Verify the right-side drawer heading is Product specifications', async () => {
      await drawerPage.verifyProdSpecIsOpen();
      await drawerPage.verifyProdSpecHeading();
    });

    await test.step('5. Close the drawer using X', async () => {
      await drawerPage.closeDrawer();
      await drawerPage.verifyDrawerIsClosed();
    });
  });
});
