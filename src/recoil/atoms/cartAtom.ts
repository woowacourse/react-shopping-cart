import { atom } from 'recoil';
import { Product } from '../../types/Product';

interface CartProductDetail {
  id: number;
  quantity: number;
  product: Product;
}

export const cartItemsState = atom<CartProductDetail[]>({
  key: 'cartItemsState',
  default: [],
  effects: [
    ({ setSelf, trigger, onSet }) => {
      const getCartItems = async () => {
        const response = await fetch('/cart-items');
        const cartItems = await response.json();

        setSelf(cartItems);
      };

      if (trigger === 'get') getCartItems();

      onSet((newValue) => {
        console.log('리코일 변화', newValue);
      });
    },
  ],
});

export const selectedCartIdListState = atom<number[]>({
  key: 'selectedCartIdListState',
  default: [],
});
