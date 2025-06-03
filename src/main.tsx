import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./routes/index.tsx";
import { CartItemProvider } from "./contexts/CartItemProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartItemProvider>
      <Router />
    </CartItemProvider>
  </React.StrictMode>
);
