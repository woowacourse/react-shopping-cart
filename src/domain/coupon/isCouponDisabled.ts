import { Coupon } from '../../types/response';
import { isExpired, isInAvailableTimeRange } from '../../utils/time/time';

export const isCouponDisabled = (coupon: Coupon, orderAmount: number): boolean => {
  if (coupon.minimumAmount !== undefined && orderAmount < coupon.minimumAmount) return true;
  if (coupon.availableTime && !isInAvailableTimeRange(coupon.availableTime)) return true;
  if (isExpired(coupon.expirationDate)) return true;
  return false;
};
