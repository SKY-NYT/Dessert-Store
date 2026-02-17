# Sprint 2 Retrospective

## What went well
- Observability added with minimal surface area and low risk.
- Tests and CI stayed green after instrumentation.

## What didn’t go well
- Need clearer separation between product tests and observability tests as the suite grows.

## Improvements / Action Items
- Add one focused unit test for `ErrorBoundary` fallback behavior.
- Consider a small abstraction for storage access so read/write failures are consistently tracked.
