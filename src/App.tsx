import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import "./App.css";
import { Suspense } from "react";
import PaymentConfirmationPage from "./pages/PaymentConfirmationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CartPage />
              </Suspense>
            }
          />
          <Route
            path="/orderConfirmation"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PaymentConfirmationPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
