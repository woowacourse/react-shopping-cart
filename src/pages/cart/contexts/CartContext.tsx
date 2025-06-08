import { createContext, useContext } from "react";
import useCart, { UseCartReturnType } from "../hooks/useCart";

const CartContext = createContext<UseCartReturnType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartItemsInfo, cartItemListProps, orderConfirmPageData } = useCart();

  return (
    <CartContext.Provider value={{ cartItemsInfo, cartItemListProps, orderConfirmPageData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within an CartProvider");
  return context;
};
