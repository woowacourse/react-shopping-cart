import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MobileLayout } from "./components/common";
import { APIDataProvider } from "./context/APIDataProvider";
import { ToastProvider } from "./context/ToastProvider";
import reset from "./style/reset";
import OrderConfirmPage from "./pages/order-confirm/OrderConfirmPage";
import { OrderListProvider } from "./context/OrderListProvider";
import ShoppingCartPage from "./pages/shopping-cart/ShoppingCartPage";
import { getBrowserBaseUrl } from "./utils/getBrowserBaseUrl";
import ErrorBoundary from "./components/features/error-boundary/ErrorBoundary";
import SuccessConfirmPage from "./pages/success-confirm/SuccessConfirmPage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <MobileLayout>
        <ToastProvider>
          <APIDataProvider>
            <OrderListProvider>
              <BrowserRouter basename={getBrowserBaseUrl()}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ErrorBoundary>
                        <ShoppingCartPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/order-confirm"
                    element={
                      <ErrorBoundary>
                        <OrderConfirmPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <div>
                        <h1>Page Not Found</h1>
                      </div>
                    }
                  />
                  <Route
                    path="/success-confirm"
                    element={
                      <ErrorBoundary>
                        <SuccessConfirmPage />
                      </ErrorBoundary>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </OrderListProvider>
          </APIDataProvider>
        </ToastProvider>
      </MobileLayout>
    </>
  );
}

export default App;
