import { DessertList } from "./components/DessertList";
import { Cart } from "./components/Cart";
import { useState, useMemo, useCallback } from "react";
import { OrderModal } from "./components/OrderModal";
import { useCart } from "./hooks/useCart";
import data from "./data.json";
import { incrementMetric } from "./observability/metrics";
import { logEvent } from "./observability/logger";

export function App() {
  const { clearCart } = useCart();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleConfirmOrder = useCallback(() => {
    incrementMetric("order_confirm");
    logEvent("order_confirm", {}, "info");
    setIsOrderConfirmed(true);
  }, []);

  const handleStartNewOrder = useCallback(() => {
    incrementMetric("order_new");
    logEvent("order_new", {}, "info");
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
