import { calculateCouponPrice, isCouponDisabled } from '../utils';
import { Coupon, CartItemTypes } from '../types';

interface useCouponUIProps {
  coupons: Coupon[];
  selectedCouponIds: string[];
  selectedCartItems: CartItemTypes[];
  deliveryFee: number;
}

export function useCouponUI({
  coupons,
  selectedCouponIds,
  selectedCartItems,
  deliveryFee,
}: useCouponUIProps) {
  const couponPrice = calculateCouponPrice({
    couponIds: selectedCouponIds,
    coupons,
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
