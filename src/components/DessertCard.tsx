import { memo, useCallback } from "react";
import { Text } from "./Text";
import { Buttons } from "./Buttons";
import type { DessertCardProps } from "../types";
import { useCart } from "../hooks/useCart";

export const DessertCard = memo(function DessertCard({ product }: DessertCardProps) {
  const { addItem, decrementItem, cart } = useCart();

  const quantity = cart.find(item => item.name === product.name)?.quantity ?? 0;
  
  const handleAddProduct = useCallback(() => {
    addItem(product);
  }, [addItem, product]);

  const handleRemoveProduct = useCallback(() => {
    decrementItem(product.name);
  }, [decrementItem, product.name]);
  return (
    <div className="flex flex-col gap-10 w-full h-auto">
      <div className="relative group">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <img
            src={product.image.mobile}
            alt={product.name}
            className={`w-full h-auto object-cover rounded-xl border-2 transition-all duration-300 ${quantity > 0 ? "border-preset-red" : "border-transparent"}`}
          />
        </picture>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full flex justify-center">
          {quantity > 0 ? (
            <Buttons
              variant="stepper"
              count={quantity}
              onIncrement={handleAddProduct}
              onDecrement={handleRemoveProduct}
            />
          ) : (
            <Buttons variant="cartadd" onClick={handleAddProduct}>
              <Text variant="p4b">Add to Cart</Text>
            </Buttons>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Text as="p" variant="p4" className="text-preset-rose-500">
          {product.category}
        </Text>
        <Text as="p" variant="p3" className="text-preset-rose-900">
          {product.name}
        </Text>
        <Text as="p" variant="p3" className="text-preset-red">
          ${product.price.toFixed(2)}
        </Text>
      </div>
    </div>
  );
});
