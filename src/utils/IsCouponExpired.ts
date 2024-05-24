import { Coupon } from '../types/Coupon';

/**
 * 만료일과 현재 날짜를 비교하여 쿠폰 유효성 검사
 * @returns { boolean }
 */
const isCouponExpired = (coupon: Coupon) => {
  const today = new Date();
  const expiration = new Date(coupon.expirationDate);
  return expiration < today;
};

export default isCouponExpired;
