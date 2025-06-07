import { CartItem } from '../api/types/cart';

export const getSelectedCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem('selected-cart-items');
  return cartItems ? JSON.parse(cartItems) : [];
};

export const saveSelectedCartItemsToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('selected-cart-items', JSON.stringify(cartItems));
};
