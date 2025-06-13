import { createHashRouter, RouterProvider } from 'react-router';
import * as S from './App.styles';
import { APIProvider } from './context/APIContext';
import OrderCompletePage from './pages/OrderCompletedPage/OrderCompletedPage';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import OrderConfirmPage from './pages/OrderConfirmPage/OrderConfirmPage';

const router = createHashRouter([
  {
    path: '/',
    element: <ShoppingCartPage />,
  },
  {
    path: '/confirm',
    element: <OrderConfirmPage />,
  },
  {
    path: '/completed',
    element: <OrderCompletePage />,
  },
]);

function App() {
  return (
    <APIProvider>
      <S.AppWrapper>
        <RouterProvider router={router} />
      </S.AppWrapper>
    </APIProvider>
  );
}

export default App;
