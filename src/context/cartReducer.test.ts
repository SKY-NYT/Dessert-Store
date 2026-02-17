import { describe, expect, it } from "vitest";
import { cartReducer } from "./cartReducer";
import type { CartItem, Dessert } from "../types";

const waffle: Dessert = {
  name: "Waffle with Berries",
  category: "Waffle",
  price: 6.5,
  image: {
    thumbnail: "/assets/images/image-waffle-thumbnail.jpg",
    mobile: "/assets/images/image-waffle-mobile.jpg",
    tablet: "/assets/images/image-waffle-tablet.jpg",
    desktop: "/assets/images/image-waffle-desktop.jpg",
  },
};

describe("cartReducer", () => {
  it("adds a new item with quantity 1", () => {
    const next = cartReducer([], { type: "ADD_ITEM", payload: waffle });
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({ name: waffle.name, quantity: 1 });
  });

  it("increments quantity when adding existing item", () => {
    const state: CartItem[] = [{ ...waffle, quantity: 1 }];
    const next = cartReducer(state, { type: "ADD_ITEM", payload: waffle });
    expect(next).toHaveLength(1);
    expect(next[0]).toBeDefined();
    expect(next[0]!.quantity).toBe(2);
  });

  it("decrements quantity and keeps item when quantity stays above 0", () => {
    const state: CartItem[] = [{ ...waffle, quantity: 2 }];
    const next = cartReducer(state, {
      type: "DECREMENT_ITEM",
      payload: waffle.name,
    });
    expect(next).toHaveLength(1);
    expect(next[0]).toBeDefined();
    expect(next[0]!.quantity).toBe(1);
  });

  it("decrements quantity and removes item at 0", () => {
    const state: CartItem[] = [{ ...waffle, quantity: 1 }];
    const next = cartReducer(state, {
      type: "DECREMENT_ITEM",
      payload: waffle.name,
    });
    expect(next).toHaveLength(0);
  });

  it("removes an item by name", () => {
    const state: CartItem[] = [{ ...waffle, quantity: 1 }];
    const next = cartReducer(state, {
      type: "REMOVE_ITEM",
      payload: waffle.name,
    });
    expect(next).toHaveLength(0);
  });

  it("clears the cart", () => {
    const state: CartItem[] = [{ ...waffle, quantity: 3 }];
    const next = cartReducer(state, { type: "CLEAR_CART" });
    expect(next).toEqual([]);
  });
});
