import { expect, test } from '@playwright/test';
import searchData from '../test-data/search.json';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';
import { SearchResultsPage } from '../pages/searchResultsPage';

test('TC_24 - Unrelated keyword handling', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const resultsPage = new SearchResultsPage(page);
  const searcKeyword = searchData.unrelatedKeyword;
  const keyword = searchData.unrelatedKeywordExpected;

  await test.step('1. Launch the Decathlon website', async () => {
    await homePage.launch();
  });

  await test.step('2. Click the Search field', async () => {
    await homePage.openSearch();
  });

  await test.step('3. Clear any existing Search text', async () => {
    await searchPage.clearSearchText();
  });

  await test.step('4. Enter the unrelated keyword', async () => {
    await searchPage.enterKeyword(searcKeyword);
  });

  await test.step('5. Press Enter to submit the keyword', async () => {
    await searchPage.submitSearch();
  });

  await test.step('6. Verify the URL contains the submitted query', async () => {
    await resultsPage.verifyUrlContainsQuery(searcKeyword);
  });

  await test.step('7. Verify the results heading represents the submitted keyword', async () => {
    await expect(resultsPage.results.heading).toContainText(keyword, { ignoreCase: true });
  });

  await test.step('8-9. Record the result count and inspect the first product names', async () => {
    await resultsPage.logResultSummary();
  });
});
