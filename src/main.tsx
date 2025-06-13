import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./routes/index.tsx";
import { CartItemProvider } from "./contexts/carItem/CartItemProvider.tsx";
import { SelectedCartItemProvider } from "./contexts/selectedCartItem/SelectedCartItemProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartItemProvider>
      <SelectedCartItemProvider>
        <Router />
      </SelectedCartItemProvider>
    </CartItemProvider>
  </React.StrictMode>
);
