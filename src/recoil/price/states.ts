import { selector } from 'recoil';
import { cartItemListAtom } from '../cartItemList/states';
import { selectedCartItemIdListAtom } from '../selectedCartItemIdList/states';
import { cartItemQuantityAtomFamily } from '../cartItem/states';

export const totalCartPriceSelector = selector<number>({
  key: 'totalCartPriceSelector',
  get: ({ get }) => {
    const cartItemList = get(cartItemListAtom);
    const selectedCartItemIdList = get(selectedCartItemIdListAtom);
    const selectedCartItem = cartItemList.filter(({ cartItemId }) => selectedCartItemIdList.includes(cartItemId));

    const totalCartPrice = selectedCartItem.reduce((totalCartPrice, { product, cartItemId }) => {
      const quantity = get(cartItemQuantityAtomFamily(cartItemId));
      const price = product.price;

      return totalCartPrice + quantity * price;
    }, 0);

    return totalCartPrice;
  },
});
