import { calculateOptimalCouponDiscount } from '../../coupon/utils/business';
import { CalculateOrderParams, OrderCalculation } from '../types/order';

export const calculateOrderTotal = ({
  selectedCartItems,
  selectedCoupons = [],
  isRemoteArea = false,
  currentTime = new Date(),
}: CalculateOrderParams): OrderCalculation => {
  const cartTypeQuantity = selectedCartItems.length;
  const totalQuantity = selectedCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const isFreeShipping = totalPrice >= 100000;
  const baseDeliveryFee = isFreeShipping ? 0 : 3000;
  const remoteAreaFee = isFreeShipping ? 0 : isRemoteArea ? 3000 : 0;
  const initialDeliveryFee = baseDeliveryFee + remoteAreaFee;

  const { totalDiscount: couponDiscountPrice, appliedCoupons } = calculateOptimalCouponDiscount(
    selectedCoupons,
    selectedCartItems,
    totalPrice,
    initialDeliveryFee,
    currentTime
  );

  const hasShippingCoupon = appliedCoupons.some((coupon) => coupon.discountType === 'freeShipping');
  const finalDeliveryFee = hasShippingCoupon ? 0 : initialDeliveryFee;

  const totalPurchasePrice = Math.max(0, totalPrice - couponDiscountPrice + finalDeliveryFee);

  return {
    cartTypeQuantity,
    totalQuantity,
    totalPrice,
    deliveryFee: finalDeliveryFee,
    totalPurchasePrice,
    couponDiscountPrice,
    appliedCoupons,
  };
};
