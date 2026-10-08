import { test } from '@playwright/test';
import searchData from '../test-data/search.json';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';
import { SearchResultsPage } from '../pages/searchResultsPage';

test('TC_22 - Partial keyword search', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const resultsPage = new SearchResultsPage(page);
  const keyword = searchData.partialKeyword;

  await test.step('1. Launch the Decathlon website', async () => {
    await homePage.launch();
  });

  await test.step('2. Click the Search field', async () => {
    await homePage.openSearch();
  });

  await test.step('3. Verify the Search overlay opens', async () => {
    await searchPage.verifyOverlayIsOpen();
  });

  await test.step('4. Click inside the Search input', async () => {
    await searchPage.click(searchPage.search.searchInput);
  });

  await test.step('5. Enter the partial keyword', async () => {
    await searchPage.enterKeyword(keyword);
  });

  await test.step('6. Verify the keyword remains visible in the input', async () => {
    await searchPage.verifyInputHasValue(keyword);
  });

  await test.step('7. Verify the clear X control appears in the input', async () => {
    await searchPage.verifyClearButtonIsVisible();
  });

  await test.step('8. Observe the available discovery or suggestion content', async () => {
    await searchPage.verifyTrendingSearchesIfAvailable();
  });

  await test.step('9. Press Enter to submit the partial keyword', async () => {
    await searchPage.submitSearch();
  });

  await test.step('10. Wait for the Search results page to load', async () => {
    await resultsPage.waitForResults();
  });

  await test.step('11. Verify the URL contains a search query parameter', async () => {
    await resultsPage.verifyUrlContainsQuery(searchData.urls.queryParam, keyword);
  });

  await test.step('12. Verify product results are displayed', async () => {
    await resultsPage.verifyProductCardIsVisible();
  });
});
