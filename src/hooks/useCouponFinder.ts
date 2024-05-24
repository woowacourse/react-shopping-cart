import { useRecoilValue } from "recoil";
import { fetchCouponsState } from "../store/selector/fetchCouponsState";

export const useCouponFinder = () => {
  const coupons = useRecoilValue<Coupon[]>(fetchCouponsState);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return { findCouponByCode };
};
