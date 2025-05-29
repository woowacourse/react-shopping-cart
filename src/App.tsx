import { BrowserRouter, Route, Routes } from 'react-router';
import CartPage from './pages/cart/CartPage';
import OrderConfirmPage from './pages/orderConfirm/OrderConfirmPage';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-products">
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
