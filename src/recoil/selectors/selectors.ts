import { selector } from 'recoil';
import { selectedCartItemState } from '../atoms/atoms';

export const selectedCartItemTotalPriceState = selector<number>({
  key: 'selectedCartItemTotalPriceState',
  get: ({ get }) => {
    const selectedCardItem = get(selectedCartItemState);
    return selectedCardItem.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export const selectedCartItemTotalCountState = selector<number>({
  key: 'selectedCartItemTotalCountState',
  get: ({ get }) => {
    const selectedCardItem = get(selectedCartItemState);
    return selectedCardItem.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});
