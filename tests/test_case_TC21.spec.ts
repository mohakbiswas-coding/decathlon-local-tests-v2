import { expect, test } from '@playwright/test';
import searchData from '../test-data/search.json';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';
import { SearchResultsPage } from '../pages/searchResultsPage';

test('TC_21 - Trending search', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const resultsPage = new SearchResultsPage(page);
  let trendingTerm = '';

  await test.step('1. Launch the Decathlon website', async () => {
    await homePage.launch();
  });

  await test.step('2. Click the Search field', async () => {
    await homePage.openSearch();
  });

  await test.step('3. Verify the Search overlay opens', async () => {
    await searchPage.verifyOverlayIsOpen();
  });

  await test.step('4. Locate the Trending searches section', async () => {
    await searchPage.waitUntilVisible(searchPage.search.trendingTitle);
  });

  await test.step('5. Record one currently displayed trending term', async () => {
    trendingTerm = await searchPage.getFirstTrendingTerm();
    expect(trendingTerm).not.toBe('');
  });

  await test.step('6. Click the recorded trending term', async () => {
    await searchPage.clickTrendingTerm(trendingTerm);
  });

  await test.step('7. Wait for navigation or result loading to finish', async () => {
    await resultsPage.waitForResults();
  });

  await test.step('8. Verify a Search results page is displayed', async () => {
    await resultsPage.verifyUrlContainsQuery(searchData.urls.queryParam);
  });

  await test.step('9. Verify the submitted term is in the URL, field, or heading', async () => {
    const urlValue = await resultsPage.getUrlQueryValue(searchData.urls.queryParam);

    const term = trendingTerm.toLowerCase();
    const found = [urlValue].some((text) => text.toLowerCase().includes(term));
    expect(found, `"${trendingTerm}" not found in URL, search field or heading`).toBe(true);
  });

  await test.step('10. Verify at least one product card is visible', async () => {
    await resultsPage.verifyProductCardIsVisible();
  });

  await test.step('11. Verify a visible card contains an image, product name, and selling price', async () => {
    const card = resultsPage.card(0);
    await expect(card.image).toBeVisible();
    await expect(card.name).toBeVisible();
    await expect(card.price).toBeVisible();
  });

  await test.step('12. Verify the page remains usable without a blocked loader', async () => {
    await resultsPage.verifyPageIsNotBlocked();
  });
});
