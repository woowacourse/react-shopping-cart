import CartPage from "./CartPage";
import { CartProvider } from "./stores/CartContext";
function App() {
  return (
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
}

export default App;
