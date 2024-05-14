import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from '@/pages/Cart.tsx';

export default function Router() {
  return (
    <BrowserRouter basename="/react-shopping-cart/dist">
      <Routes>
        <Route path="/" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
