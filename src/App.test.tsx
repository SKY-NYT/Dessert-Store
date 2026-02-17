import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { App } from "./App";
import type { CartItem } from "./types";

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
    await user.click(addButtons[0]);

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

  it("removes item from cart and returns to empty state", async () => {
    const user = userEvent.setup();
    renderApp();

    const cartAside = screen.getByRole("complementary");
    await user.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);

    expect(screen.getByText(/Your Cart \(1\)/)).toBeInTheDocument();

    await user.click(within(cartAside).getByRole("button", { name: /remove item/i }));

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

  it("persists cart updates to localStorage", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);

    const stored = localStorage.getItem("dessert_cart");
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored as string) as CartItem[];
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({ name: "Waffle with Berries", quantity: 1 });
  });
});
