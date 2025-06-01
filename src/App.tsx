import { createHashRouter, RouterProvider } from "react-router";
import * as S from "./App.styles";
import { PATH } from "./constants";
import { QueryProvider } from "./modules";
import { OrderCompletedPage, ShoppingCartPage } from "./pages";

const router = createHashRouter([
  {
    path: PATH.CART,
    element: <ShoppingCartPage />,
  },
  {
    path: PATH.ORDER_COMPLETE,
    element: <OrderCompletedPage />,
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
