type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEventName =
  | "cart_add"
  | "cart_decrement"
  | "cart_remove"
  | "cart_clear"
  | "order_confirm"
  | "order_new"
  | "storage_read_failed"
  | "storage_write_failed"
  | "ui_error";

export type LogPayload = Record<string, unknown>;

export function logEvent(
  name: LogEventName,
  payload: LogPayload = {},
  level: LogLevel = "info",
) {
  // Keep logging non-invasive: only log during local development.
  if (import.meta.env.MODE !== "development") return;

  const timestamp = new Date().toISOString();
  const message = `[DessertStore] ${name}`;

  try {
    const fn = console[level] ?? console.info;
    fn(message, { timestamp, ...payload });
  } catch {
    // Never let logging break the app.
  }
}
