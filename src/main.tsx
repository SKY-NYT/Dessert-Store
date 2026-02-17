import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { CartProvider } from "./context/CartContext";
import { ErrorBoundary } from "./observability/ErrorBoundary";
import { setupGlobalErrorHandlers } from "./observability/globalErrorHandlers";

setupGlobalErrorHandlers();

const rootElement = document.getElementById("root");
createRoot(rootElement!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>,
);
