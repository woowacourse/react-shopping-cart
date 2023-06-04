import { atom } from 'recoil';
import { Product } from '../../types/Product';

export interface CartItemType {
  id: number;
  quantity: number;
  product: Product;
}

export const cartItemsState = atom<CartItemType[]>({
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

export const selectedCartIdListState = atom<CartItemType['id'][]>({
  key: 'selectedCartIdListState',
  default: [],
});
