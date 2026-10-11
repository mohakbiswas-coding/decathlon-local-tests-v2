// Search page
// Author: Mohak Biswas
// Description: The Search overlay that opens from the header.

import { expect, Page } from "@playwright/test";
import { SearchLocators } from "../ui-store/search.locators";
import { BasePage } from "./basePage";
import { logger } from "../utils/logger";
import { runReport } from "../utils/RunReport";
import { handleError } from "../utils/errorHandlerUtil";

export class SearchPage extends BasePage {
  readonly search: SearchLocators;

  constructor(page: Page) {
    super(page);
    this.search = new SearchLocators(page);
  }

  /**
   * Author: Mohak Biswas
   * Method Name: getFirstTrendingTerm
   * Description: Returns the text of the first trending search term.
   * Parameter: None
   * Return Type: Promise<string>
   */
  async getFirstTrendingTerm(): Promise<string> {
    await expect(this.search.trendingTitle).toBeVisible();
    const term = await this.search.trendingTerms.first().innerText();
    return term.trim();
  }

  /**
   * Author: Mohak Biswas
   * Method Name: getInputValue
   * Description: Returns the current value of the search input.
   * Parameter: None
   * Return Type: Promise<string>
   */
  async getInputValue(): Promise<string> {
    return this.search.searchInput.inputValue();
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyOverlayIsOpen
   * Description: Verifies that the search overlay is open.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyOverlayIsOpen(): Promise<void> {
    try {
      logger.info("Verifying that the search overlay is open");
      runReport.record("Verifying that the search overlay is open");

      await expect(this.search.backdrop).toBeVisible();

      logger.info("Search overlay is open");
      runReport.record("Search overlay open state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the search overlay is open",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySearchInputIsVisible
   * Description: Verifies that the search input is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifySearchInputIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the search input is visible");
      runReport.record("Verifying that the search input is visible");

      await expect(this.search.searchInput).toBeVisible();

      logger.info("Search input is visible");
      runReport.record("Search input visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the search input is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyCloseControlIsVisible
   * Description: Verifies that the close control is visible. On the site the backdrop is the control that dismisses the overlay.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyCloseControlIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the close control is visible");
      runReport.record("Verifying that the close control is visible");

      await expect(this.search.backdrop).toBeVisible();

      logger.info("Close control is visible");
      runReport.record("Close control visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the close control is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: closeOverlay
   * Description: Closes the search overlay by clicking the backdrop.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async closeOverlay(): Promise<void> {
    try {
      logger.info("Closing the search overlay");
      runReport.record("Closing the search overlay");

      await this.search.backdrop.click({ position: { x: 5, y: 5 } });

      logger.info("Search overlay closed successfully");
      runReport.record("Search overlay closed successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to close the search overlay",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyOverlayIsClosed
   * Description: Verifies that the search overlay is closed.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyOverlayIsClosed(): Promise<void> {
    try {
      logger.info("Verifying that the search overlay is closed");
      runReport.record("Verifying that the search overlay is closed");

      await expect(this.search.backdrop).toBeHidden();

      logger.info("Search overlay is closed");
      runReport.record("Search overlay closed state verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the search overlay is closed",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyTrendingSearchesIfAvailable
   * Description: Verifies the trending searches section when it is available.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyTrendingSearchesIfAvailable(): Promise<void> {
    try {
      logger.info("Verifying the trending searches if available");
      runReport.record("Verifying the trending searches if available");

      await this.verifyIfAvailable(
        this.search.trendingTitle,
        "Trending searches",
      );

      logger.info("Trending searches check completed successfully");
      runReport.record("Trending searches check completed successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the trending searches",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifySectionIfAvailable
   * Description: Verifies the given discovery section when it is available.
   * Parameter: title (string)
   * Return Type: Promise<void>
   */
  async verifySectionIfAvailable(title: string): Promise<void> {
    try {
      logger.info(`Verifying the ${title} section if available`);
      runReport.record(`Verifying the ${title} section if available`);

      await this.verifyIfAvailable(this.search.sectionTitle(title), title);

      logger.info(`${title} section check completed successfully`);
      runReport.record(`${title} section check completed successfully`);
    } catch (error) {
      await handleError(
        this.page,
        error,
        `Failed to verify the ${title} section`,
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: clickTrendingTerm
   * Description: Clicks the trending search term that contains the given text.
   * Parameter: term (string)
   * Return Type: Promise<void>
   */
  async clickTrendingTerm(term: string): Promise<void> {
    try {
      logger.info(`Clicking the trending term ${term}`);
      runReport.record(`Clicking the trending term ${term}`);

      await this.click(
        this.search.trendingTerms.filter({ hasText: term }).first(),
      );

      logger.info("Trending term clicked successfully");
      runReport.record("Trending term clicked successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to click the trending term",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: clearSearchText
   * Description: Clears the text in the search input.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async clearSearchText(): Promise<void> {
    try {
      logger.info("Clearing the search text");
      runReport.record("Clearing the search text");

      await this.type(this.search.searchInput, "");

      logger.info("Search text cleared successfully");
      runReport.record("Search text cleared successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to clear the search text");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: enterKeyword
   * Description: Enters the keyword in the search input.
   * Parameter: keyword (string)
   * Return Type: Promise<void>
   */
  async enterKeyword(keyword: string): Promise<void> {
    try {
      logger.info(`Entering the keyword ${keyword}`);
      runReport.record(`Entering the keyword ${keyword}`);

      await this.click(this.search.searchInput);
      await this.type(this.search.searchInput, keyword);

      logger.info("Keyword entered successfully");
      runReport.record("Keyword entered successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to enter the keyword");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyInputHasValue
   * Description: Verifies that the search input has the given value.
   * Parameter: keyword (string)
   * Return Type: Promise<void>
   */
  async verifyInputHasValue(keyword: string): Promise<void> {
    try {
      logger.info(`Verifying that the search input has the value ${keyword}`);
      runReport.record(
        `Verifying that the search input has the value ${keyword}`,
      );

      await expect(this.search.searchInput).toHaveValue(keyword);

      logger.info("Search input value verified successfully");
      runReport.record("Search input value verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify the search input value",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyClearButtonIsVisible
   * Description: Verifies that the clear button is visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyClearButtonIsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the clear button is visible");
      runReport.record("Verifying that the clear button is visible");

      await expect(this.search.clearButton).toBeVisible();

      logger.info("Clear button is visible");
      runReport.record("Clear button visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the clear button is visible",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: submitSearch
   * Description: Submits the search by pressing Enter in the search input.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async submitSearch(): Promise<void> {
    try {
      logger.info("Submitting the search");
      runReport.record("Submitting the search");

      await this.pressEnter(this.search.searchInput);

      logger.info("Search submitted successfully");
      runReport.record("Search submitted successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to submit the search");
    }
  }
}