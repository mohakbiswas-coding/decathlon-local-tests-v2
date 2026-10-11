import fs from "fs";
import path from "path";
import { logTimestamp, readableTimestamp } from "./dateUtil";


const LOG_DIR = path.join(process.cwd(), "logs");
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

export const LOG_FILE_PATH = path.join(LOG_DIR, `execution-${readableTimestamp()}.log`);

export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

const lines: string[] = [];
const messages: { level: LogLevel; message: string }[] = [];

function write(level: LogLevel, message: string): void {
  const entry = `[${level}] ${logTimestamp()} ${message}`;
  lines.push(entry);
  messages.push({ level, message });
  fs.appendFileSync(LOG_FILE_PATH, `${entry}\n`);
  console.log(entry);
}

export const logger = {
  info: (message: string) => write("INFO", message),
  warn: (message: string) => write("WARN", message),
  error: (message: string) => write("ERROR", message),
  debug: (message: string) => write("DEBUG", message),

  /** The full formatted lines. */
  lines: (): string[] => [...lines],

  /** The action messages alone, without the level or the time. */
  messages: (): string[] => messages.map((entry) => entry.message),

  /** The action messages written at one level. */
  messagesAt: (level: LogLevel): string[] =>
    messages.filter((entry) => entry.level === level).map((entry) => entry.message)
};

/** The newest log file in the logs folder — never the alphabetically first. */
export function latestLogFile(): string {
  const files = fs
    .readdirSync(LOG_DIR)
    .filter((file) => file.endsWith(".log"))
    .map((file) => ({ file, time: fs.statSync(path.join(LOG_DIR, file)).mtimeMs }))
    .sort((a, b) => b.time - a.time);

  if (files.length === 0) throw new Error("No log file was written under logs/");
  return path.join(LOG_DIR, files[0].file);
}
