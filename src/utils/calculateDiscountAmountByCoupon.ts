import { CartItem, Coupon } from '../type';

interface Props {
  coupon: Coupon;
  cartItems: CartItem[];
  shippingCost: number;
  currentTotalAmount: number;
}

export function calculateDiscountAmountByCoupon({
  coupon,
  cartItems,
  shippingCost,
  currentTotalAmount,
}: Props) {
  const getFixedDiscountAmount = (coupon: Coupon) => {
    return coupon.discount ?? 0;
  };

  const getPercentageDiscountAmount = (coupon: Coupon, currentTotalAmount: number) => {
    return Math.floor((currentTotalAmount * (coupon.discount ?? 0)) / 100);
  };

  const getFreeItemDiscountAmount = (coupon: Coupon) => {
    if (!coupon.getQuantity || !coupon.buyQuantity) return 0;

    const mostExpensiveProductPrice = Math.max(
      ...cartItems
        .filter((item) => coupon.buyQuantity && item.quantity > coupon.buyQuantity)
        .map((item) => item.product.price),
    );
    return mostExpensiveProductPrice * coupon.getQuantity;
  };

  const getFreeShippingDiscountAmount = () => {
    return shippingCost;
  };

  switch (coupon.discountType) {
    case 'fixed':
      return getFixedDiscountAmount(coupon);
    case 'percentage':
      return getPercentageDiscountAmount(coupon, currentTotalAmount);
    case 'buyXgetY':
      return getFreeItemDiscountAmount(coupon);
    case 'freeShipping':
      return getFreeShippingDiscountAmount();
    default:
      return 0;
  }
}
