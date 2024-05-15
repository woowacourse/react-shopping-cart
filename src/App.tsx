import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import OrderConfirmPage from './pages/OrderConfirmPage/OrderConfirmPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { fetchCartItems } from './apis';
import { ThemeProvider } from 'styled-components';
import { PATHS } from './constants/PATHS';

import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: PATHS.ROOT,
        element: <ShoppingCartPage />,
        loader: () => fetchCartItems(),
        errorElement: <ErrorPage />,
      },
      {
        path: PATHS.CONFIRM,
        element: <OrderConfirmPage />,
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
