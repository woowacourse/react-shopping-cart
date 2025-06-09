import CartPage from "./pages/CartPage/CartPage";
import CheckPaymentPage from "./pages/CheckPaymentPage/CheckPaymentPage";
import OrderCompletePage from "./pages/OrderCompletePage/OrderCompletePage";
import { CartProvider } from "./stores/CartContext";
import { SelectProvider } from "./stores/SelectContext";
import { CouponSelectProvider } from "./stores/CouponContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <SelectProvider>
        <CouponSelectProvider>
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/order-complete" element={<OrderCompletePage />} />
            <Route path="/check-payment" element={<CheckPaymentPage />} />
          </Routes>
        </CouponSelectProvider>
      </SelectProvider>
    </CartProvider>
  );
}

export default App;
