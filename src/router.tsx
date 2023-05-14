import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ROUTER_PATH from './constants/routerPath';

const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATH.home,
      element: <HomeLayout />,
      children: [
        { path: ROUTER_PATH.home, element: <Home /> },
        { path: ROUTER_PATH.cart, element: <Cart /> },
      ],
    },
  ],
  {
    basename: ROUTER_PATH.baseName,
  }
);

export default router;
