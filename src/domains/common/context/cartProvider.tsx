import { createContext, useContext, useMemo } from "react";
import { useShoppingCartApi } from "../../shopping-cart/hooks/useShoppingCartApi";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";

interface CartContextType {
  cartItems: CartItemTypes[];
  loading: boolean;
  error: string;
  getCartItemData: () => Promise<Response | undefined>;
  deleteCartItem: (id: string) => Promise<Response | undefined>;
  patchCartItem: (
    id: string,
    quantity: number
  ) => Promise<Response | undefined>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    getCartItemData,
    deleteCartItem,
    patchCartItem,
    cartItems,
    loading,
    error,
  } = useShoppingCartApi();

  const contextValue: CartContextType = useMemo(
    () => ({
      cartItems,
      loading,
      error,
      getCartItemData,
      deleteCartItem,
      patchCartItem,
    }),
    [cartItems, loading, error, getCartItemData, deleteCartItem, patchCartItem]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart는 CartProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
