import { createHashRouter, RouterProvider } from "react-router";
import * as S from "./App.styles";
import { PATH } from "./constants";
import { OrderCompletedPage, ShoppingCartPage } from "./pages";

const router = createHashRouter([
  {
    path: PATH.cart,
    element: <ShoppingCartPage />,
  },
  {
    path: PATH.orderCompleted,
    element: <OrderCompletedPage />,
  },
]);

function App() {
  return (
    <S.AppWrapper>
      <RouterProvider router={router} />
    </S.AppWrapper>
  );
}

export default App;
