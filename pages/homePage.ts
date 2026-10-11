// Home page
// Author: Mohak Biswas

import { expect, Page } from "@playwright/test";
import { HeaderLocators } from "../ui-store/header.locators";
import { BasePage } from "./basePage";
import { logger } from "../utils/logger";
import { runReport } from "../utils/RunReport";
import { handleError } from "../utils/errorHandlerUtil";

export class HomePage extends BasePage {
  readonly header: HeaderLocators;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderLocators(page);
  }

  /**
   * Author: Mohak Biswas
   * Method Name: launch
   * Description: Opens the home page.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async launch(): Promise<void> {
    try {
      logger.info("Launching the home page");
      runReport.record("Launching the home page");

      await this.open("/");

      logger.info("Home page launched successfully");
      runReport.record("Home page launched successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to launch the home page");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: waitForHeader
   * Description: Waits until the header logo and search field are visible.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async waitForHeader(): Promise<void> {
    try {
      logger.info("Waiting for the header logo and search field");
      runReport.record("Waiting for the header logo and search field");

      await this.waitUntilVisible(this.header.logo);
      await this.waitUntilVisible(this.header.searchField);

      logger.info("Header logo and search field are visible");
      runReport.record("Header logo and search field are visible");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to wait for the header logo and search field",
      );
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: openSearch
   * Description: Clicks the header search field.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async openSearch(): Promise<void> {
    try {
      logger.info("Opening the search field");
      runReport.record("Opening the search field");

      await this.click(this.header.searchField);

      logger.info("Search field opened successfully");
      runReport.record("Search field opened successfully");
    } catch (error) {
      await handleError(this.page, error, "Failed to open the search field");
    }
  }

  /**
   * Author: Mohak Biswas
   * Method Name: verifyBackgroundPageRemainsVisible
   * Description: Verifies that the header logo remains visible in the background.
   * Parameter: None
   * Return Type: Promise<void>
   */
  async verifyBackgroundPageRemainsVisible(): Promise<void> {
    try {
      logger.info("Verifying that the background page remains visible");
      runReport.record("Verifying that the background page remains visible");

      await expect(this.header.logo).toBeVisible();

      logger.info("Background page remains visible");
      runReport.record("Background page visibility verified successfully");
    } catch (error) {
      await handleError(
        this.page,
        error,
        "Failed to verify that the background page remains visible",
      );
    }
  }
}