import { createContext, PropsWithChildren } from 'react';

import { getCartItemList } from '@/api/cart';
import { CartItem } from '@/features/Cart/types/Cart.types';

import { useFetchData } from '../hooks/useFetchData';

type DataMap = {
  cart: CartItem[];
};

type UseDataReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetch: (apiCall: () => Promise<T>) => Promise<void>;
  mutate: (apiCall: () => Promise<void>, refetchFn?: () => Promise<T>) => Promise<void>;
};

type DataContextType = {
  [K in keyof DataMap]: UseDataReturn<DataMap[K]>;
};

export const CartContext = createContext<DataContextType | null>(null);
export const ShoppingContext = ({ children }: PropsWithChildren) => {
  const cart = useFetchData<CartItem[]>({ autoFetch: getCartItemList });

  return <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>;
};
