import { test } from '@playwright/test';
import productData from '../test-data/product.json';
import { DrawerPage } from '../pages/drawerPage';
import { ProductPage } from '../pages/productPage';
import { takeErrorScreenshot, takeNormalScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_33 - Invalid delivery PIN code', async ({ page }) => {
  const productPage = new ProductPage(page);
  const drawerPage = new DrawerPage(page);
  const delivery = productData.delivery;

  await test.step('1. Open the Product Details Page', async () => {
    await productPage.openProduct(productData.urls.pdp);
    await productPage.waitForProductToLoad();
  });

  await test.step('2. Locate the delivery location or PIN-code area', async () => {
    await drawerPage.scrollToTrigger(delivery.triggerText);
    await drawerPage.verifyTriggerIsVisible(delivery.triggerText);
  });

  await test.step('3. Open Select delivery location', async () => {
    await drawerPage.openDrawer(delivery.triggerText);
  });

  await test.step('4. Verify the right-side delivery drawer opens', async () => {
    await drawerPage.verifyDrawerIsOpen();
  });

  await test.step('5. Verify the login message is displayed for a guest user', async () => {
    await drawerPage.verifyGuestLoginMessage(delivery.guestLoginText);
  });

  await test.step('6-8. Locate the Enter pincode field, clear it and enter the invalid PIN code', async () => {
    await drawerPage.enterPincode(delivery.invalidPincode);
  });

  await test.step('9. Click the arrow submit button', async () => {
    await drawerPage.submitPincode();
  });

  await test.step('10-11. Wait for validation and verify the red error message appears', async () => {
    await drawerPage.verifyPincodeError(delivery.invalidPincodeError);
    await takeNormalScreenshot(page, 'TC_33 invalid pincode error');
  });

  await test.step('12. Close the delivery drawer using X', async () => {
    await drawerPage.closeDrawer();
    await drawerPage.verifyDrawerIsClosed();
  });
});
