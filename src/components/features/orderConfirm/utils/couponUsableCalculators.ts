import { CartItemType } from '../../cart/types';
import { CouponType } from '../types';
import { isWithinTimeRange } from './isWithInTimeRange';

type CouponUsabilityFn = (
  coupon: CouponType,
  cartItems: CartItemType[],
  orderPrice: number
) => boolean;

export const couponUsableCalculators: Record<string, CouponUsabilityFn> = {
  fixed: (coupon, _, orderPrice) => {
    if (coupon.discountType !== 'fixed') return false;
    return orderPrice >= coupon.minimumAmount;
  },
  freeShipping: (coupon, _, orderPrice) => {
    if (coupon.discountType !== 'freeShipping') return false;
    return orderPrice >= coupon.minimumAmount;
  },
  buyXgetY: (coupon, cartItems) => {
    if (coupon.discountType !== 'buyXgetY') return false;
    const requiredQty = (coupon.buyQuantity ?? 0) + (coupon.getQuantity ?? 0);
    return cartItems.some((item) => item.quantity >= requiredQty);
  },
  percentage: (coupon) => {
    if (coupon.discountType !== 'percentage') return false;
    if (!coupon.availableTime) return true;
    return isWithinTimeRange(
      coupon.availableTime.start,
      coupon.availableTime.end
    );
  },
};
