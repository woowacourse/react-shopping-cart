import { fetchAllCoupons } from '@/api';
import calculateTotalDiscountPrice from '@/services/calculateDiscount';
import initializeCouponStates from '@/services/initializeCouponStates';
import { selector, selectorFamily } from 'recoil';
import { allCartItemStates, allCouponStates } from './atoms';
import { orderAmountSelector } from './selectors';

export const fetchCouponsSelector = selector({
  key: 'fetchCouponsSelector',
  get: async ({ get }) => {
    const allCartItems = get(allCartItemStates);
    const orderAmount = get(orderAmountSelector);
    const allCoupons = await fetchAllCoupons();
    const formattedAllCoupons = initializeCouponStates({
      allCoupons,
      allCartItems,
      orderAmount,
    });

    return formattedAllCoupons;
  },
});

export const isMaxLengthCheckedCouponLengthSelector = selector({
  key: 'isMaxLengthCheckedCouponLengthSelector',
  get: ({ get }) => {
    const allCoupons = get(allCouponStates);

    const MAX_COUPON_LENGTH = 2;

    return (
      allCoupons.filter((coupon) => coupon.isAvailable && coupon.isChecked).length ===
      MAX_COUPON_LENGTH
    );
  },
});

export const isCheckedIndividualCouponSelector = selectorFamily({
  key: 'isCheckedIndividualCouponSelector',
  get:
    (id: number) =>
    ({ get }) => {
      const allCoupons = get(allCouponStates);

      const targetCoupon = allCoupons.find((coupon) => coupon.id === id);
      return targetCoupon ? targetCoupon.isChecked : false;
    },
  set:
    (id: number) =>
    ({ get, set }) => {
      const allCoupons = get(allCouponStates);
      const updatedCoupons = allCoupons.map((coupon) =>
        coupon.id === id ? { ...coupon, isChecked: !coupon.isChecked } : coupon,
      );
      set(allCouponStates, updatedCoupons);
    },
});

export const totalDiscountPriceSelector = selector({
  key: 'totalDiscountPriceSelector',
  get: ({ get }) => {
    const allCoupons = get(allCouponStates);
    const orderAmount = get(orderAmountSelector);
    const checkedCoupons = allCoupons.filter((coupon) => coupon.isChecked);
    const allCartItems = get(allCartItemStates);

    const totalDiscount = checkedCoupons.reduce((acc, coupon) => {
      return acc + calculateTotalDiscountPrice(coupon, orderAmount, allCartItems);
    }, 0);

    return totalDiscount;
  },
});
