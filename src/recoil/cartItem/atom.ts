import { atom } from 'recoil';

import { localStorageEffectForAtom } from '../../utils/localStorageEffectForAtom';

export const selectedCartItemIdListState = atom<number[]>({
  key: 'selectedCartItemIdListState',
  default: [],
  effects: [localStorageEffectForAtom<number[]>('selectedCartItemIdListState')],
});

export const cartItemListState = atom<CartItem[]>({
  key: 'cartItemListState',
  default: [],
});

export const hasExtraDeliveryFeeState = atom<boolean>({
  key: 'hasExtraDeliveryFeeState',
  default: false,
});
