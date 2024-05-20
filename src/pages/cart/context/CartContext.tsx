import { createContext, useContext } from 'react';
import { CartItemData } from '@/types';

export interface CartContextType {
  allCartItems: CartItemData[];
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Context를 정의해주세요!');
  }
  return context;
};
