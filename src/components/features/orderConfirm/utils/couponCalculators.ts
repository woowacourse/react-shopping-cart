import { DELIVERY_FEE } from '../../../../global/constants';
import { CartItemType } from '../../cart/types';
import {
  BuyXGetYCouponType,
  CouponType,
  FixedCouponType,
  FreeShippingCouponType,
  PercentageCouponType,
} from '../types';
import { isWithinTimeRange } from './isWithInTimeRange';

type CalculatorFn = (
  coupon: CouponType,
  products: CartItemType[],
  isIslandAreaSelected: boolean
) => number;

const fixedCalculator: CalculatorFn = (coupon, products) => {
  const cartTotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const { discount, minimumAmount } = coupon as FixedCouponType;
  return cartTotal >= minimumAmount ? discount : 0;
};

const percentageCalculator: CalculatorFn = (coupon, products) => {
  const cartTotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const { discount, availableTime } = coupon as PercentageCouponType;
  if (availableTime) {
    const { start, end } = availableTime;
    if (!isWithinTimeRange(start, end)) return 0;
  }
  return Math.floor((cartTotal * discount) / 100);
};

const buyXgetYCalculator: CalculatorFn = (coupon, products) => {
  const { buyQuantity, getQuantity } = coupon as BuyXGetYCouponType;
  const requiredQuantity = buyQuantity + getQuantity;

  const eligibleItems = products.filter(
    (item) => item.quantity >= requiredQuantity
  );

  if (eligibleItems.length > 0) {
    const maxPrice = Math.max(
      ...eligibleItems.map((item) => item.product.price)
    );
    return maxPrice;
  }
  return 0;
};

const freeShippingCalculator: CalculatorFn = (
  coupon,
  products,
  isIslandAreaSelected
) => {
  const cartTotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const { minimumAmount } = coupon as FreeShippingCouponType;
  if (cartTotal >= minimumAmount) {
    return isIslandAreaSelected ? DELIVERY_FEE.EXTRA : DELIVERY_FEE.STANDARD;
  }
  return 0;
};

export const couponCalculators: Record<string, CalculatorFn> = {
  fixed: fixedCalculator,
  percentage: percentageCalculator,
  buyXgetY: buyXgetYCalculator,
  freeShipping: freeShippingCalculator,
};
