import { createContext, useReducer, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { CartItem, Dessert } from "../types";
import { cartReducer } from "./cartReducer";
import { incrementMetric } from "../observability/metrics";
import { logEvent } from "../observability/logger";

export interface CartContextType {
  cart: CartItem[];
  addItem: (product: Dessert) => void;
  removeItem: (name: string) => void;
  decrementItem: (name: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem("dessert_cart");
    if (!localData) return [];

    try {
      const parsed = JSON.parse(localData);
      if (!Array.isArray(parsed)) return [];

      return parsed.filter((item: unknown) => {
        if (typeof item !== "object" || item === null) return false;
        const record = item as Record<string, unknown>;
        const image = record.image as Record<string, unknown> | undefined;

        return (
          typeof record.name === "string" &&
          typeof record.category === "string" &&
          typeof record.price === "number" &&
          typeof record.quantity === "number" &&
          record.quantity > 0 &&
          typeof image === "object" &&
          image !== null &&
          typeof image.thumbnail === "string" &&
          typeof image.mobile === "string" &&
          typeof image.tablet === "string" &&
          typeof image.desktop === "string"
        );
      });
    } catch {
      incrementMetric("storage_read_failed");
      logEvent("storage_read_failed", { key: "dessert_cart" }, "warn");
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("dessert_cart", JSON.stringify(cart));
    } catch {
      incrementMetric("storage_write_failed");
      logEvent(
        "storage_write_failed",
        { key: "dessert_cart", items: cart.length },
        "warn",
      );
      // ignore write failures (e.g., storage full / blocked)
    }
  }, [cart]);

  const addItem = useCallback((product: Dessert) => {
    incrementMetric("cart_add");
    logEvent(
      "cart_add",
      { name: product.name, price: product.price, category: product.category },
      "info",
    );
    dispatch({ type: "ADD_ITEM", payload: product });
  }, []);

  const removeItem = useCallback((name: string) => {
    incrementMetric("cart_remove");
    logEvent("cart_remove", { name }, "info");
    dispatch({ type: "REMOVE_ITEM", payload: name });
  }, []);

  const decrementItem = useCallback((name: string) => {
    incrementMetric("cart_decrement");
    logEvent("cart_decrement", { name }, "info");
    dispatch({ type: "DECREMENT_ITEM", payload: name });
  }, []);

  const clearCart = useCallback(() => {
    incrementMetric("cart_clear");
    logEvent("cart_clear", {}, "info");
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, decrementItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
