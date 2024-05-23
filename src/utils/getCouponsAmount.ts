import {
  BuyXGetYCoupon,
  CartItem,
  Coupon,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from '../type';
import { getHHColonMMtoMinutes, iso8601ToDate } from './translateFormat';

import getLastTimeDate from './getLastTimeDate';

const getFixedCouponDiscount = (fixedCoupon: FixedDiscountCoupon, itemsAmount: number) => {
  return itemsAmount >= fixedCoupon.minimumAmount ? fixedCoupon.discount : 0;
};
const getBuyXgetYCouponDiscount = (buyXgetYCoupon: BuyXGetYCoupon, items: CartItem[]) => {
  const overXQuantityItems = [...items].filter(
    (item) => item.quantity >= buyXgetYCoupon.buyQuantity,
  );
  if (overXQuantityItems.length === 0) return 0;
  const overXQuantityItemPrices = overXQuantityItems.map((item) => item.product.price);
  const biggestItemPrice = Math.max(...overXQuantityItemPrices);
  return biggestItemPrice * buyXgetYCoupon.getQuantity;
};

const getFreeShippingCouponDiscount = (
  freeShippingCoupon: FreeShippingCoupon,
  deliveryFee: number,
  itemsAmount: number,
) => {
  return freeShippingCoupon.minimumAmount >= itemsAmount ? deliveryFee : 0;
};

const getPercentageCouponDiscount = (
  percentageCoupon: PercentageDiscountCoupon,
  itemsAmount: number,
) => {
  const nowDate = new Date();
  const nowMinutes = nowDate.getHours() * 60 + nowDate.getMinutes();
  const couponStartMinutes = getHHColonMMtoMinutes(
    percentageCoupon.availableTime.start.slice(0, 5),
  );
  const couponEndMinutes = getHHColonMMtoMinutes(percentageCoupon.availableTime.end.slice(0, 5));
  return couponStartMinutes <= nowMinutes && nowMinutes <= couponEndMinutes
    ? Math.floor((itemsAmount * percentageCoupon.discount) / 100)
    : 0;
};

const getCouponDiscount = (coupon: Coupon, items: CartItem[], deliveryFee: number) => {
  const expirationDate = getLastTimeDate(iso8601ToDate(coupon.expirationDate));
  if (expirationDate < new Date()) return 0;

  const itemsAmount = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  if (coupon.discountType === 'fixed') return getFixedCouponDiscount(coupon, itemsAmount);
  if (coupon.discountType === 'buyXgetY') return getBuyXgetYCouponDiscount(coupon, items);
  if (coupon.discountType === 'freeShipping')
    return getFreeShippingCouponDiscount(coupon, deliveryFee, itemsAmount);
  if (coupon.discountType === 'percentage') return getPercentageCouponDiscount(coupon, itemsAmount);
  return 0;
};
const getCouponsAmount = (coupons: Coupon[], items: CartItem[], deliveryFee: number) => {
  return coupons.reduce((acc, coupon) => acc + getCouponDiscount(coupon, items, deliveryFee), 0);
};

export default getCouponsAmount;
