import { createBrowserRouter } from 'react-router-dom';

import ProductListPage from '@Pages/ProductListPage';

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
      ],
    },
  ],
  {
    basename: '/react-shopping-cart',
  },
);

export default router;
