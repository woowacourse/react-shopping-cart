import { createBrowserRouter } from 'react-router-dom';

import ProductListPage from '@Pages/ProductListPage';
import ProductSelectListPage from '@Pages/ProductSelectListPage';

import App from './App';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'product-list',
          element: <ProductListPage />,
        },
        {
          path: 'product-select-list',
          element: <ProductSelectListPage />,
        },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart',
  },
);

export default router;
