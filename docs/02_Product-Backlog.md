# Product Backlog — Dessert Store

Scales used:

- Priority: P0 (highest) → P2 (lower)
- Estimation: story points (SP) using relative sizing

## Backlog

### 1) Add desserts to cart and increase quantity
- Priority: P0
- Estimate: 3 SP
- User story: As a user, I can add a dessert to my cart and increase its quantity so I can order multiple portions.
- Acceptance criteria:
  - Clicking "Add to Cart" adds the item to the cart with quantity 1.
  - When quantity > 0, the product card shows a stepper with "Increase" and "Decrease".
  - Increasing quantity updates the cart count and totals.

### 2) Decrease quantity and remove at zero
- Priority: P0
- Estimate: 3 SP
- User story: As a user, I can decrease quantity so I can correct my order.
- Acceptance criteria:
  - Clicking "Decrease quantity" reduces the quantity by 1.
  - If quantity becomes 0, the item disappears from the cart.
  - When the cart becomes empty, the empty-cart message is shown.

### 3) Remove an item from the cart
- Priority: P0
- Estimate: 2 SP
- User story: As a user, I can remove an item completely so I can quickly discard something I don’t want.
- Acceptance criteria:
  - Clicking "Remove item" deletes the item from the cart.
  - Cart count and totals update immediately.

### 4) Confirm order and show order summary modal
- Priority: P0
- Estimate: 3 SP
- User story: As a user, I can confirm my order so I can see a final summary before starting a new order.
- Acceptance criteria:
  - Clicking "Confirm Order" shows an "Order Confirmed" modal.
  - The modal lists each item, its quantity, and line total.
  - The modal shows the final order total.

### 5) Persist cart across refresh
- Priority: P1
- Estimate: 2 SP
- User story: As a user, my cart is saved so I don’t lose it when I refresh the page.
- Acceptance criteria:
  - Cart loads initial state from `localStorage` key `dessert_cart`.
  - Updates write back to `localStorage`.

### 6) CI pipeline runs lint, tests, and build
- Priority: P0
- Estimate: 2 SP
- User story: As a developer, I have CI so I can catch problems before merging/deploying.
- Acceptance criteria:
  - GitHub Actions runs on push and pull requests.
  - CI runs `npm ci`, `npm run lint`, `npm test`, and `npm run build`.
  - CI fails when lint or tests fail.

### 7) Basic monitoring/logging for key events
- Priority: P1
- Estimate: 2 SP
- User story: As a developer, I can observe key actions/errors so I can troubleshoot issues faster.
- Acceptance criteria:
  - Key actions (add/remove/confirm/new order) produce structured logs.
  - Errors are captured via an error boundary and logged.

### 8) Evidence artifacts for sprint reviews and retrospectives
- Priority: P0
- Estimate: 2 SP
- User story: As a student, I can present clear evidence so the assessor can verify my Agile + DevOps practice.
- Acceptance criteria:
  - Sprint Review and Retrospective docs exist for Sprint 1 and Sprint 2.
  - CI/test evidence docs include links/placeholders for screenshots or logs.
