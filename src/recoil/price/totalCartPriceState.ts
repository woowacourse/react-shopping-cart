import { selector } from 'recoil';
import { cartItemListState } from '../cartItemList/cartItemListState';
import { cartItemQuantityFamilyState } from '../cartItem/cartItemQuantityFamilyState';
import { selectedCartItemIdListState } from '../selectedCartItemIdList/selectedCartItemIdListState';

export const totalCartPriceState = selector<number>({
  key: 'totalCartPriceState',
  get: ({ get }) => {
    const cartItemList = get(cartItemListState);
    const selectedCartItemIdList = get(selectedCartItemIdListState);
    const selectedCartItem = cartItemList.filter(({ cartItemId }) => selectedCartItemIdList.includes(cartItemId));

    const totalCartPrice = selectedCartItem.reduce((totalCartPrice, { product, cartItemId }) => {
      const quantity = get(cartItemQuantityFamilyState(cartItemId));
      const price = product.price;

      return totalCartPrice + quantity * price;
    }, 0);

    return totalCartPrice;
  },
});
