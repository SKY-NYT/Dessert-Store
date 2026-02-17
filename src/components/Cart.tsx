import { Text } from "./Text";
import EmptyCartImage from "../assets/images/illustration-empty-cart.svg?react";
import CarbonIcon from "../assets/images/icon-carbon-neutral.svg?react";
import { Buttons } from "./Buttons";
import type { CartItem } from "../types";
import { useCart } from "../hooks/useCart";
import { useMemo, memo, useCallback } from "react";

interface CartProps {
  onConfirm: () => void;
}

export const Cart = memo(function Cart({ onConfirm }: CartProps) {
  const { cart, removeItem } = useCart();
  
  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  const orderTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const handleRemove = useCallback(
    (name: string) => {
      removeItem(name);
    },
    [removeItem],
  );

  return (
    <aside className="flex flex-col bg-white rounded-xl gap-6  p-6 w-full lg:w-96 flex-none  lg:h-fit">
      <div>
        <Text as="h2" variant="p2" className="text-preset-red ">
          Your Cart ({totalItems})
        </Text>
      </div>
      {cart.length === 0 ? (
        <div className=" h-48  rounded-md py-4 flex flex-col gap-4 justify-center items-center">
          <EmptyCartImage />
          <div>
            <Text
              as="p"
              variant="p3"
              className=" text-preset-rose-500 text-center mt-4"
            >
              Your added items will appear here
            </Text>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <ul className="divide-y divide-preset-rose-100 border-b border-preset-rose-100">
            {cart.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-center p-4"
              >
                <div className="flex flex-col gap-2">
                  <Text variant="p4b">{item.name}</Text>
                  <div className="flex gap-4 items-center">
                    <Text variant="p4b" className="text-preset-red ">
                      {item.quantity}x
                    </Text>
                    <Text variant="p4" className="text-preset-rose-400">
                      @ ${item.price.toFixed(2)}
                    </Text>
                    <Text variant="p4b" className="text-preset-rose-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </div>
                </div>

                <Buttons
                  variant="remove"
                  aria-label="Remove item"
                  onClick={() => handleRemove(item.name)}
                ></Buttons>
              </li>
            ))}
          </ul>

          <div className="flex justify-between   items-center ">
            <Text variant="p4">Order Total</Text>
            <Text variant="p2">${orderTotal.toFixed(2)}</Text>
          </div>

          <div className=" bg-preset-rose-50 p-4 rounded-lg flex flex-row items-center justify-center gap-2">
            <CarbonIcon />
            <Text variant="p4">
              This is a <span className="font-bold">carbon-neutral</span>{" "}
              delivery
            </Text>
          </div>
          <Buttons className="w-full " onClick={onConfirm}>
            Confirm Order
          </Buttons>
        </div>
      )}
    </aside>
  );
});
