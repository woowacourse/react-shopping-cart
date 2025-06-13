import { Cart } from "../../../api/cart";
import { Coupon } from "../../../api/coupon";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

type CouponValidators = {
  fixed: (totalCartPrice: number) => boolean;
  freeShipping: (totalCartPrice: number) => boolean;
  buyXgetY: (selectedCartItems: Cart[] | undefined) => boolean;
  percentage: () => boolean;
};

const validateCoupons = (coupon: Coupon): CouponValidators => ({
  fixed: (totalCartPrice: number) => {
    if (coupon.discountType !== "fixed") return false;
    return totalCartPrice >= coupon.minimumAmount;
  },

  freeShipping: (totalCartPrice: number) => {
    if (coupon.discountType !== "freeShipping") return false;
    return totalCartPrice >= coupon.minimumAmount;
  },

  buyXgetY: (selectedCartItems: Cart[] | undefined) => {
    if (coupon.discountType !== "buyXgetY") return false;
    return (selectedCartItems ?? []).some(
      (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
    );
  },

  percentage: () => {
    if (coupon.discountType !== "percentage") return false;
    if (!coupon.availableTime) return true;
    const now = new Date();
    const currentHour = now.getHours();
    const startHour = parseInt(coupon.availableTime.start, 10);
    const endHour = parseInt(coupon.availableTime.end, 10);
    return currentHour >= startHour && currentHour < endHour;
  },
});

export function isCouponAvailable(
  coupon: Coupon,
  totalCartPrice: number,
  selectedCartItems: Cart[] | undefined
): boolean {
  const validators = validateCoupons(coupon);

  switch (coupon.discountType) {
    case "fixed":
      return validators.fixed(totalCartPrice);
    case "freeShipping":
      return validators.freeShipping(totalCartPrice);
    case "buyXgetY":
      return validators.buyXgetY(selectedCartItems);
    case "percentage":
      return validators.percentage();
    default:
      return false;
  }
}
