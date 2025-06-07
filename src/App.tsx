import { BrowserRouter, Route, Routes } from 'react-router';
import CartPage from './pages/cart/CartPage';
import OrderConfirmPage from './pages/orderConfirm/OrderConfirmPage';
import { CartProvider } from './global/contexts/CartContext';
import { CartSelectionProvider } from './global/contexts/CartSelectionContext';
import PaymentPage from './pages/payment/PaymentPage';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <CartProvider>
        <CartSelectionProvider>
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </CartSelectionProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
