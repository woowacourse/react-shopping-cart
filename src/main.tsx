import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./routes/index.tsx";
import { CartItemProvider } from "./contexts/CartItemContext.tsx";
import { ShippingProvider } from "./contexts/ShippingContext.tsx";
import { CouponProvider } from "./contexts/CouponContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartItemProvider>
      <ShippingProvider>
        <CouponProvider>
          <Router />
        </CouponProvider>
      </ShippingProvider>
    </CartItemProvider>
  </React.StrictMode>
);
