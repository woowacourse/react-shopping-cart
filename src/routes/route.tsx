import AppLayout from '@components/layout/AppLayout/AppLayout';
import { OrderConfirmPage, OrderPage } from '@pages/index';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
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
  },
]);

export default router;
