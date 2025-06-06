import React, { createContext, useContext } from 'react';
import useFetchCartItems from '../../../hooks/useFetchCartItems';
import { CartItemTypes } from '../../../types/cartItem';

const Context = createContext<{
  cartItems: CartItemTypes[];
  error: string;
  isLoading: boolean;
  isFetching: boolean;
  getCartItemData: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}>({
  cartItems: [],
  error: '',
  isLoading: false,
  isFetching: false,
  getCartItemData: () => {},
  setError: () => {},
});

export function CartItemsProvider({ children }: { children: React.ReactNode }) {
  const { cartItems, error, isLoading, isFetching, getCartItemData, setError } =
    useFetchCartItems();

  return (
    <Context.Provider
      value={{
        cartItems,
        error,
        isLoading,
        isFetching,
        getCartItemData,
        setError,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCartItemsContext() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useAPIContext must be used within a Provider');
  }

  return context;
}
