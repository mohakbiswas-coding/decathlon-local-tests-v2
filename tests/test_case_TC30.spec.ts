import { test } from '@playwright/test';
import cartData from '../test-data/cart.json';
import productData from '../test-data/product.json';
import { CartPage } from '../pages/cartPage';
import { ProductPage } from '../pages/productPage';
import { takeErrorScreenshot, takeNormalScreenshot } from '../utils/ScreenshotUtil';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await takeErrorScreenshot(page, testInfo.title);
});

test('TC_30 - Cart item verification', async ({ page }) => {
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const size = productData.size.toSelect;

  // Precondition: the product has been added with the chosen size.
  await test.step('Precondition. Add the product to the cart with the chosen size', async () => {
    await productPage.openProduct(productData.urls.pdp);
    await productPage.waitForProductToLoad();
    await productPage.selectSize(size);
    await productPage.clickAddToCart();
    await productPage.verifyCartButtonText(productData.labels.goToCart);
  });

  await test.step('1. Click Go to cart', async () => {
    await productPage.goToCart();
  });

  await test.step('2. Wait for the Cart Items page to load', async () => {
    await cartPage.waitForCart();
  });

  await test.step('3. Verify one expected cart item is displayed', async () => {
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemBrand(cartData.brand);
  });

  await test.step('4. Verify the product image is displayed', async () => {
    await cartPage.verifyItemImageIsVisible();
  });

  await test.step('5. Verify the product name matches the selected PDP product', async () => {
    await cartPage.verifyItemName(productData.product.name);
  });

  await test.step('6. Verify the selected size in Cart matches the chosen size', async () => {
    await cartPage.verifyItemSize(size);
  });

  await test.step('7. Verify quantity is 1 for the newly added item', async () => {
    await cartPage.verifyItemQuantity(cartData.quantity);
  });

  await test.step('8. Verify the selling price', async () => {
    await cartPage.verifySellingPrice(cartData.prices.selling);
  });

  await test.step('9. Verify the MRP', async () => {
    await cartPage.verifyMrp(cartData.prices.mrp);
  });

  await test.step('10. Verify the order summary shows the discount', async () => {
    await cartPage.verifySummaryDiscount(cartData.prices.discount);
  });

  await test.step('11. Verify the total for quantity 1', async () => {
    await cartPage.verifySummaryTotal(cartData.prices.total);
  });

  await test.step('12. Verify guest users see Login to Proceed', async () => {
    await cartPage.verifyGuestCheckoutAction();
    await takeNormalScreenshot(page, 'TC_30 cart summary');
  });
});
