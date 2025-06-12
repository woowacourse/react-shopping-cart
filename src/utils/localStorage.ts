import { CartItemProps } from '../types/cartItem';

export const createStorage = <T>(
  key: string,
  storage = window.localStorage
) => {
  return {
    get: () => JSON.parse(storage.getItem(key) || 'null') ?? [],
    set: (data: T) => storage.setItem(key, JSON.stringify(data)),
    remove: () => storage.removeItem(key),
  };
};

export const cartListStorage = createStorage<CartItemProps[]>('cartList');
export const selectedItemsStorage = createStorage<number[]>('selectedItems');
