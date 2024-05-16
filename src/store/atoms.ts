import { CartItemType, FilteredCartItemStateType } from '@/types/cart.type';
import { atom, atomFamily } from 'recoil';

import { INIT_CART_ITEM_STATE } from '@/constants/defaultStateValue';
import { cartState } from './selectors/dataFetchSelector';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});

export const filteredCartItemState = atomFamily<
  FilteredCartItemStateType,
  number
>({
  key: 'cartItemState',
  default: INIT_CART_ITEM_STATE,
  effects_UNSTABLE: [persistAtom],
});

export const cartListState = atom<CartItemType[]>({
  key: 'cartListState',
  default: cartState,
});
