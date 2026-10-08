import { test } from '@playwright/test';
import searchData from '../test-data/search.json';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';

test.describe('Decathlon Search overlay', () => {
  test('Verify Search overlay opens, displays available content, and closes', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);

    test.info().annotations.push({
      type: 'test-data',
      description: `JSON keyword reserved for search flows: ${searchData.searchKeyword}`
    });

    await test.step('1. Launch the Decathlon website.', async () => {
      await homePage.launch();
    });

    await test.step('2. Wait until the homepage header is visible.', async () => {
      await homePage.waitForHeader();
    });

    await test.step('3. Locate the Search field in the header.', async () => {
      await homePage.waitUntilVisible(homePage.header.searchField);
    });

    await test.step('4. Click the Search field.', async () => {
      await homePage.openSearch();
    });

    await test.step('5. Verify the background page remains visible.', async () => {
      await homePage.verifyBackgroundPageRemainsVisible();
    });

    await test.step('6. Verify the Search overlay opens.', async () => {
      await searchPage.verifyOverlayIsOpen();
    });

    await test.step('7. Verify the Search input is visible in the overlay.', async () => {
      await searchPage.verifySearchInputIsVisible();
    });

    await test.step('8. Verify Trending searches is displayed when data is available.', async () => {
      await searchPage.verifyTrendingSearchesWhenAvailable();
    });

    await test.step('9. Verify Recommended For You or Bestsellers is displayed when data is available.', async () => {
      await searchPage.verifyRecommendationsWhenAvailable();
    });

    await test.step('10. Verify the close control is visible.', async () => {
      await searchPage.verifyCloseControlIsVisible();
    });

    await test.step('11. Click the close control.', async () => {
      await searchPage.closeOverlay();
    });

    await test.step('12. Verify the Search overlay closes.', async () => {
      await searchPage.verifyOverlayIsClosed();
    });
  });
});
