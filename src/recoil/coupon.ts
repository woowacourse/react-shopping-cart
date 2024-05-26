import { atomFamily, selector } from 'recoil';
import { fetchCoupons } from '../api';
import { CouponType } from '../types';
import { calculateDiscount, isExpiredCoupon } from '../domain';
import { selectedCartItemListSelector } from './cartItem';
import { shippingFeeSelector } from './shipping';
import { totalPriceSelector } from './order';
import getPermutations from '../utils/getPermutaions';

/**
 * 사용 가능한 쿠폰 리스트
 */
export const couponListSelector = selector<CouponType[]>({
  key: 'couponListSelector',
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons.filter(
      ({ expirationDate }) => !isExpiredCoupon(expirationDate)
    );
  },
});

/**
 * 쿠폰 code로 특정 쿠폰 찾기
 */
export const getCouponWithCode = selector({
  key: 'getCouponWithCode',
  get:
    ({ get }) =>
    (code: string) => {
      const couponList = get(couponListSelector);
      return couponList.find((coupon) => coupon.code === code);
    },
});

/**
 * 개별 쿠폰의 선택 여부.
 * key는 Coupon의 code(string)
 */
export const couponSelectedState = atomFamily<boolean, string>({
  key: 'couponSelectedState',
  default: false,
});

/**
 * 선택된 쿠폰 리스트
 */
export const selectedCouponListSelector = selector({
  key: 'selectedCouponListSelector',
  get: ({ get }) => {
    const couponList = get(couponListSelector);
    return couponList.filter(({ code }) => get(couponSelectedState(code)));
  },
});

export const totalDiscountSelector = selector({
  key: 'totalDiscountSelector',
  get: ({ get }) => {
    const totalPrice = get(totalPriceSelector);
    const shippingFee = get(shippingFeeSelector);
    const items = get(selectedCartItemListSelector);
    const coupons = get(selectedCouponListSelector);

    // 적용 순서에 따라 가능한 모든 할인 금액을 계산
    const couponPermutations = getPermutations<CouponType>(coupons);
    const availableDiscounts = couponPermutations.map((coupons) => {
      return coupons.reduce((totalDiscount, coupon) => {
        const calculateArgs = { totalPrice, coupon, shippingFee, items };
        return totalDiscount + calculateDiscount(calculateArgs);
      }, 0);
    });

    // 최대값 반환
    return Math.max(...availableDiscounts);
  },
});
