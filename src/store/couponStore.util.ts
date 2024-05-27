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

export const couponCalculator = (
  activeCoupons: CouponType[],
  products: CartItemType[],
  orderAmount: number,
  totalShippingFee: number,
): number => {
  let maxDiscount = 0;

  activeCoupons.forEach((coupon) => {
    let bestDiscount = 0;

    products.forEach((product) => {
      const discount = applyCoupon(coupon, product, totalShippingFee, orderAmount);
      if (discount > bestDiscount) {
        bestDiscount = discount;
      }
    });

    maxDiscount += bestDiscount;
  });

  return maxDiscount;
};
