import { CartProduct } from '../types/cart';
import { Coupon } from '../types/coupon';

interface CouponCalculationParams {
  coupons: Coupon[];
  products: CartProduct[];
  total: number;
  shippingFee: number;
}

export const calculateCouponDiscount = ({
  coupons,
  products,
  total,
  shippingFee,
}: CouponCalculationParams): number => {
  return coupons.reduce((totalDiscount, coupon) => {
    const discount = calculateSingleCouponDiscount(coupon, products, total, shippingFee);
    return totalDiscount + discount;
  }, 0);
};

const calculateSingleCouponDiscount = (
  coupon: Coupon,
  products: CartProduct[],
  total: number,
  shippingFee: number,
): number => {
  switch (coupon.discountType) {
    case 'fixed':
      return calculateFixed(coupon);

    case 'percentage':
      return calculatePercentage(coupon, total);

    case 'buyXgetY':
      return calculateBOGO(coupon, products);

    case 'freeShipping':
      return calculateFreeShipping(coupon, total, shippingFee);

    default:
      return 0;
  }
};

const calculateFixed = (coupon: Coupon): number => {
  if (!coupon.discount) {
    return 0;
  }

  return coupon.discount;
};

const calculatePercentage = (coupon: Coupon, total: number): number => {
  if (!coupon.discount) {
    return 0;
  }

  return Math.floor((total * coupon.discount) / 100);
};

const calculateBOGO = (coupon: Coupon, products: CartProduct[]): number => {
  if (!coupon.buyQuantity || !coupon.getQuantity) {
    return 0;
  }

  const requiredQuantity = coupon.buyQuantity + coupon.getQuantity;

  const discountableItems = products
    .filter((item) => item.quantity >= requiredQuantity)
    .map((item) => {
      const numberOfSets = Math.floor(item.quantity / requiredQuantity);
      return {
        productId: item.id,
        unitPrice: item.product.price,
        discountSets: numberOfSets,
        totalDiscount: item.product.price * numberOfSets * (coupon.getQuantity as number),
      };
    });

  if (discountableItems.length === 0) {
    return 0;
  }

  const maxDiscountItem = discountableItems.reduce((max, current) =>
    current.totalDiscount > max.totalDiscount ? current : max,
  );

  return maxDiscountItem.totalDiscount;
};

const calculateFreeShipping = (coupon: Coupon, total: number, shippingFee: number): number => {
  if (!coupon.minimumAmount) {
    return shippingFee;
  }

  if (total >= coupon.minimumAmount) {
    return shippingFee;
  }

  return 0;
};
