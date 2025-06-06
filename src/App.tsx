import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PaymentComplete } from "./domains/paymentComplete/page/PaymentComplete";
import { ShoppingCart } from "./domains/shopping-cart/page/shoppingCart";
import { CartProvider } from "./domains/shopping-cart/context/cartProvider";

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename="/react-shopping-cart">
        <Routes>
          <Route path="/" element={<ShoppingCart />}></Route>
          <Route path="/confirm" element={<PaymentComplete />}></Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
