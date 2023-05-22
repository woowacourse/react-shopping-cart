import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import MainPage from '../pages/MainPage';
import CartPage from '../pages/CartPage';

const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainPage />,
      errorElement: <NotFound />,
    },
    {
      path: '/cart',
      element: <CartPage />,
    },
  ],
  { basename: process.env.PUBLIC_URL },
);

export default routes;
