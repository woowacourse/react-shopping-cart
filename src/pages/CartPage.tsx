import { getCartItemList } from '@/api/cart';
import { useFetchData } from '@/shared/hooks/useFetchData';

import { CartInfo } from '../features/Cart/components/CartInfo';
import { EmptyCart } from '../features/Cart/components/EmptyCart';
import { LoadingCart } from '../features/Cart/components/LoadingCart';
import { CartItem } from '../features/Cart/types/Cart.types';

export const CartPage = () => {
  const cart = useFetchData<CartItem[]>({ autoFetch: getCartItemList });

  if (cart.isInitialLoading) {
    return <LoadingCart />;
  }

  if (!cart.data || cart.data.length === 0) {
    return <EmptyCart />;
  }

  return <CartInfo cart={cart} />;
};
