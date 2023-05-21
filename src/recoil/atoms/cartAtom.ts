import { atom } from 'recoil';
import { Product } from '../../types/Product';

export interface CartProductDetail {
  id: number;
  quantity: number;
  product: Product;
}

export const cartItemsState = atom<CartProductDetail[]>({
  key: 'cartItemsState',
  default: [],
  effects: [
    ({ setSelf, trigger }) => {
      const getCartItems = async () => {
        const response = await fetch('/cart-items');
        const cartItems = await response.json();

        setSelf(cartItems);
      };

      if (trigger === 'get') getCartItems();
    },
  ],
});

export const selectedCartIdListState = atom<number[]>({
  key: 'selectedCartIdListState',
  default: [],
});
