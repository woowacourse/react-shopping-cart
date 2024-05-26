import { atom, selector } from 'recoil';
import { shippingFeeSelector } from './cartItems';

export const applyCouponState = atom({
  key: 'applyCouponState',
  default: 0,
});

export const isShippingFeeDiscountState = atom({
  key: 'isShippingFeeDiscountState',
  default: false,
});

export const finalCouponDiscountSelector = selector({
  key: 'finalCouponDiscountSelector',
  get: ({ get }) => {
    const total = get(applyCouponState);
    const isDiscountShippingFee = get(isShippingFeeDiscountState);
    const shippingFee = get(shippingFeeSelector);
    return isDiscountShippingFee ? total + shippingFee : total;
  },
});
