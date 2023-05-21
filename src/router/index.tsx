import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: '/cart',
      element: <Cart />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
