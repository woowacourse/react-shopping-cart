import { Content } from '../types/cartItems';
import { CouponsResponse } from '../types/coupons';

type CouponRule = (
  coupon: CouponsResponse,
  options: {
    orderPrice: number;
    selectedItems: Content[];
    selectedCoupons: CouponsResponse[];
  }
) => boolean;

const STARTED_HOURS = 4;
const ENDED_HOURS = 7;

export const couponRules: Record<string, CouponRule> = {
  FIXED5000: (_coupon, { orderPrice }) => orderPrice < 100000,

  BOGO: (_coupon, { selectedItems }) => {
    const sameProductCounts = new Map<number, number>();
    selectedItems.forEach((item) => {
      const id = item.product.id;
      sameProductCounts.set(id, (sameProductCounts.get(id) ?? 0) + item.quantity);
    });
    return !Array.from(sameProductCounts.values()).some((count) => count >= 2 && count % 2 === 0);
  },

  FREESHIPPING: (_coupon, { orderPrice }) => orderPrice < 50000,

  MIRACLESALE: () => {
    const hour = new Date().getHours();
    return !(STARTED_HOURS < hour && hour < ENDED_HOURS);
  },
};
