import { selector, selectorFamily } from 'recoil';
import { selectedCouponListState } from '../atoms/atoms';
import { Coupon } from '../../../types/Coupon.type';

export const selectedCouponListSelector = selectorFamily<boolean, Coupon>({
  key: 'selectedCouponListSelector',
  get:
    (newCoupon: Coupon) =>
    ({ get }) => {
      const selectedCouponList = get(selectedCouponListState);
      return selectedCouponList.some((coupon) => coupon.id === newCoupon.id);
    },
  set:
    (newCoupon: Coupon) =>
    ({ set, get }) => {
      const selectedCouponList = get(selectedCouponListState);
      const isSelected = selectedCouponList.some((coupon) => coupon.id === newCoupon.id);

      set(
        selectedCouponListState,
        isSelected
          ? selectedCouponList.filter((coupon) => coupon.id !== newCoupon.id)
          : [...selectedCouponList, newCoupon],
      );
    },
});

export const isCouponListMaxLength = selector({
  key: 'isCouponListMaxLength',
  get: ({ get }) => {
    const selectedCouponList = get(selectedCouponListState);
    return selectedCouponList.length >= 2;
  },
});
