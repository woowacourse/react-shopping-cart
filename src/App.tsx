import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import { fetchCartItems } from './apis';

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

  return <RouterProvider router={router} />;
}

export default App;
