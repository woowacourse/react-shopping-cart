import { Coupon } from "@/apis/coupon/coupon.type";

type CreateCouponDisabledCheckerParams = {
  notAvailableCoupons: Coupon[];
  notSelectedCoupons: Coupon[];
  isMaxSelectedCoupon: boolean;
};

export const createCouponDisabledChecker = ({
  notAvailableCoupons,
  notSelectedCoupons,
  isMaxSelectedCoupon,
}: CreateCouponDisabledCheckerParams) => {
  const disabledCoupons = isMaxSelectedCoupon
    ? notSelectedCoupons
    : notAvailableCoupons;

  const disabledCouponIds = disabledCoupons.map(({ id }) => id);
  const getIsCouponIdDisabled = (id: number) => {
    return disabledCouponIds.includes(id);
  };

  return getIsCouponIdDisabled;
};
