import { useData } from '../context/DataContext';
import { getCartItems } from '../apis/cart';
import { CartItemsResponse } from '../types/cart';

// context에서 cart 데이터를 가져오고, 없으면 fetch하는 훅
export const useCartItemsData = () => {
  const { data: cartItems } = useData<CartItemsResponse>({
    fetcher: getCartItems,
    name: 'cartItems',
  });
  
  return cartItems;
};