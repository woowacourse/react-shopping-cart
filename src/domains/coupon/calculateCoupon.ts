import type { CouponType, MiracleSaleCoupon } from "../../types/response";
import type { CartItemType } from "../../types/response";

export const getBogoItems = (
  orderItems: CartItemType[],
  buyQuantity: number
) => {
  const bogoItems = orderItems.filter((item) => item.quantity >= buyQuantity);
  const maxPriceBogoItems = bogoItems.reduce((maxItem, currentItem) =>
    currentItem.product.price > maxItem.product.price ? currentItem : maxItem
  );
  return maxPriceBogoItems;
};

export const getPercentageDiscountAmount = (
  coupon: MiracleSaleCoupon,
  { originTotalPrice }: { originTotalPrice: number }
) => {
  return originTotalPrice * (coupon.discount / 100);
};

interface CouponCalculateContext {
  originTotalPrice: number;
  bogoItems: CartItemType[];
  deliveryFee: number;
}

export const getTotalDiscountPrice = (
  checkedCoupons: Map<number, CouponType>,
  { originTotalPrice, deliveryFee }: CouponCalculateContext
) => {
  const checkedCouponsArray = Array.from(checkedCoupons.values());
  const discountPrices = checkedCouponsArray.map((coupon) => {
    if (coupon.discountType === "fixed") {
      return coupon.discount;
    }
    if (coupon.discountType === "percentage") {
      return getPercentageDiscountAmount(coupon, {
        originTotalPrice,
      });
    }
    if (coupon.discountType === "freeShipping") {
      return deliveryFee;
    }
    if (coupon.discountType === "buyXgetY") {
      return 0;
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
