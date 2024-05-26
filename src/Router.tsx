import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from '@/pages/Cart.tsx';
import NotFound from './pages/NotFound';
import Order from './pages/Order';
import OrderConfirm from './pages/OrderConfirm';
import { ROUTE_PATH } from './constants/routePath';

export default function Router() {
  return (
    <BrowserRouter basename="/react-shopping-cart/dist">
      <Routes>
        <Route path={ROUTE_PATH.cart} element={<Cart />} />
        <Route path={ROUTE_PATH.order} element={<Order />} />
        <Route path={ROUTE_PATH.orderConfirm} element={<OrderConfirm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
