import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from '@/pages/Cart.tsx';
import NotFound from './pages/NotFound';
import Order from './pages/Order';
import OrderConfirm from './pages/OrderConfirm';

export default function Router() {
  return (
    <BrowserRouter basename="/react-shopping-cart/dist">
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
