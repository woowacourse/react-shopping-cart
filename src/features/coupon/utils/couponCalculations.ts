import { CartItem } from '../../cart/types/cart';
import { Coupon } from '../types/coupon';

export const isCouponApplicable = (
  coupon: Coupon,
  orderItems: CartItem[],
  orderPrice: number,
  currentTime: Date = new Date()
): boolean => {
  switch (coupon.discountType) {
    case 'fixed':
      return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;

    case 'percentage':
      if (coupon.availableTime) {
        const startHour = parseInt(coupon.availableTime.start.split(':')[0]);
        const endHour = parseInt(coupon.availableTime.end.split(':')[0]);
        const currentHour = currentTime.getHours();

        if (currentHour < startHour || currentHour >= endHour) return false;
      }
      return true;

    case 'buyXgetY':
      const buyQuantity = coupon.buyQuantity || 2;
      const getQuantity = coupon.getQuantity || 1;
      const setSize = buyQuantity + getQuantity;

      return orderItems.some((item) => item.quantity >= setSize);

    case 'freeShipping':
      return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;

    default:
      return false;
  }
};

export const calculateFixedDiscount = (coupon: Coupon, orderPrice: number): number => {
  if (coupon.discountType !== 'fixed' || !coupon.discount) return 0;
  if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return 0;
  return coupon.discount;
};

export const calculateBuyXGetYDiscount = (coupon: Coupon, items: CartItem[]): number => {
  if (coupon.discountType !== 'buyXgetY') return 0;

  const buyQuantity = coupon.buyQuantity || 2;
  const getQuantity = coupon.getQuantity || 1;
  const setSize = buyQuantity + getQuantity;

  const eligibleItems = items
    .filter((item) => item.quantity >= setSize)
    .sort((a, b) => b.product.price - a.product.price);

  if (eligibleItems.length === 0) return 0;

  const highestPriceItem = eligibleItems[0];
  const freeItemCount = Math.floor(highestPriceItem.quantity / setSize);

  return highestPriceItem.product.price * freeItemCount;
};

export const calculateShippingDiscount = (coupon: Coupon, orderPrice: number, shippingFee: number): number => {
  if (coupon.discountType !== 'freeShipping') return 0;
  if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return 0;
  return shippingFee;
};

export const calculatePercentageDiscount = (coupon: Coupon, orderPrice: number, currentTime?: Date): number => {
  if (coupon.discountType !== 'percentage' || !coupon.discount) return 0;

  if (coupon.availableTime && currentTime) {
    const now = currentTime;
    const startHour = parseInt(coupon.availableTime.start.split(':')[0]);
    const endHour = parseInt(coupon.availableTime.end.split(':')[0]);
    const currentHour = now.getHours();

    if (currentHour < startHour || currentHour >= endHour) return 0;
  }

  return Math.floor(orderPrice * (coupon.discount / 100));
};

export const calculateCouponDiscount = (
  coupon: Coupon,
  orderItems: CartItem[],
  orderPrice: number,
  shippingFee: number,
  currentTime?: Date
): number => {
  switch (coupon.discountType) {
    case 'fixed':
      return calculateFixedDiscount(coupon, orderPrice);
    case 'percentage':
      return calculatePercentageDiscount(coupon, orderPrice, currentTime);
    case 'buyXgetY':
      return calculateBuyXGetYDiscount(coupon, orderItems);
    case 'freeShipping':
      return calculateShippingDiscount(coupon, orderPrice, shippingFee);
    default:
      return 0;
  }
};

export const calculateOptimalCouponDiscount = (
  selectedCoupons: Coupon[],
  orderItems: CartItem[],
  orderPrice: number,
  shippingFee: number,
  currentTime?: Date
): { totalDiscount: number; appliedCoupons: Coupon[] } => {
  if (selectedCoupons.length === 0) {
    return { totalDiscount: 0, appliedCoupons: [] };
  }

  if (selectedCoupons.length === 1) {
    const discount = calculateCouponDiscount(selectedCoupons[0], orderItems, orderPrice, shippingFee, currentTime);
    return { totalDiscount: discount, appliedCoupons: selectedCoupons };
  }

  const [couponA, couponB] = selectedCoupons;

  const discountA = calculateCouponDiscount(couponA, orderItems, orderPrice, shippingFee, currentTime);
  const remainingPriceAB = Math.max(0, orderPrice - discountA);
  const shippingAfterA = couponA.discountType === 'freeShipping' ? 0 : shippingFee;
  const discountB = calculateCouponDiscount(couponB, orderItems, remainingPriceAB, shippingAfterA, currentTime);
  const totalDiscountAB = discountA + discountB;

  const discountB2 = calculateCouponDiscount(couponB, orderItems, orderPrice, shippingFee, currentTime);
  const remainingPriceBA = Math.max(0, orderPrice - discountB2);
  const shippingAfterB = couponB.discountType === 'freeShipping' ? 0 : shippingFee;
  const discountA2 = calculateCouponDiscount(couponA, orderItems, remainingPriceBA, shippingAfterB, currentTime);
  const totalDiscountBA = discountB2 + discountA2;

  return totalDiscountAB >= totalDiscountBA
    ? { totalDiscount: totalDiscountAB, appliedCoupons: [couponA, couponB] }
    : { totalDiscount: totalDiscountBA, appliedCoupons: [couponB, couponA] };
};
