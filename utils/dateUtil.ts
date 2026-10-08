/** One timestamp format for file names: dd-MM-yyyy HH-mm-ss. */
export function readableTimestamp(): string {
  const now = new Date();
  const pad = (value: number) => value.toString().padStart(2, "0");

  return (
    `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ` +
    `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
  );
}

/** The timestamp the log and the report share: yyyy.MM.dd.HH.mm.ss. */
export function logTimestamp(): string {
  const now = new Date();
  const pad = (value: number) => value.toString().padStart(2, "0");

  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds())
  ].join(".");
}
