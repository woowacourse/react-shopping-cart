import { createBrowserRouter } from 'react-router-dom';

import { OrderPage } from '@pages/index';
import AppLayout from '@components/layout/AppLayout/AppLayout';

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
        element: <OrderPage />,
      },
    ],
  },
]);

export default router;
