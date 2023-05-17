import { createBrowserRouter } from 'react-router-dom';

import Home from '@Pages/Home';
import ShoppingCart from '@Pages/ShoppingCart';

import App from './App';

const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/shopping-list',
          element: <ShoppingCart />,
        },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart',
  },
);

export default router;
