import { Coupon } from '../../../types/Coupon.type';

/**
 * 여러 개의 쿠폰을 사용할 때 적용 순서에 따라 할인 금액이 달라질 수 있으므로 할인 금액이 더 큰 값을 기준으로 쿠폰을 정렬합니다.
 * 퍼센티지 할인 쿠폰을 배열의 앞부분에 배치하고, 나머지 할인 유형의 쿠폰을 뒤에 배치합니다.
 */
export const sortCouponsByDiscountRate = (coupons: Coupon[]) => {
  return coupons
    .filter((coupon) => coupon.discountType === 'percentage')
    .concat(coupons.filter((coupon) => coupon.discountType !== 'percentage'));
};
