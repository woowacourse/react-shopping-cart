import CartPageContent from "./CartPageContent";
import { CartProvider } from "./contexts/CartContext";

const CartPage = () => {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
};

export default CartPage;
