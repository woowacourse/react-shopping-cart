import { selector, useRecoilValue } from 'recoil';

import { CartState } from './recoilCart';

import { RECOIL_KEY } from '../constants';
import { CheckedState } from './recoilChecked';

const TotalProductPrice = selector({
  key: RECOIL_KEY.TOTAL_PRODUCT_PRICE_VALUE,
  get: ({ get }) => {
    const cart = get(CartState);
    const checkedItems = get(CheckedState);

    const totalProductPrice = cart.reduce((totalPrice, item) => {
      if (checkedItems[item.id]) {
        return totalPrice + item.quantity * item.product.price;
      }

      return totalPrice;
    }, 0);

    return totalProductPrice;
  },
});

export const useTotalProductPrice = () => useRecoilValue(TotalProductPrice);
