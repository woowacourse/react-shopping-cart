import { isCouponDisabled } from '../utils';
import { Coupon, CartItemTypes } from '../types';
import { calculateCouponPrice } from './calculateCouponPrice';

interface useCouponUIProps {
  coupons: Coupon[];
  selectedCoupons: Coupon[];
  selectedCartItems: CartItemTypes[];
  deliveryFee: number;
}

export function getCouponUIData({
  coupons,
  selectedCoupons,
  selectedCartItems,
  deliveryFee,
}: useCouponUIProps) {
  const couponPrice = calculateCouponPrice({
    selectedCoupons,
    selectedCartItems,
    deliveryFee,
    nowDate: new Date(),
  });

  const couponWithDisabled = coupons.map((coupon) =>
    isCouponDisabled(coupon, selectedCartItems, deliveryFee)
  );

  return {
    couponPrice,
    couponWithDisabled,
  };
}
