// Search results page
// Author: Mohak Biswas
// Description: The search results page with its product cards.

import { expect, Page } from "@playwright/test";
import { ProductCardLocators } from "../ui-store/productCard.locators";
import { SearchResultsLocators } from "../ui-store/searchResults.locators";
import { BasePage } from "./basePage";
import { logger } from "../utils/logger";
import { runReport } from "../utils/RunReport";
import { handleError } from "../utils/errorHandlerUtil";

export class SearchResultsPage extends BasePage {
  readonly results: SearchResultsLocators;

  constructor(page: Page) {
    super(page);
    this.results = new SearchResultsLocators(page);
  }

  /**
   * Author: Mohak Biswas
   * Method Name: card
   * Description: Returns the locators of the Nth visible product card (0 = first).
   * Parameter: index (number)
   * Return Type: ProductCardLocators
   */
  card(index: number): ProductCardLocators {
    return new ProductCardLocators(this.results.productCards.nth(index));
  }

  /**
   * Author: Mohak Biswas
   * Method Name: getHeadingText
   * Description: Returns the results page heading text.
   * Parameter: None
   * Return Type: Promise<string>
   */
  async getHeadingText(): Promise<string> {
    return (await this.results.heading.innerText()).trim();
  }

  /**
   * Author: Mohak Biswas
   * Method Name: getUrlQueryValue
   * Description: Returns the value of the given query parameter from the current URL.
   * Parameter: queryParam (string)
   * Return Type: Promise<string>
   */
  async getUrlQueryValue(queryParam: string): Promise<string> {
    return new URL(this.page.url()).searchParams.get(queryParam) ?? "";
  }

