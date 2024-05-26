import { CartItems } from '../types/Item';
import { Coupon } from '../types/coupon';

const calculateFixedDiscount = (coupon: Coupon) => {
  return coupon.discount ?? 0;
};

const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
  return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
};

const calculateBuyXgetYDiscount = (buyQuantity: number, items: CartItems[]) => {
  const exceedsThresholdCountItems = items.filter((item) => {
    return item.quantity >= buyQuantity;
  });
  if (exceedsThresholdCountItems.length === 0) {
    return 0;
  }
  return Math.max(
    ...exceedsThresholdCountItems.map((item) => item.product.price),
  );
};

export {
  calculateFixedDiscount,
  calculatePercentageDiscount,
  calculateBuyXgetYDiscount,
};
