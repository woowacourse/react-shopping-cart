import { CartItemType, FilteredCartItemStateType } from '@/types/cart.type';
import { atom, atomFamily } from 'recoil';
import { cartState, couponState } from '@/store/selectors/dataFetchSelector';

import { Coupon } from '@/types/coupon.type';
import { INIT_CART_ITEM_STATE } from '@/constants/defaultStateValue';
import { ShippingArea } from '@/types/recipe.type';
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

export const shippingAreaState = atom<ShippingArea>({
  key: 'shippingAreaState',
  default: 'normal',
});

export const couponListState = atom<Coupon[]>({
  key: 'couponListState',
  default: couponState,
});

export const selectedCouponListState = atom<Coupon[] | null>({
  key: 'selectedCouponListState',
  default: null,
});
