import { BrowserRouter, Route, Routes } from 'react-router';
import CartPage from './pages/cart/CartPage';
import OrderCheckPage from './pages/orderCheck/OrderCheckPage';
import PaymentCheckPage from './pages/paymentCheck/PaymentCheckPage';
import { ROUTE } from './shared/constants/route';
import NotFoundPage from './pages/notFound/NotFoundPage';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <Routes>
        <Route path={ROUTE.home} element={<CartPage />} />
        <Route path={ROUTE.cart} element={<CartPage />} />
        <Route path={ROUTE.orderCheck} element={<OrderCheckPage />} />
        <Route path={ROUTE.paymentCheck} element={<PaymentCheckPage />} />
        <Route path={ROUTE.notFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
