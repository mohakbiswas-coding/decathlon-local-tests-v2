import { Page } from '@playwright/test';
import { logger } from './logger';
import { runReport, captureScreenShot } from './runReport';

/**
 * Author Name: Sarthak Pimprikar
 * Method Name: handleError
 * Description: Handles page method failures by logging, reporting and capturing screenshot.
 * Parameter: page, error, stepName
 * Return Type: Promise<never>
 */
export async function handleError(
    page: Page,
    error: unknown,
    stepName: string
): Promise<never> {

    logger.error(`${stepName} : ${error}`);

    runReport.record(
        `${stepName}`,
        'failed'
    );

    await captureScreenShot(
        page,
        `${stepName} Failure`
    );

    throw error;
}