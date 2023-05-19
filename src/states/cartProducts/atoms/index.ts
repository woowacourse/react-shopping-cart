import { atom, selector } from 'recoil';

import { CartProduct } from '../../../types/product';
import { fetchCartProducts } from '../../../apis/cartProducts';

export const cartProductState = atom<CartProduct[]>({
  key: 'cartProductState',
  default: selector({
    key: 'cartProductState/default',
    get: async () => {
      const data = await fetchCartProducts();
      return data;
    },
  }),
});
