import { CouponType } from "../components/Coupon/types";

export const filterNonExpiredCoupons = (coupons: CouponType[]) => {
  const today = new Date().setHours(0, 0, 0, 0);

  return coupons.filter((coupon) => {
    const { year, month, day } = coupon.expirationDate;
    const expiredDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).setHours(0, 0, 0, 0);

    return expiredDate >= today;
  });
};
