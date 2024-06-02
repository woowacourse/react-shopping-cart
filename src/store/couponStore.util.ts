import { CartItemType, CouponType } from '../types';

const applyCoupon = (
  coupon: CouponType,
  product: CartItemType,
  totalShippingFee: number,
  orderAmount: number,
): number => {
  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount ?? 0;
    case 'buyXgetY':
      if (product.quantity >= (coupon.buyQuantity ?? 0)) {
        return product.product.price * (coupon.getQuantity ?? 0);
      }
      return 0;
    case 'freeShipping':
      return totalShippingFee;
    case 'percentage':
      if (coupon.discount) return orderAmount * (coupon.discount / 100);
      return 0;
    default:
      return 0;
  }
};

interface CouponCalculatorProps {
  activeCoupons: CouponType[];
  checkoutProducts: CartItemType[];
  orderAmount: number;
  totalShippingFee: number;
}

export const couponCalculator = ({
  activeCoupons,
  checkoutProducts,
  orderAmount,
  totalShippingFee,
}: CouponCalculatorProps): number => {
  return activeCoupons.reduce((maxDiscount, coupon) => {
    const bestDiscount = checkoutProducts.reduce((bestDiscount, product) => {
      const discount = applyCoupon(coupon, product, totalShippingFee, orderAmount);
      return discount > bestDiscount ? discount : bestDiscount;
    }, 0);

    return maxDiscount + bestDiscount;
  }, 0);
};
