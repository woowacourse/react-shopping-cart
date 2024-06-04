import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "@/pages/Cart.tsx";
import NotFound from "./pages/NotFound";
import OrderConfirm from "./pages/OrderConfirm";
import PaymentConfirm from "./pages/PaymentConfirm";

export default function Router() {
  return (
    <BrowserRouter basename="/react-shopping-cart/dist">
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="/payment-confirm" element={<PaymentConfirm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
