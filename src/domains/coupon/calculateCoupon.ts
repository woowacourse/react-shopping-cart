import type { CouponType, MiracleSaleCoupon } from "../../types/response";

const getCouponCombinations = (coupons: CouponType[]) => {
  if (coupons.length === 1) return [coupons];

  const combinations = [];
  for (let i = 0; i < coupons.length; i++) {
    for (let j = i + 1; j < coupons.length; j++) {
      combinations.push([coupons[i], coupons[j]]);
    }
  }
  return combinations;
};

export const getMaxDiscountCombinations = (
  validCoupons: CouponType[],
  context: {
    originOrderPrice: number;
    deliveryFee: number;
  }
) => {
  const coupons = validCoupons.filter(
    (coupon) => coupon.discountType !== "buyXgetY"
  );
  const combinations = getCouponCombinations(coupons);
  if (combinations.length === 0) return [];

  const maxDiscountCombination = combinations.reduce((best, current) => {
    const currentDiscount = current[1]
      ? getDiscountAmountByType(current[0], context) +
        getDiscountAmountByType(current[1], context)
      : getDiscountAmountByType(current[0], context);
    const bestDiscount = best[1]
      ? getDiscountAmountByType(best[0], context) +
        getDiscountAmountByType(best[1], context)
      : getDiscountAmountByType(best[0], context);

    return currentDiscount > bestDiscount ? current : best;
  }, combinations[0]);

  return maxDiscountCombination;
};

export const getPercentageDiscountAmount = (
  coupon: MiracleSaleCoupon,
  { originOrderPrice }: { originOrderPrice: number }
) => {
  return originOrderPrice * (coupon.discount / 100);
};

const getDiscountAmountByType = (
  coupon: CouponType,
  {
    originOrderPrice,
    deliveryFee,
  }: { originOrderPrice: number; deliveryFee: number }
) => {
  if (coupon.discountType === "fixed") {
    return coupon.discount;
  }
  if (coupon.discountType === "percentage") {
    return getPercentageDiscountAmount(coupon, {
      originOrderPrice,
    });
  }
  if (coupon.discountType === "freeShipping") {
    return deliveryFee;
  }
  if (coupon.discountType === "buyXgetY") {
    return 0;
  }
  return 0;
};

interface CouponCalculateContext {
  originOrderPrice: number;
  deliveryFee: number;
}

export const getTotalDiscountPrice = (
  checkedCoupons: Map<number, CouponType>,
  { originOrderPrice, deliveryFee }: CouponCalculateContext
) => {
  const checkedCouponsArray = Array.from(checkedCoupons.values());
  const discountPrices = checkedCouponsArray.map((coupon) =>
    getDiscountAmountByType(coupon, { originOrderPrice, deliveryFee })
  );

  return discountPrices.reduce((acc, curr) => acc + curr, 0);
};

export const getDiscountedTotalPrice = (
  originOrderPrice: number,
  discountPrice: number
) => {
  return originOrderPrice - discountPrice;
};
