import * as S from "./styles/Layout.styled";
import { BrowserRouter, Route, Routes } from "react-router";
import CartPage from "./pages/cart";
import OrderPage from "./pages/order";
import PaymentPage from "./pages/payment";
import NotFoundPage from "./pages/notFound";
import ErrorPopup from "./shared/components/common/Error/Popup";
import { ErrorProvider } from "./shared/contexts/ErrorContext";

function App() {
  return (
    <ErrorProvider>
      <S.Layout>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ErrorPopup />
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/order-confirm" element={<OrderPage />} />
            <Route path="/payment-confirm" element={<PaymentPage />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </S.Layout>
    </ErrorProvider>
  );
}

export default App;
