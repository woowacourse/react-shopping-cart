import { Coupon } from '../../api/get/getCoupons';

const useCouponValidator = () => {
  const isEffectiveDate = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration >= today;
  };

  const isValidCoupon = (coupon: Coupon) => {
    return isEffectiveDate(coupon.expirationDate);
  };

  return {
    isValidCoupon,
  };
};

export default useCouponValidator;
