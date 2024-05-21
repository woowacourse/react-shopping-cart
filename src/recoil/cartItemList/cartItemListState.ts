import { atom, selector } from 'recoil';
import { requestCartItemList } from '../../apis/cartItemList/cartItemList';
import { CartItem } from '../../apis/cartItem/cartItem.type';

export const cartItemListState = atom<CartItem[]>({
  key: 'cartItemListState',
  default: [],
});

export const cartItemListStateQuery = selector<CartItem[]>({
  key: 'cartItemListStateQuery',
  get: async () => {
    const result = await requestCartItemList();
    return result;
  },
  set: ({ set }, cartItemList) => {
    set(cartItemListState, cartItemList);
  },
});
