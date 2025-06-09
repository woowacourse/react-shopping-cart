import { Coupon } from '../types';
import { isWithinTimeRange } from './isWithInTimeRange';
import { CartItemType } from '../../cart/types';
import { COUPON_MINIMUM } from '../../../../global/constants';

export function isCouponUsableNow(
  coupon: Coupon,
  cartItems: CartItemType[],
  orderPrice: number
) {
  const now = new Date();
  const expired = now > new Date(coupon.expirationDate);

  switch (coupon.discountType) {
    case 'fixed': {
      const meetsAmount =
        orderPrice >= (coupon.minimumAmount ?? COUPON_MINIMUM.FIXED);
      return !expired && meetsAmount;
    }
    case 'buyXgetY': {
      const hasEligible = cartItems.some(
        (item) => item.quantity >= (coupon.buyQuantity ?? 0)
      );
      return !expired && hasEligible;
    }

    case 'freeShipping': {
      const meetsAmount =
        orderPrice >= (coupon.minimumAmount ?? COUPON_MINIMUM.FREE_SHIPPING);
      return !expired && meetsAmount;
    }

    case 'percentage': {
      if (expired) return false;
      if (coupon.availableTime) {
        return isWithinTimeRange(
          coupon.availableTime.start,
          coupon.availableTime.end
        );
      }
      return true;
    }
  }
}
