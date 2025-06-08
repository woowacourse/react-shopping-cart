import { CouponResponse } from "../../../../../type/coupon";

export const getSelectedCoupons = (
  coupons: CouponResponse[],
  selectedIds: number[]
) => coupons?.filter((coupon) => selectedIds.includes(coupon.id));
