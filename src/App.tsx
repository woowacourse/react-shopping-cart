import { createHashRouter, RouterProvider } from "react-router";
import * as S from "./App.styles";
import { PATH } from "./constants/path";
import { QueryProvider } from "./modules";
import OrderCompletePage from "./pages/OrderCompletedPage/OrderCompletedPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";

const router = createHashRouter([
  {
    path: PATH.CART,
    element: <ShoppingCartPage />,
  },
  {
    path: PATH.ORDER_COMPLETE,
    element: <OrderCompletePage />,
  },
]);

function App() {
  return (
    <QueryProvider>
      <S.AppWrapper>
        <RouterProvider router={router} />
      </S.AppWrapper>
    </QueryProvider>
  );
}

export default App;
