import { atom, selector } from 'recoil';

import type { CartProduct } from '../types/product';

export const checkedItemAtom = atom<CartProduct[]>({
  key: 'checkedItemState',
  default: [],
});

export const checkedListSelector = selector<number>({
  key: 'checkedListState',
  get: ({ get }) => {
    const checkedItem = get(checkedItemAtom);

    return checkedItem.length;
  },
});

export const totalPriceSelector = selector<number>({
  key: 'totalPriceState',
  get: ({ get }) => {
    const checkedCartProducts = get(checkedItemAtom);
    const totalPrice = checkedCartProducts.reduce((total, cartProduct) => {
      return total + cartProduct.quantity * cartProduct.product.price;
    }, 0);

    return totalPrice;
  },
});
