import { Coupon } from '../../types/coupon';

export const useCouponValidator = () => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  const isCouponValid = (coupon: Coupon) => {
    return !isCouponExpired(coupon.expirationDate);
  };

  return {
    isCouponValid,
  };
};
