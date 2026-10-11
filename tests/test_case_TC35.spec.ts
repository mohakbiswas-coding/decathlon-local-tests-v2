import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import cartData from "../test-data/cart.json";
import productData from "../test-data/product.json";
import searchData from "../test-data/search.json";
import { CartPage } from "../pages/cartPage";
import { HomePage } from "../pages/homePage";
import { ProductPage } from "../pages/productPage";
import { SearchPage } from "../pages/searchPage";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { takeErrorScreenshot, takeNormalScreenshot } from "../utils/ScreenshotUtil";

test.describe("Decathlon India - End-to-end product purchase flow (guest checkout)", () => {
  let context: BrowserContext;
  let page: Page;
  let homePage: HomePage;
  let searchPage: SearchPage;
  let resultsPage: SearchResultsPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.describe.configure({ mode: "serial" });

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    resultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.afterEach(async ({page}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await takeErrorScreenshot(page, testInfo.title);
    }
  });

  test('TC_35 - End-to-end product purchase flow (guest checkout)', async () => {
    const searchKeyword = searchData.e2eSearchKeyword;
    const expectedProductHref = `${productData.urls.productPath}${productData.product.id}`;
    const selectedSize = productData.size.toSelect;
    let cartCountBeforeAdd = 0;
    let selectedCardName = '';

    await test.step('1. Launch the Decathlon homepage', async () => {
      await homePage.launch();
    });

    await test.step('2. Wait for the header and open Search', async () => {
      await homePage.waitForHeader();
      await homePage.openSearch();
    });

    await test.step('3. Verify the Search overlay and input are visible', async () => {
      await searchPage.verifyOverlayIsOpen();
      await searchPage.verifySearchInputIsVisible();
    });

    await test.step('4. Enter the KIPRUN product keyword', async () => {
      await searchPage.enterKeyword(searchKeyword);
      await searchPage.verifyInputHasValue(searchKeyword);
    });

    await test.step('5. Submit the product search', async () => {
      await searchPage.submitSearch();
    });

    await test.step('6. Wait for results and verify the submitted query', async () => {
      await resultsPage.waitForResults();
      await resultsPage.verifyUrlContainsQuery(searchData.urls.queryParam);
      const actualQuery = await resultsPage.getUrlQueryValue(searchData.urls.queryParam);
      expect(actualQuery.toLowerCase()).toContain(searchKeyword.toLowerCase());
    });

    await test.step('7. Select the matching KIPRUN product card and open its PDP', async () => {
      selectedCardName = await resultsPage.openProductByName(
        productData.product.searchName,
        expectedProductHref,
      );
      expect(selectedCardName.toLowerCase()).toContain('kiprun');
    });

    await test.step('8. Verify the selected product identity, image, price, and size options', async () => {
      await productPage.waitForProductToLoad();
      await productPage.verifyUrlHasProductPath(productData.urls.productPath);
      await productPage.verifyBrand(productData.product.brand);
      await productPage.verifyNameContains(productData.product.name);
      await productPage.verifyProductId(productData.product.id);
      await productPage.verifyPriceAndImageAreVisible();
      await productPage.verifySizeOptionsAndAddToCartAreVisible();
    });

    await test.step('9. Record the Cart badge and select size 6.5', async () => {
      cartCountBeforeAdd = await productPage.getCartCount();
      await productPage.selectSize(selectedSize);
      await productPage.verifyLowStockIfAvailable(productData.size.lowStockLabel);
    });

    await test.step('10. Add the selected product to the Cart', async () => {
      await productPage.clickAddToCart();
    });

    await test.step('11. Verify add-to-cart success and the Cart badge increment', async () => {
      await productPage.verifyCartButtonText(productData.labels.goToCart);
      await productPage.verifyCartCountIs(cartCountBeforeAdd + 1);
      await productPage.verifySizeErrorIsHidden(productData.labels.selectSizeError);
    });

    await test.step('12. Open the Cart page', async () => {
      await productPage.closeAddToCartConfirmationIfVisible();
      await productPage.goToCart();
      await cartPage.waitForCart();
    });

    await test.step('13. Verify the Cart contains the selected product and size', async () => {
      await cartPage.verifyItemCount(1);
      await cartPage.verifyItemBrand(cartData.brand);
      await cartPage.verifyItemName(productData.product.name);
      await cartPage.verifyItemImageIsVisible();
      await cartPage.verifyItemSize(selectedSize);
      await cartPage.verifyItemQuantity(cartData.quantity);
    });

    await test.step('14. Verify order totals and that guest checkout requires login', async () => {
      await cartPage.verifySellingPrice(cartData.prices.selling);
      await cartPage.verifyMrp(cartData.prices.mrp);
      await cartPage.verifySummaryDiscount(cartData.prices.discount);
      await cartPage.verifySummaryTotal(cartData.prices.total);
      await cartPage.verifyGuestCheckoutAction();
      await takeNormalScreenshot(page, 'TC_35 end-to-end cart summary');
    });

    await test.step('15. Select Login to Proceed and verify the authentication gate appears', async () => {
      await cartPage.clickGuestCheckoutAction();
      await cartPage.verifyLoginGateIsDisplayed();
    });
  });
});
