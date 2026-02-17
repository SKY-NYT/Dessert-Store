import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { CartProvider } from "./context/CartContext";

const rootElement = document.getElementById("root");
createRoot(rootElement!).render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>,
);
