import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage";
import { CartProvider } from "./stores/CartContext";
import { SelectProvider } from "./stores/SelectContext";
import OrderCompletePage from "./pages/OrderCompletePage/OrderCompletePage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <SelectProvider>
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/complete" element={<OrderCompletePage />} />
          </Routes>
        </SelectProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
