import { selector } from 'recoil';
import { selectedCartItemState } from '../atoms/atoms';

export const cartItemTotalPriceState = selector<number>({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const selectedCardItem = get(selectedCartItemState);
    return selectedCardItem.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});
