import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import OrderConfirmPage from './pages/OrderConfirmPage/OrderConfirmPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { fetchCartItemList, fetchCouponList } from './apis/index';
import { ThemeProvider } from 'styled-components';
import { PATHS } from './constants/PATHS';

import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';
import PaymentConfirmPage from './pages/PaymentConfirmPage/PaymentConfirmPage';
import { CART_ITEM_ERROR_MESSAGE } from './constants/MESSAGES';

function App() {
  const router = createBrowserRouter([
    {
      path: PATHS.ROOT,
      element: <ShoppingCartPage />,
      loader: () => fetchCartItemList(),
      errorElement: <ErrorPage error={CART_ITEM_ERROR_MESSAGE.FETCH_CART_ITEMS} />,
    },
    {
      path: PATHS.ORDER_CONFIRM,
      element: <OrderConfirmPage />,
      loader: () => fetchCouponList(),
      errorElement: <ErrorPage error={CART_ITEM_ERROR_MESSAGE.FETCH_COUPONS} />,
    },
    {
      path: PATHS.PAYMENT_CONFIRM,
      element: <PaymentConfirmPage />,
    },
    {
      path: PATHS.ERROR,
      element: <ErrorPage />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
