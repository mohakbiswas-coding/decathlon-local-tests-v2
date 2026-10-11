import { test, type BrowserContext, type Page } from "@playwright/test";
import searchData from "../test-data/search.json";
import { SearchResultsPage } from "../pages/searchResultsPage";

test.describe("Decathlon India - Search-result product cards", () => {
  let context: BrowserContext;
  let page: Page;
  let resultsPage: SearchResultsPage;

  test.describe.configure({ mode: "serial" });

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    resultsPage = new SearchResultsPage(page);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('TC_23 - Search-result product cards', async () => {
    await test.step('1. Open a Search results page', async () => {
      await resultsPage.openResults(searchData.urls.searchResults, searchData.searchKeyword);
    });

    await test.step('2. Wait for the product grid to be visible', async () => {
      await resultsPage.waitForResults();
    });

    // Steps 3 to 11: core checks on the first card.
    // Step 12: repeat the same checks on the next card(s).
    for (let index = 0; index < searchData.cardsToCheck; index++) {
      await test.step(`3-12. Verify product card ${index + 1}: image, name, price, wishlist, add to cart (+ optional info)`, async () => {
        await resultsPage.verifyCardInfo(index);
      });
    }
  });
});
