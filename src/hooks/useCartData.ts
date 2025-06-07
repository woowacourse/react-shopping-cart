import { useData } from '../context/DataContext';
import { getCartItems } from '../apis/cart';
import { CartItemsResponse } from '../types/cart';

export const useCartData = () => {
  const { data: cartItems } = useData<CartItemsResponse>({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  return cartItems;
};
