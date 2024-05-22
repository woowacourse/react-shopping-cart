import { selector, selectorFamily } from 'recoil';
import { selectedCouponListState } from '../atoms/atoms';
import { selectedCartItemListState } from '../../CartItem/atoms/atoms';
import { cartOrderTotalPriceSelector, deliveryFeeSelector } from '../../CartItem/selectors/selectors';
import { calculateDiscountPrice } from '../../../utils/couponCalculator';
import { sortCouponsByDiscountRate } from '../../../utils/couponSorter';
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

export const couponDiscountPriceSelector = selector({
  key: 'couponDiscountPriceSelector',
  get: ({ get }) => {
    const selectedCouponList = get(selectedCouponListState);
    const selectedCartItemList = get(selectedCartItemListState);
    const totalPrice = get(cartOrderTotalPriceSelector);
    const deliveryFee = get(deliveryFeeSelector);

    return sortCouponsByDiscountRate(selectedCouponList).reduce(
      (acc, cur) => (acc += calculateDiscountPrice(cur, selectedCartItemList, deliveryFee, totalPrice)),
      0,
    );
  },
});
