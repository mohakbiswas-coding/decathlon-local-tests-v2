import fs from "fs";
import path from "path";
import type { Page } from "@playwright/test";
import { logTimestamp, readableTimestamp } from "./dateUtil";
import { logger } from "./logger";
import { safeName } from "./ScreenshotUtil";
import { envOrDefault } from "./envReader";

export type ReportEntry = { step: string; status: string; at: string; screenshot?: string };

const REPORT_DIR = path.join(process.cwd(), "reports");
const SCREENSHOT_DIR = path.join(REPORT_DIR, "screenshots");

function ensureDirs(): void {
  for (const dir of [REPORT_DIR, SCREENSHOT_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

class RunReport {
  private entries: ReportEntry[] = [];

  record(step: string, status = "passed", screenshot?: string): void {
    this.entries.push({ step, status, at: logTimestamp(), screenshot });
  }

  all(): ReportEntry[] {
    return [...this.entries];
  }

  steps(): string[] {
    return this.entries.map((entry) => entry.step);
  }

  attachments(): string[] {
    return this.entries.filter((entry) => entry.screenshot).map((entry) => entry.screenshot as string);
  }

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