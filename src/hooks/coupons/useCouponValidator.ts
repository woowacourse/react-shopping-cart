// 쿠폰의 유효성(만료일)을 검사하는 커스텀 훅

import { couponsState } from "@/stores/coupons";
import { Coupon } from "@/types/coupon";
import { useRecoilValue } from "recoil";

const useCouponValidator = () => {
  const coupons = useRecoilValue(couponsState);

  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);

    return today <= expiration;
  };

  const isCouponValid = (coupon: Coupon) => {
    return isCouponExpired(coupon.expirationDate);
  };

  const filteredValidCoupons = coupons.filter(isCouponValid);

  return { isCouponExpired, isCouponValid, filteredValidCoupons };
};

export default useCouponValidator;
