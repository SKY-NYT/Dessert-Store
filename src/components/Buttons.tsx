import CartIcon from "../assets/images/icon-add-to-cart.svg?react";
import RemoveIcon from "../assets/images/icon-remove-item.svg?react";
import AddIcon from "../assets/images/icon-increment-quantity.svg?react";
import SubtractIcon from "../assets/images/icon-decrement-quantity.svg?react";
import { Text } from "./Text";
import React, { memo } from "react";

type ButtonVariant =
  | "default"
  | "remove"
  | "subtract"
  | "add"
  | "cartadd"
  | "stepper";

interface ButtonsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  count?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}
const VARIANTS: Record<ButtonVariant, string> = {
  default:
    "gap-2 py-4 px-6 w-[160px] h-[53px] rounded-full bg-preset-red text-white hover:bg-red-hover",
  remove:
    "border border-preset-rose-400 text-preset-rose-400 hover:border-preset-rose-900 hover:text-preset-rose-900 w-5 h-5 rounded-full",
  subtract:
    "border border-white text-white hover:bg-white hover:text-preset-red w-5 h-5 rounded-full",
  add: "border border-white text-white hover:bg-white hover:text-preset-red w-5 h-5 rounded-full",
  cartadd:
    "gap-2 p-3 w-[160px] h-[44px] bg-white text-black border border-preset-rose-400 rounded-full hover:text-preset-red hover:border-preset-red",
  stepper:
    "flex justify-between items-center p-3 w-[160px] h-[44px] rounded-full bg-preset-red text-white hover:bg-red-hover",
};

const ICONS: Partial<Record<ButtonVariant, React.ReactNode>> = {
  subtract: <SubtractIcon />,
  add: <AddIcon />,
  remove: <RemoveIcon className="w-3 h-3" />,
  cartadd: <CartIcon className="w-5 h-5" />,
};

const BASE_CLASS =
  "flex flex-row justify-center items-center transition-all duration-300 hover:cursor-pointer group";
const CIRCLE_BTN_CLASS =
  "flex items-center justify-center w-5 h-5 border border-white rounded-full transition-colors hover:bg-white hover:text-preset-red group";

export const Buttons = memo(function Buttons({
  children,
  variant = "default",
  onClick,
  count,
  onIncrement,
  onDecrement,
  className = "",
  ...props
}: ButtonsProps) {
  if (variant === "stepper") {
    return (
      <div className={`${VARIANTS.stepper} ${className}`}>
        <button
          type="button"
          onClick={onDecrement}
          aria-label="Decrease quantity"
          className={CIRCLE_BTN_CLASS}
        >
          <SubtractIcon className="w-3 h-3" />
        </button>
        <Text>{count}</Text>
        <button
          type="button"
          onClick={onIncrement}
          aria-label="Increase quantity"
          className={CIRCLE_BTN_CLASS}
        >
          <AddIcon className="w-3 h-3" />
        </button>
      </div>
    );
  }

  const buttonClasses = `${BASE_CLASS} ${VARIANTS[variant]} ${className}`;

  return (
    <button
      type="button"
      {...props}
      onClick={onClick}
      className={buttonClasses}
    >
      {ICONS[variant]}
      {children}
    </button>
  );
});
