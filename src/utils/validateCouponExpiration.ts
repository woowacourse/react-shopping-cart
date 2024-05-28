export const validateCouponExpiration = (coupon: Coupon) => {
  const now = new Date().getTime();
  return now - new Date(coupon.expirationDate).getTime() < 0;
};
