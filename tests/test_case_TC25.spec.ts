import { expect, test } from '@playwright/test';
import searchData from '../test-data/search.json';
import { ProductPage } from '../pages/productPage';
import { SearchResultsPage } from '../pages/searchResultsPage';

test('TC_25 - Open PDP from Search', async ({ page }) => {
  const resultsPage = new SearchResultsPage(page);
  const productPage = new ProductPage(page);
  let selectedName = '';

  await test.step('1. Open a Search results page', async () => {
    await resultsPage.openResults(searchData.urls.searchResults, searchData.searchKeyword);
  });

  await test.step('2. Wait for product cards to load', async () => {
    await resultsPage.waitForResults();
  });

  await test.step('3. Select one stable in-stock product card (the first card)', async () => {
    await expect(resultsPage.card(0).addToCart).toBeVisible();
  });

  await test.step('4. Record the visible product name', async () => {
    selectedName = await resultsPage.getCardName(0);
    expect(selectedName).not.toBe('');
  });

  await test.step('5. Click the product name', async () => {
    await resultsPage.openProductFromCard(0);
  });

  await test.step('6. Wait for the Product Details Page to load', async () => {
    await productPage.waitUntilVisible(productPage.product.name);
  });

  await test.step('7. Verify the URL contains a product path', async () => {
    await productPage.verifyUrlHasProductPath(searchData.urls.productPath);
  });

  await test.step('8-9. Verify the PDP displays a brand and a product name', async () => {
    await productPage.verifyBrandAndNameAreVisible();
  });

  await test.step('10. Compare the displayed product with the selected Search result', async () => {
    await productPage.verifyNameMatches(selectedName);
  });

  await test.step('11. Verify the selling price and main product image are visible', async () => {
    await productPage.verifyPriceAndImageAreVisible();
  });

  await test.step('12. Verify no Page Not Found message is displayed', async () => {
    await productPage.verifyNoPageNotFound();
  });
});
