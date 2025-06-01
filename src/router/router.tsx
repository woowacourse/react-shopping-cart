import { createBrowserRouter, Navigate } from 'react-router-dom';
import CartItemsProvider from '../contexts/CartItemsProvider';
import Header from '../components/Header';
import CartPage from '../pages/CartPage';
import OrderConfirmPage from '../pages/OrderConfirmPage';
import { BASE_URL, URL_LOCATION } from '../constants/url';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={BASE_URL + URL_LOCATION.BASE} />,
    errorElement: <ErrorPage />,
  },
  {
    path: BASE_URL + URL_LOCATION.BASE,
    element: (
      <CartItemsProvider>
        <Header />
        <CartPage />
      </CartItemsProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: BASE_URL + URL_LOCATION.CONFIRM,
    element: (
      <>
        <Header />
        <OrderConfirmPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
