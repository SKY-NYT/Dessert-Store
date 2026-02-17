# Monitoring & Logging Evidence (Sprint 2)

## What was added
- `src/observability/logger.ts`: structured event logging (non-production).
- `src/observability/metrics.ts`: in-memory counters with snapshot/reset.
- `src/observability/ErrorBoundary.tsx`: captures React render errors.
- `src/observability/globalErrorHandlers.ts`: captures global runtime/unhandled promise errors.

## Events covered
- Cart: add / decrement / remove / clear
- Order: confirm / new
- Storage: read failed / write failed
- UI: error boundary + global errors (`ui_error`)

## How to verify locally
- Run `npm run dev`.
- Interact with cart and order flows; observe dev console logs.
- Run `npm test` to see the storage read failure metric asserted.
