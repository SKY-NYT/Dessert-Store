import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { App } from "./App";
import type { CartItem } from "./types";
import { getMetric, resetMetrics } from "./observability/metrics";

function renderApp() {
  return render(
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>,
  );
}

describe("Dessert Store flows", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.style.overflow = "";
    resetMetrics();
  });

  it("does not show Confirm Order when cart is empty", () => {
    renderApp();
    const cartAside = screen.getByRole("complementary");
    expect(
      within(cartAside).queryByRole("button", { name: /confirm order/i }),
    ).toBeNull();
  });

  it("adds item to cart, updates totals, and confirms order", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(screen.getByText(/Your Cart \(0\)/)).toBeInTheDocument();

    const cartAside = screen.getByRole("complementary");

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addButtons.length).toBeGreaterThan(0);
    await user.click(addButtons[0]!);

    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();
    const orderTotalRow = within(cartAside)
      .getByText(/Order Total/i)
      .closest("div");
    expect(orderTotalRow).not.toBeNull();
    expect(
      within(orderTotalRow as HTMLElement).getByText("$6.50"),
    ).toBeInTheDocument();

    await user.click(
      within(cartAside).getByRole("button", { name: /confirm order/i }),
    );

    expect(await screen.findByText(/Order Confirmed/i)).toBeInTheDocument();

    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button", { name: /start new order/i }));

    expect(screen.getByText(/Your Cart \(0\)/)).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("unset");
  });

  it("increments and decrements quantity from the product stepper", async () => {
    const user = userEvent.setup();
    renderApp();

    const cartAside = screen.getByRole("complementary");

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addButtons.length).toBeGreaterThan(0);
    await user.click(addButtons[0]!);

    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /increase quantity/i }),
    );
    expect(screen.getByText(/Your Cart \(2\)/)).toBeInTheDocument();
    const orderTotalRow = within(cartAside)
      .getByText(/Order Total/i)
      .closest("div");
    expect(orderTotalRow).not.toBeNull();
    expect(
      within(orderTotalRow as HTMLElement).getByText("$13.00"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /decrease quantity/i }),
    );
    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();
  });

  it("decrementing from 1 removes the item and returns to empty cart state", async () => {
    const user = userEvent.setup();
    renderApp();

    const cartAside = screen.getByRole("complementary");
    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addButtons.length).toBeGreaterThan(0);
    await user.click(addButtons[0]!);

    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

    expect(screen.getByText(/Your Cart \(0\)/)).toBeInTheDocument();
    expect(
      within(cartAside).getByText(/Your added items will appear here/i),
    ).toBeInTheDocument();

    // Product card should return to "Add to Cart"
    expect(
      screen.getAllByRole("button", { name: /add to cart/i }).length,
    ).toBeGreaterThan(0);
  });

  it("removes an item via cart remove button", async () => {
    const user = userEvent.setup();
    renderApp();

    const cartAside = screen.getByRole("complementary");
    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addButtons.length).toBeGreaterThan(0);
    await user.click(addButtons[0]!);
    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();

    await user.click(
      within(cartAside).getByRole("button", { name: /remove item/i }),
    );

    expect(screen.getByText(/Your Cart \(0\)/)).toBeInTheDocument();
    expect(
      within(cartAside).getByText(/Your added items will appear here/i),
    ).toBeInTheDocument();
  });

  it("rehydrates cart from localStorage on load", () => {
    const seeded: CartItem[] = [
      {
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.5,
        quantity: 2,
        image: {
          thumbnail: "/assets/images/image-waffle-thumbnail.jpg",
          mobile: "/assets/images/image-waffle-mobile.jpg",
          tablet: "/assets/images/image-waffle-tablet.jpg",
          desktop: "/assets/images/image-waffle-desktop.jpg",
        },
      },
    ];
    localStorage.setItem("dessert_cart", JSON.stringify(seeded));

    renderApp();

    const cartAside = screen.getByRole("complementary");
    expect(screen.getByText(/Your Cart \(2\)/)).toBeInTheDocument();
    expect(within(cartAside).getByText(/Waffle with Berries/i)).toBeInTheDocument();
  });

  it("handles invalid localStorage JSON without crashing", () => {
    localStorage.setItem("dessert_cart", "not-json");

    expect(() => renderApp()).not.toThrow();
    expect(screen.getByText(/Your Cart \(0\)/)).toBeInTheDocument();
    expect(getMetric("storage_read_failed")).toBe(1);
  });

  it("ignores unexpected localStorage shapes without crashing", () => {
    localStorage.setItem("dessert_cart", JSON.stringify({ bad: "data" }));

    expect(() => renderApp()).not.toThrow();
    expect(screen.getByText(/Your Cart \(0\)/)).toBeInTheDocument();
  });
  it("persists cart updates to localStorage", async () => {
    const user = userEvent.setup();
    renderApp();

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addButtons.length).toBeGreaterThan(0);
    await user.click(addButtons[0]!);

    const stored = localStorage.getItem("dessert_cart");
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored as string) as CartItem[];
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({ name: "Waffle with Berries", quantity: 1 });
  });
});
