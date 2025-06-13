import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/cart/CartPage";
import PaymentSuccessPage from "./pages/payment-success/PaymentSuccessPage";
import { ROUTES } from "./shared/config/routes";
import OrderConfirmPage from "./pages/order-confirm/OrderConfirmPage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.ORDER_CONFIRM} element={<OrderConfirmPage />} />
      <Route path={ROUTES.PAYMENT_SUCCESS} element={<PaymentSuccessPage />} />
    </Routes>
  );
}

export default App;
