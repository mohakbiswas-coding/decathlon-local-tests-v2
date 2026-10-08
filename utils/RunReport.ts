import fs from "fs";
import path from "path";
import type { Page } from "@playwright/test";
import { logTimestamp, readableTimestamp } from "./dateUtil";
import { logger } from "./logger";
import { safeName } from "./ScreenshotUtil";
import { envOrDefault } from "./envReader";

/** One line of the run report this framework writes for itself. */
export type ReportEntry = { step: string; status: string; at: string; screenshot?: string };

const REPORT_DIR = path.join(process.cwd(), "reports");
const SCREENSHOT_DIR = path.join(REPORT_DIR, "screenshots");

function ensureDirs(): void {
  for (const dir of [REPORT_DIR, SCREENSHOT_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * The run's own report — the "Phramacy_Report".
 *
 * The page object and the steps record what they did as they go, the steps can
 * read those entries back, and the whole run is written to
 * reports/Phramacy_Report.json.
 */
class RunReport {
  private entries: ReportEntry[] = [];

  record(step: string, status = "passed", screenshot?: string): void {
    this.entries.push({ step, status, at: logTimestamp(), screenshot });
  }

  all(): ReportEntry[] {
    return [...this.entries];
  }

  /** The recorded step texts, for a step that reads the report back. */
  steps(): string[] {
    return this.entries.map((entry) => entry.step);
  }

  /** Every screenshot path the report has been given. */
  attachments(): string[] {
    return this.entries.filter((entry) => entry.screenshot).map((entry) => entry.screenshot as string);
  }

  /** Where the report file is written. */
  file(): string {
    return path.join(REPORT_DIR, `${envOrDefault("REPORT_NAME", "Phramacy_Report")}.json`);
  }

  save(): string {
    ensureDirs();
    const target = this.file();
    fs.writeFileSync(target, JSON.stringify({ total: this.entries.length, entries: this.entries }, null, 2));
    return target;
  }
}

export const runReport = new RunReport();

/**
 * Takes a screenshot and attaches its path to the test report file — the
 * captureScreenShot() the brief asks the Reporter to provide.
 */
export async function captureScreenShot(page: Page, name: string): Promise<string> {
  ensureDirs();
  const file = path.join(SCREENSHOT_DIR, `${safeName(name)}-${readableTimestamp()}.png`);
  await page.screenshot({ path: file, fullPage: false });
  runReport.record(`screenshot captured: ${name}`, "passed", file);
  runReport.save();
  logger.info(`Screenshot captured: ${name}`);
  return file;
}

export { REPORT_DIR, SCREENSHOT_DIR };