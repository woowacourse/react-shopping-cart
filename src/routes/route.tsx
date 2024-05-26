import AppLayout from '@components/layout/AppLayout/AppLayout';
import { ErrorPage, OrderConfirmPage, OrderPage, PurchaseConfirmPage } from '@pages/index';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <OrderPage />,
        },
        {
          path: 'order-confirm',
          element: <OrderConfirmPage />,
        },
        {
          path: 'purchase-confirm',
          element: <PurchaseConfirmPage />,
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
