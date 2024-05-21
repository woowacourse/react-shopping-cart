import { useRecoilValue } from "recoil";
import { couponsAtom } from "../../recoil/atom/atom";

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponsAtom);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
