import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./domains/common/context/cartProvider";
import { shoppingCartRoute } from "./route/shoppingCartRoute";
import { SelectedCartProvider } from "./domains/common/context/selectedCartProvider";

function App() {
  return (
    <CartProvider>
      <SelectedCartProvider>
        <RouterProvider router={shoppingCartRoute} />
      </SelectedCartProvider>
    </CartProvider>
  );
}

export default App;
