import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import OrderConfirmPage from './pages/OrderConfirmPage/OrderConfirmPage';
import PaymentConfirmPage from './pages/PaymentConfirmPage/PaymentConfirmPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { fetchCartItemList, fetchCoupons } from './apis';
import { PATHS } from './constants/PATHS';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: PATHS.ROOT,
        element: <ShoppingCartPage />,
        loader: () => fetchCartItemList(),
        errorElement: <ErrorPage />,
      },
      {
        path: PATHS.ORDER_CONFIRM,
        loader: () => fetchCoupons(),
        element: <OrderConfirmPage />,
      },
      {
        path: PATHS.PAYMENT_CONFIRM,
        element: <PaymentConfirmPage />,
      },
      {
        path: PATHS.ERROR,
        element: <ErrorPage />,
      },
    ],
    { basename: PATHS.BASE },
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
