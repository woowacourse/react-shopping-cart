import CartPage from "./pages/CartPage/CartPage";
import { CartProvider } from "./stores/CartContext";
import { SelectProvider } from "./stores/SelectContext";

function App() {
  return (
    <CartProvider>
      <SelectProvider>
        <CartPage />
      </SelectProvider>
    </CartProvider>
  );
}

export default App;
