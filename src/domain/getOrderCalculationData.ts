import { CartItemTypes, Coupon } from '../types';
import {
  calculateCouponPrice,
  getCartItemSummary,
  getDeliveryFee,
} from '../utils';

const DELIVERY_FREE_COUPON_ID = '3';

export function getOrderCalculationData({
  cartItems,
  selectedCartItemIds,
  coupons,
  finalSelectedCouponIds,
  selectedCartItems,
  isChecked,
}: {
  cartItems: CartItemTypes[];
  selectedCartItemIds: string[];
  coupons: Coupon[];
  finalSelectedCouponIds: string[];
  selectedCartItems: CartItemTypes[];
  isChecked: boolean;
}) {
  const { totalPrice } = getCartItemSummary(
    cartItems,
    selectedCartItemIds.map(String)
  );

  const deliveryFee = getDeliveryFee(isChecked, totalPrice);

  const deliveryFreeCoupon = finalSelectedCouponIds.includes(
    DELIVERY_FREE_COUPON_ID
  )
    ? deliveryFee
    : 0;

  const finalSelectedCoupons = coupons.filter((e) =>
    finalSelectedCouponIds.includes(e.id.toString())
  );

  const couponDiscountAmount = calculateCouponPrice({
    selectedCoupons: finalSelectedCoupons,
    selectedCartItems,
    deliveryFee,
    nowDate: new Date(),
  });

  return {
    totalPrice,
    deliveryFee,
    deliveryFreeCoupon,
    couponDiscountAmount,
  };
}
