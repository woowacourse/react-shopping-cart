import { selector } from 'recoil';
import { cartItemQuantityState } from '../cartItem/cartItemQuantityState';
import { selectedCartItemListState } from '../selectedCartItemList/selectedCartItemList';

export const totalCartPriceState = selector<number>({
  key: 'totalCartPriceState',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);

    const totalCartPrice = selectedCartItemList.reduce(
      (totalCartPrice, { quantity, product }) => totalCartPrice + quantity * product.price,
      0,
    );

    return totalCartPrice;
  },
});
