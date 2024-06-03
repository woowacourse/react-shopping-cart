import { atom, atomFamily, selector } from 'recoil';
import { fetchedCouponsSelector } from './fetch';
import { CouponType } from '../components/type';

export const discountedPriceState = atom({
  key: 'discountedPriceState',
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
