import { selector } from 'recoil';
import { CartItemType } from '../types';
import { fetchCartItems } from '../api';
import CartItemLocalStorage from '../services/CartItemLocalStorage';

const initializeCartItemStorage = (items: CartItemType[]) => {
  const storageState = CartItemLocalStorage.get('cartItemSelected') || {};

  const newStorageState = items.reduce((acc, item) => {
    acc[item.id] = acc[item.id] || false;
    return acc;
  }, storageState);

  CartItemLocalStorage.set('cartItemSelected', newStorageState);
};

export const cartListSelector = selector<CartItemType[]>({
  key: 'cartListSelector',
  get: async () => {
    const items = await fetchCartItems();
    initializeCartItemStorage(items);
    return items;
  },
});
