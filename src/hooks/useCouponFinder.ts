import { useRecoilValue } from "recoil";
import { couponListSelectorState } from "../recoil/selector/selector";

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponListSelectorState);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
