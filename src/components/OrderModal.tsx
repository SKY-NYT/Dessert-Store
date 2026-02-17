import { Text } from "./Text";
import { Buttons } from "./Buttons";
import OrderConfirmedIcon from "../assets/images/icon-order-confirmed.svg?react";
import { useEffect } from "react";
import { useCart } from "../hooks/useCart";


export interface OrderModalProps {
  onNewOrder: () => void;
}

export function OrderModal({ onNewOrder }: OrderModalProps) {
  const { cart } = useCart(); 

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

 const handleCloseModal = () => {
  onNewOrder(); 
}; 

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-white w-148 rounded-t-3xl md:rounded-xl p-6  md:p-10 flex flex-col gap-8 h-fit overflow-y-auto">
        <div className="text-left">
          <div className="mb-6 flex justify-between"><OrderConfirmedIcon  /> <Buttons variant="remove" aria-label="Remove item" onClick={handleCloseModal}></Buttons> </div>
          
          <Text variant="p1" className="mb-2  ">
            Order Confirmed
          </Text>
          <Text variant="p4" className="text-preset-rose-500">
            We hope you enjoy your food!
          </Text>
        </div>

        <div className="bg-preset-rose-50 p-6 rounded-lg">
          <ul className="divide-y divide-preset-rose-100  overflow-y-auto mb-6 pr-2">
            {cart.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-center py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image.thumbnail}
                    alt={item.name}
                    className="w-12 h-12 rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <Text
                      variant="p4b"
                      className="text-preset-rose-900 truncate md:max-w-none"
                    >
                      {item.name}
                    </Text>
                    <div className="flex  gap-x-4 items-center">
                      <span className="text-preset-red font-bold text-sm">
                        {item.quantity}x
                      </span>
                      <span className="text-preset-rose-400 text-sm">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <Text variant="p3" className="font-bold text-preset-rose-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center pt-6 border-t border-preset-rose-100">
            <Text variant="p4" className="text-preset-rose-900">
              Order Total
            </Text>
            <Text
              variant="p2"
              className="text-2xl font-bold text-preset-rose-900"
            >
              ${total.toFixed(2)}
            </Text>
          </div>
        </div>

        <Buttons onClick={onNewOrder} className="w-full py-4 text-lg">
          <Text variant="p3">Start New Order</Text>
        </Buttons>
      </div>
    </div>
  );
}
