import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage";
import { CartProvider } from "./stores/CartContext";
import { SelectProvider } from "./stores/SelectContext";
import OrderCompletePage from "./pages/OrderCompletePage/OrderCompletePage";
import { CouponProvider } from "./stores/CouponContext";
import OrderCheckPage from "./pages/OrderCheckPage/OrderCheckPage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <SelectProvider>
          <CouponProvider>
            <Routes>
              <Route path="/" element={<CartPage />} />
              <Route path="/check" element={<OrderCheckPage />} />
              <Route path="/complete" element={<OrderCompletePage />} />
            </Routes>
          </CouponProvider>
        </SelectProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
