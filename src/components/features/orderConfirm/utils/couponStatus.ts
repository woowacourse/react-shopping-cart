import { isWithinTimeRange } from './isWithInTimeRange';
import { CartItemType } from '../../cart/types';
import { COUPON_MINIMUM } from '../../../../global/constants';
import { CouponType } from '../types';

export function isCouponUsableNow(
  coupon: CouponType,
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
      const requiredQty = (coupon.buyQuantity ?? 0) + (coupon.getQuantity ?? 0);
      const hasEligible = cartItems.some(
        (item) => item.quantity >= requiredQty
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
