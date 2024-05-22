import { selector } from 'recoil';
import { cartItemQuantityState } from '../cartItem/cartItemQuantityState';
import { selectedCartItemListState } from '../selectedCartItemList/selectedCartItemList';

export const totalCartPriceState = selector<number>({
  key: 'totalCartPriceState',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);

    const totalCartPrice = selectedCartItemList.reduce((totalCartPrice, { product, cartItemId }) => {
      const quantity = get(cartItemQuantityState(cartItemId));
      const price = product.price;

      return totalCartPrice + quantity * price;
    }, 0);

    return totalCartPrice;
  },
});
