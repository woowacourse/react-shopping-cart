import { selector, useRecoilValue } from 'recoil';

import { checkedCartItemsSelector } from './recoilCart';

const totalProductPrice = selector({
  key: 'totalProductPrice',
  get: ({ get }) => {
    const checkedCartItems = get(checkedCartItemsSelector);
    const totalProductPrice = checkedCartItems.reduce((totalPrice, item) => {
      return totalPrice + item.product.price * item.quantity;
    }, 0);
    return totalProductPrice;
  },
});

export const useTotalProductPrice = () => useRecoilValue(totalProductPrice);
