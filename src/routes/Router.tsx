import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import NotFound from '../Page/NotFound';
import Home from '../Page/Home';
import Cart from '../Page/Cart';

const Router = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Home /> },
          { path: 'cart', element: <Cart /> },
        ],
      },
    ],
    { basename: process.env.PUBLIC_URL },
  );

  return <RouterProvider router={router} />;
};

export default Router;
