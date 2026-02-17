# Sprint 1 Retrospective

## What went well
- Breaking work into small commits made it easy to track progress.
- Starting with reducer unit tests reduced risk before adding UI tests.
- A simple CI workflow (lint + test + build) gives fast feedback.

## What didn’t go well
- UI tests initially failed due to ambiguous text matches (prices appear in multiple places).
- Test runner failed when there were zero test files (needed at least one test to pass).

## Improvements for Sprint 2 (commit to at least 2)
1. Scope UI assertions to specific regions (use `within(...)`) to avoid brittle tests.
2. Add basic logging/monitoring (structured logs + error boundary) to improve troubleshooting.
3. Add persistence-focused tests for localStorage rehydration and updates.
