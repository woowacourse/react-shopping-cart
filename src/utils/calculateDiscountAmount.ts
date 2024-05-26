import { CartItemProps, CouponProps } from '../types';

export const calculateDiscountAmount = () => {
  const calculateFixedDiscount = (coupon: CouponProps) => {
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (
    coupon: CouponProps,
    orderPrice: number,
  ) => {
    if (coupon.discount) return orderPrice * (coupon.discount / 100);
    return 0;
  };

  const calculateBuyXgetYDiscount = (
    coupon: CouponProps,
    selectedItems: CartItemProps[],
  ) => {
    if (selectedItems.length > 0 && coupon.buyQuantity && coupon.getQuantity) {
      return selectedItems.reduce((total, item) => {
        if (item.quantity === coupon.buyQuantity && coupon.getQuantity) {
          return total + item.product.price * coupon.getQuantity;
        }
        return total;
      }, 0);
    }
    return 0;
  };

  const getCouponDiscountValueByType = (
    coupon: CouponProps,
    selectedItems: CartItemProps[],
    orderPrice: number,
  ) => {
    switch (coupon.discountType) {
      case 'fixed':
        return calculateFixedDiscount(coupon);
      case 'percentage':
        return calculatePercentageDiscount(coupon, orderPrice);
      case 'buyXgetY':
        return calculateBuyXgetYDiscount(coupon, selectedItems);
      default:
        return 0;
    }
  };

  return {
    getCouponDiscountValueByType,
  };
};
