import { isCouponApplicable } from "./couponValidator";

export const calculateFixedDiscount = (coupon: Coupon) => {
  return coupon.discount ?? 0;
};

export const calculatePercentageDiscount = (coupon: Coupon, orderAmount: number) => {
  return Math.floor((orderAmount * (coupon.discount ?? 0)) / 100);
};

export const calculateBuyXGetYDiscount = (coupon: Coupon, checkedCartItems: CartItemInfo[]) => {
  const itemsMoreThanX = checkedCartItems.filter(
    (cartItem) => cartItem.quantity >= coupon.buyQuantity! + coupon.getQuantity!
  );

  return Math.max(...itemsMoreThanX.map((item) => item.product.price), 0);
};

export const calculateDiscountAmount = (coupon: Coupon, orderAmount: number, checkedCartItems: CartItemInfo[]) => {
  switch (coupon.discountType) {
    case "fixed":
      return calculateFixedDiscount(coupon);
    case "percentage":
      return calculatePercentageDiscount(coupon, orderAmount);
    case "buyXgetY":
      return calculateBuyXGetYDiscount(coupon, checkedCartItems);
    default:
      return 0;
  }
};

export const calculateTotalDiscountAmount = (
  couponList: Coupon[],
  orderAmount: number,
  checkedCartItems: CartItemInfo[],
  now: Date = new Date()
) => {
  let totalDiscountAmount = 0;

  couponList.forEach((coupon) => {
    if (isCouponApplicable(coupon, orderAmount, checkedCartItems, now)) {
      const discountAmount = calculateDiscountAmount(coupon, orderAmount, checkedCartItems);
      totalDiscountAmount += discountAmount;
    }
  });

  return totalDiscountAmount;
};
