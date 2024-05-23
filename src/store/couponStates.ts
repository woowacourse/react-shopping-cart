import { fetchAllCoupons } from '@/api';
import initializeCouponStates from '@/services/initializeCouponStates';
import selectMaxDiscountCase from '@/services/selectMaxDiscountCase';
import { FormattedCoupon } from '@/types';
import { atom, selector, selectorFamily } from 'recoil';
import { allCartItemStates, orderAmountSelector } from './cartStates';

export const allCouponStates = atom<FormattedCoupon[] | []>({
  key: 'allCoupons',
  default: [],
});

export const initializeCouponStatesSelector = selector({
  key: 'initializeCouponStatesSelector',
  get: ({ get }) => {
    return get(allCouponStates);
  },
  set: ({ set }) => {
    set(allCouponStates, []);
  },
});

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

export const totalMaxDiscountPriceSelector = selector({
  key: 'totalMaxDiscountPriceSelector',
  get: ({ get }) => {
    const allCoupons = get(allCouponStates);
    const orderAmount = get(orderAmountSelector);
    const checkedCoupons = allCoupons.filter((coupon) => coupon.isChecked);
    const allCartItems = get(allCartItemStates);

    return selectMaxDiscountCase(checkedCoupons, orderAmount, allCartItems);
  },
});
