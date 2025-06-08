import * as S from "./styles/Layout.styled";
import { BrowserRouter, Route, Routes } from "react-router";
import CartPage from "./pages/cart";
import PaymentConfirmPage from "./pages/PaymentConfirmPage";
import { ErrorProvider } from "./contexts/ErrorContext";
import ErrorPopup from "./components/common/Error/Popup";
import OrderPage from "./pages/order";
import { CartProvider } from "./pages/cart/contexts/CartContext";
import { OrderProvider } from "./pages/order/contexts/OrderContext";

function App() {
  return (
    <ErrorProvider>
      <S.Layout>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ErrorPopup />
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <CartPage />
                </CartProvider>
              }
            />
            <Route
              path="/order-confirm"
              element={
                <OrderProvider>
                  <OrderPage />
                </OrderProvider>
              }
            />
            <Route path="/payment-confirm" element={<PaymentConfirmPage />} />
          </Routes>
        </BrowserRouter>
      </S.Layout>
    </ErrorProvider>
  );
}

export default App;
