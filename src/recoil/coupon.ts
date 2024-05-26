import { atomFamily, selector } from 'recoil';
import { fetchCoupons } from '../api';
import { CouponType } from '../types';
import { isExpiredCoupon } from '../domain';

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
