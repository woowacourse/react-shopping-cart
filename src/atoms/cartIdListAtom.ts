import { atom, selector } from 'recoil';
import { getCartIdList } from '../utils/localStorage';
import { Product } from '../types/Product';

interface CartProduct {
  id: number;
  quantity: number;
  product: Product;
}

export const cartIdListState = atom<number[]>({
  key: 'cartIdListState',
  default: getCartIdList(),
});

// export const cartProductListState = atom<CartProduct[]>({
//   key: 'cartProductListState',
//   default: (async () => {
//     const response = await fetch(`/cart-list`);
//     const cartProductList = await response.json();

//     return cartProductList;
//   })(),
// });

export const cartProductListState = atom<CartProduct[]>({
  key: 'cartProductListState',
  default: [],
});

export const asyncCartProductListState = selector<CartProduct[]>({
  key: 'asyncCartProductListState',
  get: async ({ get }) => {
    const cartProductList = get(cartProductListState);
    const response = await fetch(`/cart-list`);
    const asyncCartProductList = await response.json();

    return asyncCartProductList;
  },
});
