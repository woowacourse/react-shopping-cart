import { CartItem } from '../../cart/types/cart';
import { Coupon } from '../types/coupon';
import { calculateCouponDiscount } from './singleCouponCalculator';

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
