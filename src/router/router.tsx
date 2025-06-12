import { createBrowserRouter, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import CartPage from '../pages/CartPage';
import OrderConfirmPage from '../pages/OrderConfirmPage';
import { BASE_URL, URL_LOCATION } from '../constants/url';
import ErrorPage from '../pages/ErrorPage';
import OrderPage from '../pages/OrderPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={BASE_URL + URL_LOCATION.BASE} />,
    errorElement: <ErrorPage />,
  },
  {
    path: BASE_URL + URL_LOCATION.BASE,
    element: (
      <>
        <Header />
        <CartPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: BASE_URL + URL_LOCATION.ORDER,
    element: (
      <>
        <Header />
        <OrderPage />
      </>
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
