import fs from "fs";
import path from "path";
import type { Page } from "@playwright/test";
import { readableTimestamp } from "./dateUtil";
import { logger } from "./logger";

const SCREENSHOT_DIR = path.join(process.cwd(), "reports", "screenshots");

export function safeName(name: string): string {
  return name
    .replace(/["<>:/\\|?*]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function ensureDir(): void {
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

export async function takeNormalScreenshot(page: Page, name: string): Promise<string> {
  ensureDir();
  const file = path.join(SCREENSHOT_DIR, `NORMAL-${safeName(name)}-${readableTimestamp()}.png`);
  await page.screenshot({ path: file, fullPage: false });
  logger.info(`Screenshot captured: ${name}`);
  return file;
}

export async function takeErrorScreenshot(page: Page, scenarioName: string): Promise<string> {
  ensureDir();
  const file = path.join(SCREENSHOT_DIR, `ERROR-${safeName(scenarioName)}-${readableTimestamp()}.png`);
  await page.screenshot({ path: file, fullPage: false });
  logger.error(`Failure screenshot captured for: ${scenarioName}`);
  return file;
}

export function screenshotCount(): number {
  return fs.existsSync(SCREENSHOT_DIR) ? fs.readdirSync(SCREENSHOT_DIR).length : 0;
}

export { SCREENSHOT_DIR };