import { Cart } from "../../../../../../api/cart";
import { Coupon } from "../../../../../../api/coupon";

export interface CouponCalculationResult {
  totalDiscount: number;
  finalShippingFee: number;
  hasFreeShipping: boolean;
  selectedCoupons: Coupon[];
  finalDiscount: number;
}

export function calculateCouponDiscount(
  coupons: Coupon[],
  selectedCouponIds: string[],
  totalCartPrice: number,
  shippingFee: number,
  cartItems: Cart[] | undefined
): CouponCalculationResult {
  const selectedCoupons = coupons.filter((coupon) =>
    selectedCouponIds.includes(coupon.id)
  );

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
        if (cartItems && cartItems.length > 0) {
          const eligibleItems = cartItems.filter(
            (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
          );
          if (eligibleItems.length > 0) {
            const highestPriceItem = eligibleItems.reduce((prev, current) =>
              prev.product.price > current.product.price ? prev : current
            );
            const freeQuantity = Math.floor(highestPriceItem.quantity / 2);
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
    selectedCoupons,
    finalDiscount,
  };
}
