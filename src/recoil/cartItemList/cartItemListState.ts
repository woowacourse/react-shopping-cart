import { DefaultValue, atom, selector } from 'recoil';
import { requestCartItemList } from '../../apis/requests/cartItem';
import { CartItem } from '../../types/cartItem.type';
import { cartItemQuantityState } from '../cartItem/cartItemQuantityState';

const isCartItemArray = (cartItemList: CartItem[] | DefaultValue): cartItemList is CartItem[] => {
  return (cartItemList as CartItem[]).forEach !== undefined;
};

export const cartItemListStateQuery = selector<CartItem[]>({
  key: 'cartItemListStateQuery',
  get: async () => {
    const result = await requestCartItemList();
    return result;
  },
  set: ({ set }, cartItemList) => {
    if (!isCartItemArray(cartItemList)) return;

    set(cartItemListState, cartItemList);

    cartItemList.forEach(({ cartItemId, quantity }) => {
      set(cartItemQuantityState(cartItemId), quantity);
    });
  },
});

export const cartItemListState = atom<CartItem[]>({
  key: 'cartItemListState',
  default: [],
});
