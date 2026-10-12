export function readableTimestamp(): string {
  const now = new Date();
  const pad = (value: number) => value.toString().padStart(2, "0");

  return (
    `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ` +
    `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
  );
}

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
