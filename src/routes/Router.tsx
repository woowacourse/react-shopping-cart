import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from '../Page/NotFound';
import Home from '../Page/Home';
import Cart from '../Page/Cart';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />,
      children: [{ path: '/cart', element: <Cart /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
