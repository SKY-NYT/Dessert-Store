# Dessert Store (Product List with Cart)

A Vite + React + TypeScript web app that displays a dessert catalog, lets users manage a cart (add, decrement, remove, clear), and confirms orders in a modal.

## Features

- Browse dessert products and add items to the cart
- Update cart quantities (increment/decrement; decrement-to-zero removes)
- Remove individual items or clear the cart
- Confirm an order and start a new order
- Cart persistence via `localStorage` key `dessert_cart` with safe parsing + validation

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS
- Testing: Vitest + React Testing Library + jest-dom
- Linting: ESLint (flat config)
- CI: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build + preview

```bash
npm run build
npm run preview
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build production assets |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage (text + HTML) |

### Coverage

- Text table prints in the terminal when running `npm run test:coverage`.
- HTML report is generated at `coverage/index.html`.

## Architecture Notes

### Cart state + persistence

- State: React context + reducer (`src/context/CartContext.tsx`, `src/context/cartReducer.ts`)
- Persistence: `localStorage` key `dessert_cart`
  - Rehydration filters out invalid items
  - JSON parse failures fall back to an empty cart

### Order confirmation

- `src/App.tsx` controls `isOrderConfirmed` and shows `OrderModal` on confirm.
- Starting a new order clears the cart.

## Observability (Sprint 2)

Lightweight client-side monitoring is in `src/observability/`:

- `metrics.ts`: in-memory counters (e.g. cart/order/storage events)
- `logger.ts`: dev-only structured event logging
- `ErrorBoundary.tsx` + `globalErrorHandlers.ts`: catch and log UI errors

## Tests

- Unit: cart reducer tests
- Integration: core UI/cart flows + localStorage guards
- CI workflow test: validates `.github/workflows/ci.yml`

## CI

GitHub Actions workflow runs on push/PR to `main`:

`npm ci` → `npm run lint` → `npm test` → `npm run build`

## Agile & DevOps Assignment Artifacts

All Scrum/Agile documentation for the assignment is in `docs/`.

- Start here: `docs/README.md`

## Project Structure (high level)

```text
src/
	components/         UI components (cart, modal, list/cards)
	context/            Cart context + reducer
	hooks/              Custom hooks
	observability/      Logger/metrics/error handling
	test/               Test setup
	App.tsx             App composition + order confirmation
	main.tsx            App bootstrap
docs/                 Agile & DevOps artifacts
```
