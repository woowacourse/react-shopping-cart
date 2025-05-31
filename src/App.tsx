import { createHashRouter, RouterProvider } from "react-router";
import * as S from "./App.styles";
import { APIProvider } from "./context/APIContext";
import OrderCompletePage from "./pages/OrderCompletedPage/OrderCompletedPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import { PATH } from "./constants/path";

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
    <APIProvider>
      <S.AppWrapper>
        <RouterProvider router={router} />
      </S.AppWrapper>
    </APIProvider>
  );
}

export default App;
