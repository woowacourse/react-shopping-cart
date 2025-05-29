import * as S from "./styles/Layout.styled";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";

function App() {
  return (
    <S.Layout>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/order-confirm" element={<OrderConfirmPage />} />
        </Routes>
      </BrowserRouter>
    </S.Layout>
  );
}

export default App;
