import {ROUTE_PATHS} from './path';
import {createBrowserRouter, RouterProvider} from 'react-router';
import App from '../App';
import NavBar from '../components/layout/NavBar';
import Confirm from '../pages/Confirm';

const router = createBrowserRouter(
  [
    {
      element: <NavBar />,
      children: [
        {
          path: ROUTE_PATHS.MAIN,
          element: <App />,
        },
        {
          path: ROUTE_PATHS.CONFIRM,
          element: <Confirm />,
        },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart',
  }
);
export default function Router() {
  return <RouterProvider router={router} />;
}
