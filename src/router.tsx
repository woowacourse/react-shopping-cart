import { createBrowserRouter } from 'react-router-dom';

import Home from '@Pages/Home';
import ShoppingList from '@Pages/ShoppingList';

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
