import { atom, atomFamily } from 'recoil';
import { fetchCartItem, fetchCouponList, getCartCounts } from '../../api';
import { Coupon } from '../../types/coupon';
import { Cart } from '../../types/cart';

export const cartData = atom<Cart[]>({
  key: 'cartData',
  default: fetchCartItem(),
});

export const cartQuantity = atom<number>({
  key: 'cartQuantity',
  default: getCartCounts(),
});

export const cartItemQuantityState = atomFamily<number, number>({
  key: 'cartItemQuantityState',
  default: async (itemId) => {
    const cartData = await fetchCartItem();
    const cartItem = cartData.find((item: Cart) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  },
});

export const cartItemCheckState = atomFamily<boolean, number>({
  key: 'cartItemCheckState',
  default: false,
});

export const couponList = atom<Coupon[]>({
  key: 'couponList',
  default: fetchCouponList(),
});

export const specialZoneCheckState = atom<boolean>({
  key: 'remoteAreaCheckboxState',
  default: false,
});

export const couponCheckState = atomFamily<boolean, string>({
  key: 'couponCheckState',
  default: false,
});

export const couponDiscountAmount = atom<number>({
  key: 'couponDiscountAmount',
  default: 0,
});
