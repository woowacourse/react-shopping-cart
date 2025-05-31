import { createContext, ReactNode, useContext } from "react";
import useCartItem from "../hooks/useCartItem";

type CartItemContextType = ReturnType<typeof useCartItem>;
const CartItemContext = createContext<CartItemContextType>({
  cartItems: [],
  refetchCartItems: async () => {},
  isLoading: true,
  isFetching: true,
  errorMessage: "",
});

interface CartItemProviderProps {
  children: ReactNode;
}

export function CartItemProvider({ children }: CartItemProviderProps) {
  const { cartItems, refetchCartItems, isLoading, isFetching, errorMessage } =
    useCartItem();

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        refetchCartItems,
        isLoading,
        isFetching,
        errorMessage,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
}

export const useCartItemContext = () => {
  const context = useContext(CartItemContext);
  if (!context) {
    throw new Error(
      "useCartItemContext must be used within a CartItemProvider"
    );
  }
  return context;
};
