# Sprint 1 Review — What Was Delivered

## Sprint Goal
Deliver the first increment of reliable working software by validating core cart/order flows with automated tests and establishing a CI pipeline.

## Completed Items
- CI pipeline runs lint, tests, and build
- Core cart and ordering flows covered by automated tests

## Evidence
- CI workflow file: `.github/workflows/ci.yml`
- Tests added:
  - `src/context/cartReducer.test.ts`
  - `src/App.test.tsx`

## Demo Notes (what to show)
- Add an item to cart from a dessert card
- Increase/decrease quantity using the stepper
- Confirm order to open the order modal
- Start new order to clear cart

## Screenshots / Logs to attach
- [ ] Screenshot of successful GitHub Actions run
- [ ] Screenshot of `npm test` passing locally
