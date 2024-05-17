import AppLayout from '@components/layout/AppLayout/AppLayout';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import { OrderConfirmPage, OrderPage } from '@pages/index';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <OrderPage />,
        },
        {
          path: '/confirm',
          element: <OrderConfirmPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ],
  {
    basename: '/react-shopping-cart',
  },
);

export default router;
