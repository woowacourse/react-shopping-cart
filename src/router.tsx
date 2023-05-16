import { createBrowserRouter } from 'react-router-dom';

import ProductListPage from '@Pages/ProductListPage';

import App from './App';

const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          index: true,
          element: <ProductListPage />,
        },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart',
  },
);

export default router;
