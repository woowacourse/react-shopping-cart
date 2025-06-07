import { CartItem } from '../types';

const getCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch('/api/cart-items');
  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  const raw = await response.json();
  const data: CartItem[] = raw.content;

  return data;
};

export default getCartItems;
