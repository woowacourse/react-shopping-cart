import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import { fetchCartItems } from './apis';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <ShoppingCartPage />,
        loader: () => fetchCartItems(),
      },
      {
        path: '/confirm',
        element: <OrderConfirmPage />,
      },
    ],
    { basename: '/react-shopping-cart/' },
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
