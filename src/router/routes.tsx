import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/layout/Layout';
import CartPage from '../pages/cartPage/CartPage';
import OrderCompletePage from '../pages/orderCompletePage/OrderCompletePage';
import { ROUTE } from '../constants/systemConstants';
import Header from '../components/layout/header/Header';
import HeaderWithBack from '../components/layout/headerWithBack/HeaderWithBack';
const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: <Layout />,
    children: [
      {
        path: ROUTE.HOME,
        element: (
          <>
            <Header />
            <CartPage />
          </>
        ),
      },
      {
        path: ROUTE.ORDER_COMPLETE,
        element: (
          <>
            <HeaderWithBack />
            <OrderCompletePage />
          </>
        ),
      },
    ],
  },
]);

export default router;
