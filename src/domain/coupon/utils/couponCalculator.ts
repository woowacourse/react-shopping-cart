import { Cart } from "../../../api/cart";
import { Coupon } from "../../../api/coupon";

export interface CouponCalculationResult {
  totalDiscount: number;
  finalShippingFee: number;
  hasFreeShipping: boolean;
  finalDiscount: number;
}

interface PartialResult {
  totalDiscount: number;
  finalShippingFee: number;
  hasFreeShipping: boolean;
}

const applyFixedDiscount = (
  coupon: Coupon,
  totalCartPrice: number,
  acc: PartialResult
): PartialResult => {
  if (totalCartPrice >= coupon.minimumAmount) {
    return { ...acc, totalDiscount: acc.totalDiscount + coupon.discount };
  }
  return acc;
};

const applyPercentageDiscount = (
  coupon: Coupon,
  totalCartPrice: number,
  acc: PartialResult
): PartialResult => ({
  ...acc,
  totalDiscount: acc.totalDiscount + totalCartPrice * (coupon.discount / 100),
});

const applyBuyXgetYDiscount = (
  coupon: Coupon,
  items: Cart[] | undefined,
  acc: PartialResult
): PartialResult => {
  if (!items?.length) return acc;

  const eligibleItems = items.filter(
    (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
  );
  if (!eligibleItems.length) return acc;

  const highestItem = eligibleItems.reduce((a, b) =>
    a.product.price > b.product.price ? a : b
  );
  const freeQty =
    Math.floor(
      highestItem.quantity / (coupon.buyQuantity + coupon.getQuantity)
    ) * coupon.getQuantity;

  return {
    ...acc,
    totalDiscount: acc.totalDiscount + highestItem.product.price * freeQty,
  };
};

const applyFreeShippingDiscount = (
  coupon: Coupon,
  totalCartPrice: number,
  acc: PartialResult
): PartialResult => {
  if (totalCartPrice >= coupon.minimumAmount) {
    return { ...acc, finalShippingFee: 0, hasFreeShipping: true };
  }
  return acc;
};

const discountStrategies = {
  fixed: applyFixedDiscount,
  percentage: applyPercentageDiscount,
  buyXgetY: applyBuyXgetYDiscount,
  freeShipping: applyFreeShippingDiscount,
} satisfies Record<
  Coupon["discountType"],
  (coupon: Coupon, ...args: any[]) => PartialResult
>;

export function calculateCouponDiscount(
  selectedCoupons: Coupon[],
  totalCartPrice: number,
  shippingFee: number,
  selectedCartItems: Cart[] | undefined
): CouponCalculationResult {
  const initial: PartialResult = {
    totalDiscount: 0,
    finalShippingFee: shippingFee,
    hasFreeShipping: false,
  };

  const result = selectedCoupons.reduce((acc, coupon) => {
    const strategy = discountStrategies[coupon.discountType];
    const args =
      coupon.discountType === "buyXgetY"
        ? [coupon, selectedCartItems, acc]
        : [coupon, totalCartPrice, acc];

    return strategy(...(args as Parameters<typeof strategy>));
  }, initial);

  const finalShippingFee =
    !result.hasFreeShipping && totalCartPrice >= 100000
      ? 0
      : result.finalShippingFee;

  return {
    ...result,
    finalShippingFee,
    finalDiscount:
      result.totalDiscount + (result.hasFreeShipping ? shippingFee : 0),
  };
}
