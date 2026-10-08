import { test } from '@playwright/test';
import productData from '../test-data/product.json';
import { DrawerPage } from '../pages/drawerPage';
import { ProductPage } from '../pages/productPage';
import { takeErrorScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_32 - Product specifications drawer', async ({ page }) => {
  const productPage = new ProductPage(page);
  const drawerPage = new DrawerPage(page);
  const specs = productData.drawers.specifications;

  await test.step('1. Open the Product Details Page', async () => {
    await productPage.openProduct(productData.urls.pdp);
    await productPage.waitForProductToLoad();
  });

  await test.step('2. Scroll to Product specifications', async () => {
    await drawerPage.scrollToTrigger(specs.title);
  });

  await test.step('3. Click Product specifications', async () => {
    await drawerPage.openDrawer(specs.title);
  });

  await test.step('4. Verify the background page becomes dimmed', async () => {
    await drawerPage.verifyBackgroundIsDimmed();
  });

  await test.step('5. Verify the right-side drawer heading is Product specifications', async () => {
    await drawerPage.verifyDrawerIsOpen();
    await drawerPage.verifyDrawerHeading(specs.title);
  });

  // Steps 6 to 9: Distance, Weight, Frequency and Foot width, all read from the test data.
  for (let i = 0; i < specs.items.length; i++) {
    const { label, value } = specs.items[i];
    await test.step(`${6 + i}. Verify ${label} shows ${value}`, async () => {
      await drawerPage.verifySpecification(label, value);
    });
  }

  await test.step('10. Verify Removable insole and Shoe height entries are visible', async () => {
    await drawerPage.verifyEntriesAreVisible(specs.furtherEntries);
  });

  await test.step('11. Scroll inside the drawer to confirm additional content is accessible', async () => {
    await drawerPage.scrollInsideDrawer();
    await drawerPage.verifyEntriesAreVisible(specs.furtherEntries);
  });

  await test.step('12. Close the drawer using X', async () => {
    await drawerPage.closeDrawer();
    await drawerPage.verifyDrawerIsClosed();
  });
});
