import { createContext, ReactNode, useContext } from "react";
import useCartItem from "../hooks/useCartItem";
import { CartItemType } from "@/apis/cartItems/cartItem.type";

type CartItemContextType = Exclude<
  ReturnType<typeof useCartItem>,
  "cartItems"
> & {
  cartItems: CartItemType[];
};

const CartItemContext = createContext<CartItemContextType>({
  cartItems: [],
  refetchCartItems: async () => {},
  isLoading: true,
  isFetching: true,
  errorMessage: "",
});

type CartItemProviderProps = {
  children: ReactNode;
};

export function CartItemProvider({ children }: CartItemProviderProps) {
  const { cartItems, refetchCartItems, isLoading, isFetching, errorMessage } =
    useCartItem();
  const safeCartItems = cartItems ?? [];

  return (
    <CartItemContext.Provider
      value={{
        cartItems: safeCartItems,
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
