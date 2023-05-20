import { selector, useRecoilValue } from 'recoil';
import { CartState } from './recoilCart';
import { CheckedState } from './recoilChecked';

const TotalProductPrice = selector({
  key: 'totalProductPrice',
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
