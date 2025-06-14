import { Cart } from '@/api/cart';
import { calculateBogoDiscount } from './calculateCouponDiscount/bogo/calculateBogoDiscount';
import { calculateFixed5000Discount } from './calculateCouponDiscount/calculateFixed5000Discount';
import { calculateFreeShippingDiscount } from './calculateCouponDiscount/calculateFreeShippingDiscount';
import { calculateMiracleSaleDiscount } from './calculateCouponDiscount/calculateMiracleSaleDiscount';

type CouponDiscountCalculator = {
  FIXED5000: (orderPrice: number) => number;
  BOGO: (bogoItems: Cart[]) => number;
  FREESHIPPING: (orderPrice: number, isJejuOrRemoteArea: boolean) => number;
  MIRACLESALE: (orderPrice: number) => number;
};

export const couponDiscountCalculators: CouponDiscountCalculator = {
  FIXED5000: calculateFixed5000Discount,
  BOGO: calculateBogoDiscount,
  FREESHIPPING: calculateFreeShippingDiscount,
  MIRACLESALE: calculateMiracleSaleDiscount,
};
