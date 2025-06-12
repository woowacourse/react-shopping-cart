import { createContext, useContext, ReactNode } from 'react';
import { CartItemType } from '@entities/cart';
import { useCart } from '@entities/cart';

interface CartContextType {
  items: CartItemType[];
  isLoading: boolean;
  error: string | null;
  updateItemQuantity: (id: number, quantity: number) => Promise<CartItemType[] | undefined>;
  removeItem: (id: number) => Promise<CartItemType[] | undefined>;
}

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext는 CartProvider 안에서 사용해야 합니다.');
  }

  return context;
};
