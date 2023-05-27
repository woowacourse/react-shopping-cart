import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Cart from '../pages/Cart';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
