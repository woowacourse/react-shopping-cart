import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { shippingFeeSelector } from './cartItems';
import { fetchedCouponsSelector } from './fetch';
import { CouponType } from '../components/type';

export const applyCouponState = atom({
  key: 'applyCouponState',
  default: 0,
});

export const isShippingFeeDiscountState = atom({
  key: 'isShippingFeeDiscountState',
  default: false,
});

export const couponSelectedState = atomFamily<boolean, number>({
  key: 'couponSelectedState',
  default: false,
});

export const selectedCouponsSelector = selector({
  key: 'selectedCouponsSelector',
  get: ({ get }) => {
    return get(fetchedCouponsSelector).filter((coupon: CouponType) => {
      return get(couponSelectedState(coupon.id));
    });
  },
});

/**
 *
 * 두개의 쿠폰을 모두 선택했는지의 여부.
 * 총 2개의 쿠폰이 선택되고, 해당 쿠폰이 선택되지 않았다면 true return
 */
export const isDoubleCouponAppliedSelector = selectorFamily({
  key: 'isDoubleCouponAppliedSelector',
  get:
    (id: number) =>
    ({ get }) => {
      return (
        get(selectedCouponsSelector).length >= 2 &&
        !get(couponSelectedState(id))
      );
    },
});

export const couponIds = selector({
  key: 'couponIds',
  get: ({ get }) => {
    return get(selectedCouponsSelector).map((coupon) => {
      return coupon.id;
    });
  },
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
