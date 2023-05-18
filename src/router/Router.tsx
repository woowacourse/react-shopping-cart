import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ListPage from '../pages/ListPage/ListPage';
import { PAGE_PATH } from '../constants';
import CartPage from '../pages/CartPage/CartPage';
import Root from './Root';

const Router = () => {
  const browserRouter = createBrowserRouter([
    {
      path: PAGE_PATH.HOME,
      element: <Root />,
      children: [
        {
          path: PAGE_PATH.HOME,
          element: <ListPage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
};

export default Router;
