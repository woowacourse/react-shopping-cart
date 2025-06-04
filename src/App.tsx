import { BrowserRouter, Route, Routes } from 'react-router';
import CartPage from './pages/cart/CartPage';
import OrderCheckPage from './pages/orderCheck/OrderCheckPage';
import PaymentCheckPage from './pages/paymentCheck/PaymentCheckPage';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/order-check" element={<OrderCheckPage />} />
        <Route path="/payment-check" element={<PaymentCheckPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
