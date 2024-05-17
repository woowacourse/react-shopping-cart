import { atom, selector } from 'recoil';
import { CartItem } from '../../apis/cartItem/cartItem.type';
import { requestCartItemList } from '../../apis/cartItemList/cartItemList';
import { CartItem } from '../../components/CartItem/CartItem.style';

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
