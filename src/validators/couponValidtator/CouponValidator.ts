import { CouponProps } from '../../types';

export const CouponValidator = () => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  const isCouponValid = (coupon: CouponProps) => {
    return !isCouponExpired(coupon.expirationDate);
  };

  return {
    isCouponValid,
  };
};
