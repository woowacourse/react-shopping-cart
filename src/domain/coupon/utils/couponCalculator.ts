import { Cart } from "../../../api/cart";
import { Coupon } from "../../../api/coupon";

export interface CouponCalculationResult {
  totalDiscount: number;
  finalShippingFee: number;
  hasFreeShipping: boolean;
  finalDiscount: number;
}

export function calculateCouponDiscount(
  selectedCoupons: Coupon[],
  totalCartPrice: number,
  shippingFee: number,
  selectedCartItems: Cart[] | undefined
): CouponCalculationResult {
  let totalDiscount = 0;
  let finalShippingFee = shippingFee;
  let hasFreeShipping = false;

  selectedCoupons.forEach((coupon) => {
    switch (coupon.discountType) {
      case "fixed":
        if (totalCartPrice >= coupon.minimumAmount) {
          totalDiscount += coupon.discount;
        }
        break;

      case "percentage":
        totalDiscount += totalCartPrice * (coupon.discount / 100);
        break;

      case "buyXgetY":
        if (selectedCartItems && selectedCartItems.length > 0) {
          const eligibleItems = selectedCartItems.filter(
            (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
          );
          if (eligibleItems.length > 0) {
            const highestPriceItem = eligibleItems.reduce((prev, current) =>
              prev.product.price > current.product.price ? prev : current
            );
            const freeQuantity =
              Math.floor(
                highestPriceItem.quantity /
                  (coupon.buyQuantity + coupon.getQuantity)
              ) * coupon.getQuantity;
            totalDiscount += highestPriceItem.product.price * freeQuantity;
          }
        }
        break;

      case "freeShipping":
        if (totalCartPrice >= coupon.minimumAmount) {
          finalShippingFee = 0;
          hasFreeShipping = true;
        }
        break;
    }
  });

  if (!hasFreeShipping && totalCartPrice >= 100000) {
    finalShippingFee = 0;
  }

  const finalDiscount = totalDiscount + (hasFreeShipping ? shippingFee : 0);

  return {
    totalDiscount,
    finalShippingFee,
    hasFreeShipping,
    finalDiscount,
  };
}
