import { createBrowserRouter } from 'react-router-dom';

import { OrderPage } from '@pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <OrderPage />,
      },
    ],
  },
]);

export default router;
