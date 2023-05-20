import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/cart',
      element: <Cart />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
