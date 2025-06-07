// CartItemsContext.ts
import { createContext, useContext } from 'react';
import { CartItem } from '../../types';

interface CartItemsContextType {
  cartItems: CartItem[];
  refetch: () => Promise<void>;
}

export const CartItemsContext = createContext<CartItemsContextType | null>(
  null
);

export const useCartItemsContext = () => {
  const context = useContext(CartItemsContext);
  if (!context) {
    throw new Error(
      'useCartItemsContext는 CartItemsProvider로 감싸져야 합니다.'
    );
  }
  return context;
};
