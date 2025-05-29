import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MobileLayout } from "./components/common";
import { APIDataProvider } from "./context/APIDataProvider";
import { ToastProvider } from "./context/ToastProvider";
import reset from "./global/style/reset";
import OrderConfirmPage from "./pages/order-confirm/OrderConfirmPage";
import { OrderListProvider } from "./pages/shopping-cart/context/OrderListProvider";
import ShoppingCartPage from "./pages/shopping-cart/ShoppingCartPage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <MobileLayout>
        <ToastProvider>
          <APIDataProvider>
            <OrderListProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<ShoppingCartPage />} />
                  <Route path="/order-confirm" element={<OrderConfirmPage />} />
                  <Route
                    path="*"
                    element={
                      <div>
                        <h1>Page Not Found</h1>
                      </div>
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
