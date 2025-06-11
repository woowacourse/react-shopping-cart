import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { CartItemType } from '../types';
import { PaginationResponse } from '../../../../api/type';
import createFetcher from '../../../../utils/createFetcher';

interface CartContextValue {
  cartItems: CartItemType[];
  fetch: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const fetcher = createFetcher<PaginationResponse<CartItemType>>();

  const fetch = useCallback(async () => {
    const data = await fetcher('/cart-items?page=0&size=20');
    if (data) setCartItems(data.content);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const value = useMemo(() => ({ cartItems, fetch }), [cartItems, fetch]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('CartContext not found!');
  return ctx;
}
