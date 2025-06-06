import { createContext, useContext } from 'react';
import { CartItemProps } from '../types/cartItem';
import useCartList from '../hooks/useCartList';

type CartListContextType = {
  data: CartItemProps[];
  error: string;
  isLoading: boolean;
  increaseCartItem: (cartItem: CartItemProps) => Promise<void>;
  decreaseCartItem: (cartItem: CartItemProps) => Promise<void>;
  deleteCartItem: (cartItemId: number) => Promise<void>;
};

const CartListContext = createContext<CartListContextType | null>(null);

export const CartListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data,
    error,
    isLoading,
    increaseCartItem,
    decreaseCartItem,
    deleteCartItem,
  } = useCartList();
  return (
    <CartListContext.Provider
      value={{
        data,
        error,
        isLoading,
        increaseCartItem,
        decreaseCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </CartListContext.Provider>
  );
};

export const useCartListContext = () => {
  const context = useContext(CartListContext);
  if (!context) {
    throw new Error(
      'useCartListContext must be used within a CartListProvider'
    );
  }
  return context;
};
