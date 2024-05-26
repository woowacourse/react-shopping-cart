import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ShoppingCartOverview from './components/ShoppingCartOverview/ShoppingCartOverview';
import OrderInformationOverview from './components/OrderInformationOverview/OrdeInformationOverview';
import PaymentInfo from './components/PaymentInfo/PaymentInfo';
import { ROUTER_URL } from './constants/constants';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        index: true,
        path: ROUTER_URL.MAIN,
        element: <ShoppingCartOverview />,
      },
      {
        path: ROUTER_URL.ORDER_INFO,
        element: <OrderInformationOverview />,
        errorElement: <div>이상해요</div>,
      },
      {
        path: ROUTER_URL.PAYMENT_INFO,
        element: <PaymentInfo />,
        errorElement: <div>이상해요</div>,
      },
    ],
    errorElement: <div>이상해요</div>,
  },
]);

export default router;
