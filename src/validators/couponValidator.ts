import { CouponType } from '../type';

const couponValidator = () => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);

    return expiration < today;
  };

  const isCouponIncluded = (code: string) => {
    const validCoupons = ['FIXED5000', 'BOGO', 'FREESHIPPING', 'MIRACLESALE'];

    return validCoupons.includes(code);
  };

  const validateCoupon = (coupon: CouponType) => {
    if (isCouponExpired(coupon.expirationDate)) return false;

    if (!isCouponIncluded(coupon.code)) return false;

    return true;
  };

  return { validateCoupon };
};

export default couponValidator;
