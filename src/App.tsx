import * as S from "./styles/Layout.styled";
import { BrowserRouter, Route, Routes } from "react-router";
import CartPage from "./pages/CartPage";
import PaymentConfirmPage from "./pages/PaymentConfirmPage";
import { ErrorProvider } from "./contexts/ErrorContext";
import ErrorPopup from "./components/common/Error/Popup";

function App() {
  return (
    <ErrorProvider>
      <S.Layout>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ErrorPopup />
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/payment-confirm" element={<PaymentConfirmPage />} />
          </Routes>
        </BrowserRouter>
      </S.Layout>
    </ErrorProvider>
  );
}

export default App;
