import { selector } from 'recoil';
import { cartItemListState } from '../cartItemList/cartItemListState';
import { selectedCartItemIdListState } from './selectedCartItemIdListState';
import { cartItemQuantityState } from '../cartItem/cartItemQuantityState';
import { CartItem } from '../../types/cartItem.type';

export const selectedCartItemListState = selector({
  key: 'selectedCartItemListState',
  get: ({ get }) => {
    const cartItemList = get(cartItemListState);
    const selectedCartItemIdList = get(selectedCartItemIdListState);

    const selectedCartItemList: CartItem[] = [];

    cartItemList.forEach((cartItem) => {
      if (!selectedCartItemIdList.includes(cartItem.cartItemId)) return;

      const quantity = get(cartItemQuantityState(cartItem.cartItemId));

      selectedCartItemList.push({
        ...cartItem,
        quantity,
      });
    });

    return selectedCartItemList;
  },
});
