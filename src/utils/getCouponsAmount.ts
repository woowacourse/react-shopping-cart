import { BuyXGetYCoupon, CartItem, Coupon, PercentageDiscountCoupon } from '../type';

import checkIsAvailableCoupon from './checkIsAvailableCoupon';

const getBuyXgetYCouponDiscount = (buyXgetYCoupon: BuyXGetYCoupon, items: CartItem[]) => {
  const overXQuantityItems = [...items].filter(
    (item) => item.quantity >= buyXgetYCoupon.buyQuantity,
  );
  if (overXQuantityItems.length === 0) return 0;
  const overXQuantityItemPrices = overXQuantityItems.map((item) => item.product.price);
  const biggestItemPrice = Math.max(...overXQuantityItemPrices);
  return biggestItemPrice * buyXgetYCoupon.getQuantity;
};

const getPercentageCouponDiscount = (
  percentageCoupon: PercentageDiscountCoupon,
  itemsAmount: number,
) => {
  return Math.floor((itemsAmount * percentageCoupon.discount) / 100);
};

const getCouponDiscount = (coupon: Coupon, items: CartItem[], deliveryFee: number) => {
  if (!checkIsAvailableCoupon(coupon, items, deliveryFee)) return 0;

  const itemsAmount = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  if (coupon.discountType === 'fixed') return coupon.discount;
  if (coupon.discountType === 'buyXgetY') return getBuyXgetYCouponDiscount(coupon, items);
  if (coupon.discountType === 'freeShipping') return deliveryFee;
  if (coupon.discountType === 'percentage') return getPercentageCouponDiscount(coupon, itemsAmount);
  return 0;
};
const getCouponsAmount = (coupons: Coupon[], items: CartItem[], deliveryFee: number) => {
  return coupons.reduce((acc, coupon) => acc + getCouponDiscount(coupon, items, deliveryFee), 0);
};

export default getCouponsAmount;
