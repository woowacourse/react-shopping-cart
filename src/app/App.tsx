import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@app/config/routes';
import CartPage from '@pages/cart/CartPage';
import OrderPage from '@pages/order/OrderPage';
import PaymentPage from '@pages/payment/PaymentPage';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.ORDER} element={<OrderPage />} />
      <Route path={ROUTES.PAYMENT} element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
