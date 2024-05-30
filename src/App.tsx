import "./App.css";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";

import { ROUTE_PATH } from "./constants/routePath";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ErrorBoundary fallbackRender={({ error }) => error.message}>
          <Routes>
            <Route path={ROUTE_PATH.cart} element={<CartPage />} />
            <Route path={ROUTE_PATH.payment} element={<PaymentPage />} />
            <Route path={ROUTE_PATH.checkout} element={<CheckoutPage />} />
          </Routes>
        </ErrorBoundary>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
