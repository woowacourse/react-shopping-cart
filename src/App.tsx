import * as S from "./styles/Layout.styled";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import { ErrorProvider } from "./contexts/ErrorContext";
import ErrorPopup from "./components/common/Error/Popup";

function App() {
  return (
    <ErrorProvider>
      <S.Layout>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ErrorPopup />
          <Header />
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/order-confirm" element={<OrderConfirmPage />} />
          </Routes>
        </BrowserRouter>
      </S.Layout>
    </ErrorProvider>
  );
}

export default App;
