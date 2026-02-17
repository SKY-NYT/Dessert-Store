import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { App } from "./App";

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
  });

  it("adds item to cart, updates totals, and confirms order", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(screen.getByText(/Your Cart \(0\)/)).toBeInTheDocument();

    const cartAside = screen.getByRole("complementary");

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    await user.click(addButtons[0]);

    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();
    const orderTotalRow = within(cartAside)
      .getByText(/Order Total/i)
      .closest("div");
    expect(orderTotalRow).not.toBeNull();
    expect(within(orderTotalRow as HTMLElement).getByText("$6.50")).toBeInTheDocument();

    await user.click(within(cartAside).getByRole("button", { name: /confirm order/i }));

    expect(
      await screen.findByText(/Order Confirmed/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /start new order/i }));

    expect(screen.getByText(/Your Cart \(0\)/)).toBeInTheDocument();
  });

  it("increments and decrements quantity from the product stepper", async () => {
    const user = userEvent.setup();
    renderApp();

    const cartAside = screen.getByRole("complementary");

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    await user.click(addButtons[0]);

    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(screen.getByText(/Your Cart \(2\)/)).toBeInTheDocument();
    const orderTotalRow = within(cartAside)
      .getByText(/Order Total/i)
      .closest("div");
    expect(orderTotalRow).not.toBeNull();
    expect(within(orderTotalRow as HTMLElement).getByText("$13.00")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();
  });
});
