import { createContext, PropsWithChildren, useContext } from "react";
import useFetchData from "../hooks/useFetchData";
import { CartItem } from "../type/CartItem";
import getCartItems from "../apis/helper/getCartItems";

type CartItemsContextType = {
  data: CartItem[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
};

const CartItemsContext = createContext<CartItemsContextType | null>(null);

export function CartItemsProvider({ children }: PropsWithChildren) {
  const { data, refetch, isLoading, isFetching, error } = useFetchData<
    CartItem[]
  >({
    fetcher: getCartItems,
  });

  return (
    <CartItemsContext.Provider
      value={{ data, refetch, isLoading, isFetching, error }}
    >
      {children}
    </CartItemsContext.Provider>
  );
}

export function useCartItemsContext() {
  const context = useContext(CartItemsContext);

  if (!context) {
    throw new Error(
      "cartItemsContext는 cartItemsContextProvider 내부에 위치해야 합니다."
    );
  }

  return context;
}
