import { useRecoilValue } from "recoil";
import { couponsState } from "../store/atom/atoms";

export const useCouponFinder = () => {
  const coupons = useRecoilValue<Coupon[]>(couponsState);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return { findCouponByCode };
};
