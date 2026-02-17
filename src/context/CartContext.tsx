import { createContext, useReducer, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { CartItem, Dessert } from "../types";
import { cartReducer } from "./cartReducer";

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
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("dessert_cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = useCallback(
    (product: Dessert) => dispatch({ type: "ADD_ITEM", payload: product }),
    [],
  );

  const removeItem = useCallback(
    (name: string) => dispatch({ type: "REMOVE_ITEM", payload: name }),
    [],
  );

  const decrementItem = useCallback(
    (name: string) => dispatch({ type: "DECREMENT_ITEM", payload: name }),
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, decrementItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
