import "./App.css";
import { Route, Routes } from "react-router";
import { PAGE_URL } from "./constants/PageUrl";
import Cart from "./page/cart/Cart";
import OrderConfirmation from "./page/orderConfirmation/OrderConfirmation";
import PaymentConfirmation from "./page/paymentConfirmation/PaymentConfirmation";

function App() {
  return (
    <Routes>
      <Route path={PAGE_URL.HOME} element={<Cart />} />
      <Route
        path={PAGE_URL.ORDER_CONFIRMATION}
        element={<OrderConfirmation />}
      />
      <Route
        path={PAGE_URL.PAYMENT_CONFIRMATION}
        element={<PaymentConfirmation />}
      />
    </Routes>
  );
}

export default App;
