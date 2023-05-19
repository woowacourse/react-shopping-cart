import { createBrowserRouter } from 'react-router-dom';

import Home from '@Pages/Home';
import NotFound from '@Pages/NotFound';
import ShoppingCart from '@Pages/ShoppingCart';

import App from './App';

const router = createBrowserRouter(
  [
    {
      element: <App />,
      errorElement: <NotFound />,
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
