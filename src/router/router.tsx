import { createBrowserRouter, Navigate } from 'react-router-dom';
import CartItemsProvider from '../contexts/CartItemsProvider';
import Header from '../components/Header';
import CartPage from '../pages/CartPage';
import OrderConfirmPage from '../pages/OrderConfirmPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/react-shopping-cart/" />,
  },
  {
    path: '/react-shopping-cart/',
    element: (
      <CartItemsProvider>
        <Header />
        <CartPage />
      </CartItemsProvider>
    ),
  },
  {
    path: '/react-shopping-cart/confirm',
    element: (
      <>
        <Header />
        <OrderConfirmPage />
      </>
    ),
  },
]);

export default router;
