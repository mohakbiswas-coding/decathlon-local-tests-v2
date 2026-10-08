import { expect, test } from '@playwright/test';
import searchData from '../test-data/search.json';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';
import { SearchResultsPage } from '../pages/searchResultsPage';

test('TC_24 - Unrelated keyword handling', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const resultsPage = new SearchResultsPage(page);
  const keyword = searchData.unrelatedKeyword;

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
    await searchPage.enterKeyword(keyword);
  });

  await test.step('5. Press Enter to submit the keyword', async () => {
    await searchPage.submitSearch();
  });

  await test.step('6. Wait for the results page to load', async () => {
    await expect(page).toHaveURL(new RegExp(searchData.urls.queryParam));
  });

  await test.step('7. Verify the URL contains the submitted query', async () => {
    await resultsPage.verifyUrlContainsQuery(searchData.urls.queryParam, keyword);
  });

  await test.step('8. Verify the results heading represents the submitted keyword', async () => {
    await expect(resultsPage.results.heading).toContainText(keyword, { ignoreCase: true });
  });

  await test.step('9-10. Record the result count and inspect the first product names', async () => {
    await resultsPage.logResultSummary();
  });

  await test.step('11-12. Compare URL query, Search field text and results heading', async () => {
    // Soft assertions: every mismatch is reported as a defect, and the test keeps running.
    const urlValue = await resultsPage.getUrlQueryValue(searchData.urls.queryParam);
    const fieldValue = await searchPage.getInputValue();
    const heading = await resultsPage.getHeadingText();

    expect.soft(urlValue, 'URL query differs from the submitted keyword').toBe(keyword);
    expect.soft(fieldValue, 'Search field differs from the submitted keyword').toBe(keyword);
    expect.soft(heading.toLowerCase(), 'Heading does not contain the submitted keyword').toContain(keyword);
  });
});
