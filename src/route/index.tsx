import {PATH} from './path';
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
          path: PATH.MAIN,
          element: <App />,
        },
        {
          path: PATH.CONFIRM,
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
