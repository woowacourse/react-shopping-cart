import { createBrowserRouter } from 'react-router-dom';

import ProductListPage from '@Pages/ProductListPage';
import ShoppingList from '@Pages/ShoppingList';

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
        {
          path: '/shopping-list',
          element: <ShoppingList />,
        },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart',
  },
);

export default router;
