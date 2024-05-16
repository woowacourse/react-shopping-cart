import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CartPage from "./pages/CartPage";
import { PATH } from "./constants/path";
import OrderSummaryPage from "./pages/OrderSummaryPage";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path={PATH.cart} element={<CartPage />} />
          <Route path={PATH.orderSummary} element={<OrderSummaryPage />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
