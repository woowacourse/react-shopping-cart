import { CouponType } from '../type';

const couponValidator = () => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);

    return expiration < today;
  };

  const isCouponValid = (coupon: CouponType) => {
    return !isCouponExpired(coupon.expirationDate);
  };

  return { isCouponValid };
};

export default couponValidator;
