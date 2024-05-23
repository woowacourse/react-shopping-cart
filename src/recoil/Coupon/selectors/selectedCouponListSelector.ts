import { selectorFamily } from 'recoil';
import { Coupon } from '../../../types/Coupon.type';
import { selectedCouponListState } from '../atoms/selectedCouponListState';

export const selectedCouponListSelector = selectorFamily<boolean, Coupon>({
  key: 'selectedCouponListSelector',
  get:
    (newItem: Coupon) =>
    ({ get }) => {
      const selectedCouponList = get(selectedCouponListState);
      return selectedCouponList.some((item) => item.code === newItem.code);
    },
  set:
    (newItem: Coupon) =>
    ({ set, get }) => {
      const selectedCouponList = get(selectedCouponListState);
      if (!selectedCouponList.some((item) => item.code === newItem.code) && selectedCouponList.length !== 2) {
        set(selectedCouponListState, [...selectedCouponList, newItem]);
      } else {
        set(
          selectedCouponListState,
          selectedCouponList.filter((item) => item.code !== newItem.code),
        );
      }
    },
});
