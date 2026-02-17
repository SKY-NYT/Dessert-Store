import type { CartItem, Dessert } from "../types";

export type CartAction =
  | { type: "ADD_ITEM"; payload: Dessert }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "DECREMENT_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

export const cartReducer = (
  state: CartItem[],
  action: CartAction,
): CartItem[] => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find(
        (item) => item.name === action.payload.name,
      );
      if (existingItem) {
        return state.map((item) =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "DECREMENT_ITEM": {
      return state
        .map((item) =>
          item.name === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.name !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
