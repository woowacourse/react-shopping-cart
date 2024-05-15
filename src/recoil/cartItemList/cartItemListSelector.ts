import { atom, selector } from 'recoil';
import { getCartItemList } from '../../apis/cartItemList/cartItemList';

export const cartItemListState = atom<CartItem[]>({
  key: 'cartItemListState',
  default: [],
});

export const cartItemListQuery = selector<CartItem[]>({
  key: 'cartItemListQuery',
  get: async () => {
    const result = await getCartItemList();
    return result;
  },
  set: ({ set }, cartItemList) => {
    set(cartItemListState, cartItemList);
  },
});
