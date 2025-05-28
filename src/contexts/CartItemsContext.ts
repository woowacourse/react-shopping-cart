import { createContext, useContext } from 'react';
import { CartItem } from '../types';

interface CartItemContext {
  cartItems: CartItem[];
  increaseCartItemQuantity: (id: number) => void;
  decreaseCartItemQuantity: (id: number) => void;
  deleteCartItem: (id: number) => void;
  checkedCartIds: number[];
  addCheckedCartItem: (id: number) => void;
  removeCheckedCartItem: (id: number) => void;
}

export const CartItemsContext = createContext<CartItemContext | null>(null);

export const useCartItemsContext = () => {
  const context = useContext(CartItemsContext);
  if (!context) {
    throw new Error(
      'useCartItemsContext는 CartItemsProvider로 감싸져야 합니다.'
    );
  }
  return context;
};
