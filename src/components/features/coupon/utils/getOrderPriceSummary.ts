import {
  calculateDeliveryFee,
  calculateOrderPrice,
  CartItemType,
} from '../../cart';
import { Coupon } from '../models';

interface OrderPriceSummaryParams {
  orderItems: CartItemType[];
  isRemoteArea: boolean;
  coupons: Coupon[] | null;
  isCouponApplied: (id: number) => boolean;
}

export const getOrderPriceSummary = ({
  orderItems,
  isRemoteArea,
  coupons,
  isCouponApplied,
}: OrderPriceSummaryParams) => {
  const orderPrice = calculateOrderPrice(orderItems);
  const discountAmount =
    coupons
      ?.filter((coupon) => isCouponApplied(coupon.data.id))
      .reduce((acc, item) => acc + item.discountAmount, 0) ?? 0;
  const deliveryFee = calculateDeliveryFee(orderPrice, isRemoteArea);
  const paymentPrice = orderPrice - discountAmount + deliveryFee;

  return {
    orderPrice,
    discountAmount,
    deliveryFee,
    paymentPrice,
  };
};
