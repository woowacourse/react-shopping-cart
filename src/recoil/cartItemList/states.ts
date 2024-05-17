import { atom, selector } from 'recoil';
import { requestCartItemList } from '../../apis/cartItemList/cartItemList';
import { CartItem } from '../../apis/cartItem/cartItem.type';

export const cartItemListAtom = atom<CartItem[]>({
  key: 'cartItemListAtom',
  default: [],
});

export const cartItemListQuery = selector<CartItem[]>({
  key: 'cartItemListQuery',
  get: async () => {
    const result = await requestCartItemList();
    return result;
  },
  set: ({ set }, cartItemList) => {
    set(cartItemListAtom, cartItemList);
  },
});
