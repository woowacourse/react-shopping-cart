import { atom, selector } from 'recoil';
import { requestCartItemList } from '../../apis/cartItemList/cartItemList';

export const cartItemListState = atom<CartItem[]>({
  key: 'cartItemListState',
  default: [],
});

export const cartItemListQuery = selector<CartItem[]>({
  key: 'cartItemListQuery',
  get: async () => {
    const result = await requestCartItemList();
    return result;
  },
});
