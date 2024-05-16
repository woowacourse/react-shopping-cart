import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CartPage from "./pages/CartPage";
import { PATH } from "./constants/path";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ErrorBoundary fallbackRender={({ error }) => error.message}>
          <Routes>
            <Route path={PATH.cart} element={<CartPage />} />
            <Route path={PATH.orderSummary} element={<OrderSummaryPage />} />
          </Routes>
        </ErrorBoundary>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
