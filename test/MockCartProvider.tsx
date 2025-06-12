import { CartContext } from "@/features/Cart/context/CartProvider";
import { PropsWithChildren, useState } from "react";
import { CartItem } from "@/features/Cart/types/Cart.types";

type MockCartProviderProps = PropsWithChildren<{
  cartItems: CartItem[];
  isRemoteArea?: boolean;
}>;

export const MockCartProvider = ({
  children,
  cartItems,
  isRemoteArea: initialRemoteArea = false,
}: MockCartProviderProps) => {
  const [isRemoteArea, setIsRemoteArea] = useState(initialRemoteArea);
  const [items] = useState(cartItems.map((item) => ({ ...item })));

  const value = {
    cartItems: items,
    isRemoteArea,
    toggleCheck: () => {},
    toggleAllCheck: () => {},
    updateQuantity: async () => {},
    removeCartItem: async () => {},
    toggleIsRemoteArea: () => setIsRemoteArea((prev) => !prev),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