  /**
   * Author: Mohak Biswas
   * Method Name: getCardName
   * Description: Returns the name of the product card at the given index.
   * Parameter: index (number)
   * Return Type: Promise<string>
   */
  async getCardName(index: number): Promise<string> {
    return (await this.card(index).name.innerText()).trim();
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openResults
   * Description: Opens a results page directly, e.g. openResults('/search?query=', 'Shoes for men').
   * Parameter: resultsUrl (string), keyword (string)
   * Return Type: Promise<void>
   */
  async openResults(resultsUrl: string, keyword: string): Promise<void> {
    try {
      logger.info(`Opening the results page for the keyword ${keyword}`);
      runReport.record(`Opening the results page for the keyword ${keyword}`);

      await this.open(resultsUrl + encodeURIComponent(keyword));

      logger.info("Results page opened successfully");
      runReport.record("Results page opened successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to open the results page");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: waitForResults
   * Description: Waits until the first product card is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async waitForResults(): Promise<void> {
    try {
      logger.info("Waiting for the search results");
      runReport.record("Waiting for the search results");

      await expect(this.results.productCards.first()).toBeVisible();

      logger.info("Search results are visible");
      runReport.record("Search results are visible");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to wait for the search results",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyUrlContainsQuery
   * Description: Verifies that the URL contains the given query parameter.
   * Parameter: queryParam (string)
   * Return Type: Promise<void>
   */
  async verifyUrlContainsQuery(queryParam: string): Promise<void> {
    try {
      logger.info(`Verifying that the URL contains ${queryParam}`);
      runReport.record(`Verifying that the URL contains ${queryParam}`);

      await expect(this.page.url()).toContain(queryParam);

      logger.info("URL query verified successfully");
      runReport.record("URL query verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the query in the URL",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyProductCardIsVisible
   * Description: Verifies that the first product card is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyProductCardIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the product card is visible");
      runReport.record("Verifying that the product card is visible");

      await expect(this.results.productCards.first()).toBeVisible();

      logger.info("Product card is visible");
      runReport.record("Product card visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the product card is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyPageIsNotBlocked
   * Description: Verifies that the page loader is hidden.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyPageIsNotBlocked(): Promise<void> {
    try {
      logger.info("Verifying that the page is not blocked");
      runReport.record("Verifying that the page is not blocked");

      await expect(this.results.loader).toBeHidden();

      logger.info("Page is not blocked");
      runReport.record("Page not blocked state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the page is not blocked",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: logResultSummary
   * Description: Logs the number of product cards and the names of the first few results.
   * Parameter: namesToInspect (number, default 3)
   * Return Type: Promise<void>
   */
  async logResultSummary(namesToInspect = 3): Promise<void> {
    try {
      logger.info("Logging the result summary");
      runReport.record("Logging the result summary");

      const count = await this.results.productCards.count();
      logger.info(`Product cards displayed: ${count}`);
      runReport.record(`Product cards displayed: ${count}`);
      for (let i = 0; i < Math.min(count, namesToInspect); i++) {
        const name = (await this.card(i).name.innerText()).trim();
        logger.info(`Result ${i + 1}: ${name}`);
        runReport.record(`Result ${i + 1}: ${name}`);
      }

      logger.info("Result summary logged successfully");
      runReport.record("Result summary logged successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to log the result summary",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyCardInfo
   * Description: Verifies the core info every card must show, plus optional info logged when present.
   * Parameter: index (number)
   * Return Type: Promise<void>
   */
  async verifyCardInfo(index: number): Promise<void> {
    try {
      logger.info(`Verifying the info of product card ${index + 1}`);
      runReport.record(`Verifying the info of product card ${index + 1}`);

      const card = this.card(index);

      await expect(card.image).toBeVisible();
      await expect(card.name).toBeVisible();
      await expect(card.price).toBeVisible();
      await expect(card.wishlist).toBeVisible();
      await expect(card.addToCart).toBeVisible();

      await this.verifyIfAvailable(card.mrp, `Card ${index + 1} MRP`);
      await this.verifyIfAvailable(card.rating, `Card ${index + 1} rating`);
      await this.verifyIfAvailable(
        card.discount,
        `Card ${index + 1} discount`,
      );

      logger.info(`Product card ${index + 1} info verified successfully`);
      runReport.record(
        `Product card ${index + 1} info verified successfully`,
      );
    } catch (error) {
      await handleError(
        this.page,
        error,
        `Failed to verify the info of product card ${index + 1}`,
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openProductFromCard
   * Description: Opens the product from the card at the given index.
   * Parameter: index (number)
   * Return Type: Promise<void>
   */
  async openProductFromCard(index: number): Promise<void> {
    try {
      logger.info(`Opening the product from card ${index + 1}`);
      runReport.record(`Opening the product from card ${index + 1}`);

      await this.click(this.card(index).name);

      logger.info("Product opened successfully");
      runReport.record("Product opened successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to open the product from the card",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openProductByName
   * Description: Opens a matching result by its visible title and, when supplied, its href.
   * The href constraint lets an end-to-end test select a specific variant when
   * several cards share the same base product name.
   * Parameter: nameFragment (string), expectedHrefFragment (string, optional)
   * Return Type: Promise<string>
   */
  async openProductByName(
    nameFragment: string,
    expectedHrefFragment?: string,
  ): Promise<string> {
    logger.info(`Opening the product matching the name ${nameFragment}`);
    runReport.record(`Opening the product matching the name ${nameFragment}`);

    const normalizedTerms = nameFragment
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter((term) => term.length > 0 && term !== "and");
    const count = await this.results.productCards.count();
    const inspected: string[] = [];

    for (let index = 0; index < count; index++) {
      const card = this.card(index);
      const cardName = (await card.name.innerText()).trim();
      const normalizedCardName = cardName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ");
      const href =
        (await this.results.productCards.nth(index).getAttribute("href")) ?? "";
      inspected.push(`${cardName} (${href || "no href"})`);

      const nameMatches = normalizedTerms.every((term) =>
        normalizedCardName.includes(term),
      );
      const hrefMatches =
        !expectedHrefFragment || href.includes(expectedHrefFragment);

      if (nameMatches && hrefMatches) {
        await this.click(card.name);

        logger.info(`Product opened successfully: ${cardName}`);
        runReport.record(`Product opened successfully: ${cardName}`);
        return cardName;
      }
    }

    throw new Error(
      `Could not find product card matching name "${nameFragment}"` +
        (expectedHrefFragment ? ` and href "${expectedHrefFragment}"` : "") +
        `. Cards inspected: ${inspected.join("; ")}`,
    );
  }
}