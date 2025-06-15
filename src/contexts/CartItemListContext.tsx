import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
} from "react";

import CartItem from "../types/CartItem";

type cartItemsContextType = {
  cartItemList: CartItem[];
  updateCartItemList: (value: CartItem[]) => void;
};

export const CartItemListContext = createContext<
  cartItemsContextType | undefined
>(undefined);

export const CartItemListProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);

  const updateCartItemList = useCallback((cartItemList: CartItem[]) => {
    setCartItemList(cartItemList);
  }, []);

  return (
    <CartItemListContext.Provider value={{ cartItemList, updateCartItemList }}>
      {children}
    </CartItemListContext.Provider>
  );
};

export const useCartItemListContext = () => {
  const context = useContext(CartItemListContext);
  if (!context) {
    throw new Error(
      "useCartItemListContext는 CartItemListProvider 안에서 사용해야 합니다."
    );
  }
  return context;
};
