import { Page } from '@playwright/test';
import { logger } from './logger';
import { runReport, captureScreenShot } from './runReport';

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