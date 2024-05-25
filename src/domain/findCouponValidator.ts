const findCouponValidator = (couponList: Coupon[]) => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  const isCouponValid = (coupon: Coupon) => {
    return !isCouponExpired(coupon.expirationDate);
  };

  const validCoupon = () => {
    const validCouponList = couponList.filter((coupon: Coupon) => {
      return isCouponValid(coupon);
    });
    return validCouponList;
  };

  return {
    isCouponValid,
    validCoupon,
  };
};

export default findCouponValidator;
