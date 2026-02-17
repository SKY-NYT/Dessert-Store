export type MetricName =
  | "cart_add"
  | "cart_decrement"
  | "cart_remove"
  | "cart_clear"
  | "order_confirm"
  | "order_new"
  | "storage_read_failed"
  | "storage_write_failed"
  | "ui_error";

const counters = new Map<MetricName, number>();

export function incrementMetric(name: MetricName, by = 1) {
  counters.set(name, (counters.get(name) ?? 0) + by);
}

export function getMetric(name: MetricName) {
  return counters.get(name) ?? 0;
}

export function snapshotMetrics() {
  const snapshot: Partial<Record<MetricName, number>> = {};
  for (const [name, value] of counters.entries()) {
    snapshot[name] = value;
  }
  return snapshot;
}

export function resetMetrics() {
  counters.clear();
}
