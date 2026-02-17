# Sprint 2 Review (Monitoring & Logging)

## Sprint Goal
Add lightweight monitoring/logging to improve observability of cart + ordering flows and capture runtime errors.

## Delivered
- Client-side event logging for cart and order actions (dev/test only).
- Simple in-memory counters (metrics) for key events.
- Guarded localStorage read/write with failure signals.
- ErrorBoundary + global error handlers for unexpected UI/runtime errors.

## Evidence
- CI run on this branch: lint + tests pass.
- Metrics/logging code: see `src/observability/*`.
- Tests updated to assert storage read failure metric increments.

## Demo Script
1. Add item to cart, increment/decrement quantity, remove item.
2. Confirm Order, then Start New Order.
3. Refresh page to confirm cart persistence still works.

## Acceptance Criteria Check
- Observability added without changing normal UX.
- Logging does not crash the app if console/storage fails.
- CI remains green.
