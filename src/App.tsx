import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { fetchCartItemList, fetchCouponList } from './apis/index';
import { ERROR_MESSAGE } from './constants/MESSAGES';
import { PATHS } from './constants/PATHS';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import OrderConfirmPage from './pages/OrderConfirmPage/OrderConfirmPage';
import PaymentConfirmPage from './pages/PaymentConfirmPage/PaymentConfirmPage';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';

function App() {
  const router = createBrowserRouter([
    {
      path: PATHS.ROOT,
      element: <ShoppingCartPage />,
      loader: () => fetchCartItemList(),
      errorElement: <ErrorPage error={ERROR_MESSAGE.SHOPPING_CART_PAGE} />,
    },
    {
      path: PATHS.ORDER_CONFIRM,
      element: <OrderConfirmPage />,
      loader: () => fetchCouponList(),
      errorElement: <ErrorPage error={ERROR_MESSAGE.ORDER_CONFIRM_PAGE} />,
    },
    {
      path: PATHS.PAYMENT_CONFIRM,
      element: <PaymentConfirmPage />,
      errorElement: <ErrorPage error={ERROR_MESSAGE.PAYMENT_CONFIRM_PAGE} />,
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
