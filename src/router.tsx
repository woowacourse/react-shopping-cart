import { createBrowserRouter } from 'react-router-dom';

import CartList from '@Pages/CartList';
import Home from '@Pages/Home';
import NotFound from '@Pages/NotFound';

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
          path: '/cart-list',
          element: <CartList />,
        },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart',
  },
);

export default router;
