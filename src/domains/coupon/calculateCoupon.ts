import type {
  BogoCoupon,
  CouponType,
  MiracleSaleCoupon,
} from "../../types/response";
import type { CartItemType } from "../../types/response";

export const getBogoProductPrice = (orderItems: CartItemType[]) => {
  return Math.max(
    ...orderItems
      .filter((item: CartItemType) => item.quantity >= 2)
      .map((item) => item.product.price)
  );
};

export const getBogoDiscountAmount = (
  coupon: BogoCoupon,
  { bogoProductPrice }: { bogoProductPrice: number }
) => {
  const totalDiscount = bogoProductPrice * coupon.getQuantity;
  return totalDiscount;
};

export const getPercentageDiscountAmount = (
  coupon: MiracleSaleCoupon,
  { originTotalPrice }: { originTotalPrice: number }
) => {
  return originTotalPrice * (coupon.discount / 100);
};

interface CouponCalculateContext {
  originTotalPrice: number;
  bogoProductPrice: number;
  deliveryFee: number;
}

export const getTotalDiscountPrice = (
  checkedCoupons: Map<number, CouponType>,
  { originTotalPrice, bogoProductPrice, deliveryFee }: CouponCalculateContext
) => {
  const discountPrices = Array.from(checkedCoupons.values()).map((coupon) => {
    if (coupon.discountType === "fixed") {
      return coupon.discount;
    }
    if (coupon.discountType === "percentage") {
      return getPercentageDiscountAmount(coupon, {
        originTotalPrice,
      });
    }
    if (coupon.discountType === "buyXgetY") {
      return getBogoDiscountAmount(coupon, { bogoProductPrice });
    }
    if (coupon.discountType === "freeShipping") {
      return deliveryFee;
    }
    return 0;
  });

  return discountPrices.reduce((acc, curr) => acc + curr, 0);
};

export const getDiscountedTotalOrderPrice = (
  originTotalPrice: number,
  discountPrice: number
) => {
  return originTotalPrice - discountPrice;
};
