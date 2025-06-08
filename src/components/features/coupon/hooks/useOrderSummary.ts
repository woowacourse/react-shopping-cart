import { useMemo } from 'react';
import {
  calculateOrderPrice,
  calculateDeliveryFee,
  type CartItemType,
} from '../../cart';
import Coupon from '../models/coupon';

interface UseOrderPriceSummaryParams {
  orderItems: CartItemType[];
  isRemoteArea: boolean;
  coupons: Coupon[] | null;
  isCouponApplied: (id: number) => boolean;
}

export function useOrderPriceSummary({
  orderItems,
  isRemoteArea,
  coupons,
  isCouponApplied,
}: UseOrderPriceSummaryParams) {
  const orderPrice = useMemo(
    () => calculateOrderPrice(orderItems),
    [orderItems]
  );

  const discountAmount = useMemo(
    () =>
      coupons
        ?.filter((item) => isCouponApplied(item.data.id))
        .reduce((acc, item) => acc + item.discountAmount, 0) ?? 0,
    [coupons, isCouponApplied]
  );

  const deliveryFee = useMemo(
    () => calculateDeliveryFee(orderPrice, isRemoteArea),
    [orderPrice, isRemoteArea]
  );

  const paymentPrice = useMemo(
    () => orderPrice - discountAmount + deliveryFee,
    [orderPrice, discountAmount, deliveryFee]
  );

  return {
    orderPrice,
    discountAmount,
    deliveryFee,
    paymentPrice,
  };
}
