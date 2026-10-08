import { test } from '@playwright/test';
import productData from '../test-data/product.json';
import { DrawerPage } from '../pages/drawerPage';
import { ProductPage } from '../pages/productPage';
import { takeErrorScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_31 - Product details drawer', async ({ page }) => {
  const productPage = new ProductPage(page);
  const drawerPage = new DrawerPage(page);
  const details = productData.drawers.details;

  await test.step('1. Open the Product Details Page', async () => {
    await productPage.openProduct(productData.urls.pdp);
    await productPage.waitForProductToLoad();
  });

  await test.step('2. Scroll to the information section', async () => {
    await drawerPage.scrollToTrigger(details.title);
  });

  await test.step('3. Verify Product details is visible', async () => {
    await drawerPage.verifyTriggerIsVisible(details.title);
  });

  await test.step('4. Click Product details', async () => {
    await drawerPage.openDrawer(details.title);
  });

  await test.step('5. Verify the background page becomes dimmed', async () => {
    await drawerPage.verifyBackgroundIsDimmed();
  });

  await test.step('6. Verify a right-side drawer opens', async () => {
    await drawerPage.verifyDrawerIsOpen();
  });

  await test.step('7. Verify the drawer heading is Product details', async () => {
    await drawerPage.verifyDrawerHeading(details.title);
  });

  await test.step('8. Verify the product ID is displayed in the drawer', async () => {
    await drawerPage.verifyTextInDrawer(details.idLabel);
  });

  await test.step('9. Verify descriptive product text is displayed', async () => {
    await drawerPage.verifyDescriptionIsDisplayed([details.title, details.idLabel]);
  });

  await test.step('10. Verify the drawer close X is visible', async () => {
    await drawerPage.verifyCloseButtonIsVisible();
  });

  await test.step('11. Click the close X', async () => {
    await drawerPage.closeDrawer();
  });

  await test.step('12. Verify the drawer closes and the page becomes active', async () => {
    await drawerPage.verifyDrawerIsClosed();
    await drawerPage.verifyPageIsActive();
  });
});
