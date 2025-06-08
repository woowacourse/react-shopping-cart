import * as S from "./styles/Layout.styled";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import ErrorProvider from "./contexts/ErrorContext";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import CartItemsProvider from "./pages/CartPage/contexts/CartItemsContext";

function App() {
  return (
    <S.Layout>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ErrorProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <CartItemsProvider>
                  <CartPage />
                </CartItemsProvider>
              }
            />
            <Route path="/order-confirm" element={<OrderConfirmPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
          </Routes>
        </ErrorProvider>
      </BrowserRouter>
    </S.Layout>
  );
}

export default App;
