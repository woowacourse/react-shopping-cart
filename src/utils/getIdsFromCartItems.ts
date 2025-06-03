import { CartItem } from '../types';

const getIdsFromCartItems = (cartItems: CartItem[]) => {
  return cartItems.map(({ id }) => id);
};

export default getIdsFromCartItems;
