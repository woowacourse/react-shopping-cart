import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./domains/shopping-cart/context/cartProvider";
import { shoppingCartRoute } from "./route/shoppingCartRoute";

function App() {
  return (
    <CartProvider>
      <RouterProvider router={shoppingCartRoute} />
    </CartProvider>
  );
}

export default App;
