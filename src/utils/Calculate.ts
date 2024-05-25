import { CartItems } from '../types/Item';
import { Coupon } from '../types/coupon';

const calculateFixedDiscount = (coupon: Coupon) => {
  return coupon.discount ?? 0;
};

const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
  return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
};

const calculateBuyXgetYDiscount = (items: CartItems[]) => {
  const exceedsThresholdCountItems = items.filter((item) => item.quantity >= 2);
  return Math.max(
    ...exceedsThresholdCountItems.map((item) => item.product.price),
  );
};

export {
  calculateFixedDiscount,
  calculatePercentageDiscount,
  calculateBuyXgetYDiscount,
};
