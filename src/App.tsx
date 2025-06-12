import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./domains/common/context/cartProvider";
import { shoppingCartRoute } from "./route/shoppingCartRoute";
import { SelectedCartProvider } from "./domains/common/context/selectedCartProvider";
import { ErrorProvider } from "./context/errorProvider";

function App() {
  return (
    <ErrorProvider>
      <CartProvider>
        <SelectedCartProvider>
          <RouterProvider router={shoppingCartRoute} />
        </SelectedCartProvider>
      </CartProvider>
    </ErrorProvider>
  );
}

export default App;
