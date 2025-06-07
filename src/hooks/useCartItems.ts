import { useApiContext } from './useApiContext';
import { getCartItems } from '../api/getCartItems';

export const useCartItems = () => {
  return useApiContext({ fetchFn: getCartItems, key: 'cartItems' });
};
