import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { CartItemContent } from "../../../types/cartItem";
import { useCartApi } from "../../../hooks/useCartApi";

interface CartItemsContextValue {
  cartItems: CartItemContent[];
  isLoading: boolean;
}

const CartItemsContext = createContext<CartItemsContextValue | null>(null);

function CartItemsProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItemContent[]>([]);
  const { isLoading, getCartItems } = useCartApi();

  useEffect(() => {
    (async () => {
      const fetchCartItems = await getCartItems();
      setCartItems(fetchCartItems!);
    })();
  }, []);

  return <CartItemsContext.Provider value={{ cartItems, isLoading }}>{children}</CartItemsContext.Provider>;
}

export const useCartItems = () => {
  const context = useContext(CartItemsContext);
  if (context === null) {
    throw new Error("useCartItems는 CartItemsProvider 내에서 사용해야 합니다.");
  }
  return context;
};

export default CartItemsProvider;
