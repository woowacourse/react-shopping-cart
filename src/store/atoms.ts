import { CartItemType, FilteredCartItemStateType } from '@/types/cart.type';
import { atom, atomFamily } from 'recoil';

import { INIT_CART_ITEM_STATE } from '@/constants/defaultStateValue';
import { cartState } from '@/store/selectors/dataFetchSelector';
import localStorageEffect from '@/store/localStorageEffect';

export const filteredCartItemState = atomFamily<
  FilteredCartItemStateType,
  number
>({
  key: 'cartItemState',
  default: INIT_CART_ITEM_STATE,
  effects_UNSTABLE: (id) => [localStorageEffect(`cartItemState_${id}`)],
});

export const cartListState = atom<CartItemType[]>({
  key: 'cartListState',
  default: cartState,
});

export const shippingAreaState = atom({
  key: 'shippingAreaState',
  default: 'normal',
});
