import { CartItem } from '../types';

const getCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch('/api/cart-items');
  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  const data: CartItem[] = await response.json();
  return data;
};

export default getCartItems;
