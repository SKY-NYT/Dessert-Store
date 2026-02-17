import { incrementMetric } from "./metrics";
import { logEvent } from "./logger";

export function setupGlobalErrorHandlers() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    incrementMetric("ui_error");
    logEvent(
      "ui_error",
      {
        source: "window.error",
        message: event.message,
      },
      "error",
    );
  });

  window.addEventListener("unhandledrejection", (event) => {
    incrementMetric("ui_error");
    logEvent(
      "ui_error",
      {
        source: "window.unhandledrejection",
        reason: String(event.reason),
      },
      "error",
    );
  });
}
