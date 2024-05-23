import { Coupon } from '@appTypes/orderConfirm';

export const useCouponValidator = () => {
  const isExpiredCoupon = (expirationDate: string) => {
    const [a, b, c] = expirationDate.split('-');
    const month = Number(b) + 1;
    const today = new Date();
    const expiration = new Date(`${a}-${month < 10 ? `0${month}` : month}-${c}`);

    return expiration < today;
  };

  const isCouponValid = (coupon: Coupon) => {
    return !isExpiredCoupon(coupon.expirationDate);
  };

  return isCouponValid;
};
