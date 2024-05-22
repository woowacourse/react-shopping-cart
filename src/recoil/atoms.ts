import { atom, atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { fetchedCartItemsState } from './selectors';

const { persistAtom } = recoilPersist({
  key: 'isCartItemSelected',
  storage: localStorage,
});

export const isCartItemSelectedState = atomFamily<boolean, number>({
  key: 'isCartItemSelected',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const cartItemsState = atom({
  key: 'cartItems',
  default: fetchedCartItemsState,
});
