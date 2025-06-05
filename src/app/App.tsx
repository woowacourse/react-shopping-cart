import { Routes, Route } from 'react-router-dom';
import CartPage from '../pages/cart/CartPage';
import OrderSuccessPage from '../pages/order/OrderSuccessPage';
import { ROUTES } from '../shared/config/routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccessPage />} />
    </Routes>
  );
}

export default App;
