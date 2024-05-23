// 쿠폰의 유효성(만료일)을 검사하는 커스텀 훅

import { Coupon } from "@/types/coupon";

const useCouponValidator = () => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);

    return today <= expiration;
  };

  const isCouponValid = (coupon: Coupon) => {
    return isCouponExpired(coupon.expirationDate);
  };

  return { isCouponExpired, isCouponValid };
};

export default useCouponValidator;
