export const isCouponExpired = (coupon: Coupon) => {
  const today = new Date();
  const expiration = new Date(coupon.expirationDate);
  return expiration < today;
};

export const isQuantityAvailable = (checkedItem: CartItemInfo[], coupon: Coupon) => {
  if (coupon.buyQuantity && coupon.getQuantity) {
    return checkedItem.map((item) => item.quantity >= coupon.buyQuantity! + coupon.getQuantity!).some(Boolean);
  }
  return true;
};

export const isTimeAvailable = (coupon: Coupon, now: Date) => {
  if (coupon.availableTime) {
    const [startHour, startMinute, startSecond] = coupon.availableTime.start.split(":").map(Number);

    const [endHour, endMinute, endSecond] = coupon.availableTime.end.split(":").map(Number);

    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);

    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

    if (now < startTime || now > endTime) {
      return false;
    }
  }
  return true;
};

export const findCouponByCode = (coupons: Coupon[], code: string) => {
  return coupons.find((coupon) => coupon.code === code);
};

export const isCouponApplicable = (
  coupon: Coupon,
  totalAmount: number,
  checkedItem: CartItemInfo[],
  now: Date = new Date()
) => {
  if (isCouponExpired(coupon)) return false;

  if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
    return false;
  }

  if (!isQuantityAvailable(checkedItem, coupon)) return false;

  if (!isTimeAvailable(coupon, now)) return false;

  return true;
};
