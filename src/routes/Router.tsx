import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from '../Page/Cart';
import Home from '../Page/Home';
import NotFound from '../Page/NotFound';
import Root from './Root';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: '/cart', element: <Cart /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
