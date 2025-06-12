export type { CouponType, ClientCouponType } from '@entities/coupon/type/coupon.type';
export { COUPON_RULE } from '@entities/coupon/constants/couponRule';

export { getCoupons } from '@entities/coupon/api/getCoupons';
export { useCoupon } from '@entities/coupon/model/useCoupon';
export { useClientCoupon } from '@entities/coupon/model/useClientCoupon';

export {
  calculateCouponDiscount,
  calculateCouponDiscountTotalPrice,
  recommendCouponComposition,
} from '@entities/coupon/utils/calculateCoupon';
export { validateCoupon } from '@entities/coupon/utils/validateCoupon';
export { formatTime, formatAvailableTime } from '@entities/coupon/utils/formatter';
