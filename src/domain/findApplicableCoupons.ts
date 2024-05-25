interface Props {
  validCouponList: Coupon[];
  totalPrice: number;
  orderList: Cart[];
}

const findApplicableCoupons = ({
  validCouponList,
  totalPrice,
  orderList,
}: Props) => {
  const checkOrderAmountCoupons = (minimumAmount: number) => {
    return totalPrice >= minimumAmount;
  };

  const checkMiracleMorningCoupon = (availableTime: Time) => {
    const [startHour, startMinute, startSecond] = availableTime.start
      .split(':')
      .map(Number);

    const [endHour, endMinute, endSecond] = availableTime.end
      .split(':')
      .map(Number);

    const now = new Date();

    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      startHour,
      startMinute,
      startSecond,
    );

    const endTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      endHour,
      endMinute,
      endSecond,
    );

    return now >= startTime && now <= endTime;
  };

  const checkBulkPurchaseCoupon = () => {
    return orderList.some((order) => order.quantity > 2);
  };

  const applicableCoupons = () => {
    const applicableCouponList = validCouponList.filter((coupon) => {
      if (
        coupon.minimumAmount &&
        !checkOrderAmountCoupons(coupon.minimumAmount)
      ) {
        return false;
      }

      if (
        coupon.availableTime &&
        !checkMiracleMorningCoupon(coupon.availableTime)
      ) {
        return false;
      }

      if (coupon.discountType === 'buyXgetY' && !checkBulkPurchaseCoupon()) {
        return false;
      }

      return true;
    });

    return applicableCouponList;
  };

  return {
    applicableCoupons,
    checkOrderAmountCoupons,
    checkMiracleMorningCoupon,
    checkBulkPurchaseCoupon,
  };
};

export default findApplicableCoupons;
