import { Coupon } from '@appTypes/orderConfirm';

export const useCouponValidator = () => {
  const isExpiredCoupon = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);

    return expiration < today;
  };

  const isCouponValid = (coupon: Coupon) => {
    return !isExpiredCoupon(coupon.expirationDate);
  };

  return isCouponValid;
};
