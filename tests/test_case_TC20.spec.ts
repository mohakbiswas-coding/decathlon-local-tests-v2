import { test, type BrowserContext, type Page } from "@playwright/test";
import searchData from "../test-data/search.json";
import { HomePage } from "../pages/homePage";
import { SearchPage } from "../pages/searchPage";

test.describe("Decathlon India - Open search overlay", () => {
  let context: BrowserContext;
  let page: Page;
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.describe.configure({ mode: "serial" });

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('TC_20 - Open search overlay', async () => {
    await test.step('1. Launch the Decathlon website', async () => {
      await homePage.launch();
    });

    await test.step('2. Wait until the homepage header is visible', async () => {
      await homePage.waitForHeader();
    });

    await test.step('3. Locate the Search field in the header', async () => {
      await homePage.waitUntilVisible(homePage.header.searchField);
    });

    await test.step('4. Click the Search field', async () => {
      await homePage.openSearch();
    });

    await test.step('5. Verify the background page remains visible', async () => {
      await homePage.verifyBackgroundPageRemainsVisible();
    });

    await test.step('6. Verify the Search overlay opens', async () => {
      await searchPage.verifyOverlayIsOpen();
    });

    await test.step('7. Verify the Search input is visible in the overlay', async () => {
      await searchPage.verifySearchInputIsVisible();
    });

    await test.step('8. Verify Trending searches is displayed when available', async () => {
      await searchPage.verifyTrendingSearchesIfAvailable();
    });

    await test.step('9. Verify Recommended For You or Bestsellers is displayed when available', async () => {
      await searchPage.verifySectionIfAvailable(searchData.overlaySections.recommended);
      await searchPage.verifySectionIfAvailable(searchData.overlaySections.bestsellers);
    });

    await test.step('10. Verify the close control is visible', async () => {
      await searchPage.verifyCloseControlIsVisible();
    });

    await test.step('11. Click the close control', async () => {
      await searchPage.closeOverlay();
    });

    await test.step('12. Verify the Search overlay closes', async () => {
      await searchPage.verifyOverlayIsClosed();
    });
  });
});
