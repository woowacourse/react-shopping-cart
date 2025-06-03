import { useApiContext } from './useApiContext';
import getCartItems from '../api/getCartItem';

export const useCartItems = () => {
  return useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });
};
