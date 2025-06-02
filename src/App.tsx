import { BrowserRouter, Route, Routes } from 'react-router';
import CartPage from './pages/cart/CartPage';
import OrderConfirmPage from './pages/orderConfirm/OrderConfirmPage';
import { CartProvider } from './components/features/cart/contexts/CartContext';
import { CartSelectionProvider } from './components/features/cart/contexts/CartSelectionContext';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <CartProvider>
        <CartSelectionProvider>
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmPage />} />
          </Routes>
        </CartSelectionProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
