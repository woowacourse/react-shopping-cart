import { Coupon } from '../types/Coupon';

/**
 * 만료일과 현재 날짜를 비교하여 쿠폰 유효성 검사
 * @returns { boolean }
 */
const couponValidator = (coupon: Coupon) => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  return !isCouponExpired(coupon.expirationDate);
};

export default couponValidator;
