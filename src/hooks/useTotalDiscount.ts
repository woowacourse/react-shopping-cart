import { useMemo } from 'react';
import { calculateCouponDiscount } from '../components/Modal/utils/calculateCouponDiscount';
import type { Coupon } from '../types/coupon';
import type { CartItemType } from '../types/cartItem';

export function useTotalDiscount(selectedCoupons: Coupon[], orderAmount: number, items: CartItemType[]) {
  return useMemo(
    () => selectedCoupons.reduce((sum, coupon) => sum + calculateCouponDiscount({ coupon, orderAmount, items }), 0),
    [selectedCoupons, orderAmount, items]
  );
}
