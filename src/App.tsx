import { createBrowserRouter, RouterProvider } from 'react-router';
import * as S from './App.styles';
import { APIProvider } from './context/APIContext';
import OrderCompletePage from './pages/OrderCompletedPage/OrderCompletedPage';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ShoppingCartPage />,
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
