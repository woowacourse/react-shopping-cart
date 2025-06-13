import { Coupon } from "../../../api/coupon";

const PRIORITY_MAP: Record<Coupon["discountType"], number> = {
  percentage: 1,
  fixed: 2,
  buyXgetY: 3,
  freeShipping: 4,
};

export const sortCouponsByPriority = (coupons: Coupon[]): Coupon[] => {
  return [...coupons].sort(
    (a, b) => PRIORITY_MAP[a.discountType] - PRIORITY_MAP[b.discountType]
  );
};
