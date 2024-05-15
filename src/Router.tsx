import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from '@/pages/Cart.tsx';
import OrderConfirm from './pages/OrderConfirm';

export default function Router() {
  return (
    <BrowserRouter basename="/react-shopping-cart/dist">
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
      </Routes>
    </BrowserRouter>
  );
}
