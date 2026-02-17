import { DessertList } from "./components/DessertList";
import { Cart } from "./components/Cart";
import { useState, useMemo, useCallback } from "react";
import { OrderModal } from "./components/OrderModal";
import { useCart } from "./hooks/useCart";
import data from "./data.json";

export function App() {
  const { clearCart } = useCart();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleConfirmOrder = useCallback(() => {
    setIsOrderConfirmed(true);
  }, []);

  const handleStartNewOrder = useCallback(() => {
    clearCart();
    setIsOrderConfirmed(false);
  }, [clearCart]);


  return (
    <div className="bg-preset-rose-50 ">
      <div className="p-6 md:p-10 lg:py-22 lg:px-10 max-w-1440 mx-auto h-auto min-h-screen ">
        <main className="flex flex-col lg:flex-row gap-8">
          <DessertList data={data} />

          <Cart onConfirm={handleConfirmOrder} />
        </main>
      </div>

      {isOrderConfirmed && (
        <OrderModal
          onNewOrder={handleStartNewOrder}
        />
      )}
    </div>
  );
}
