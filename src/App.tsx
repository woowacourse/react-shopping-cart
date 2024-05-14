import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShoppingCartPage from './pages/ShoppingCartPage';
import OrderConfirmPage from './pages/OrderConfirmPage';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <ShoppingCartPage />,
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
