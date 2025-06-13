import { Coupon } from '../types/coupon';

export const getCouponAdditionalConditions = (coupon: Coupon) => {
  const { minimumAmount, availableTime } = coupon;

  const additionalCouponConditions = [];

  if (minimumAmount) {
    additionalCouponConditions.push(
      `최소 주문 금액: ${minimumAmount.toLocaleString()}원`
    );
  }
  if (availableTime) {
    const start = availableTime.start.slice(1, 2);
    const end = availableTime.end.slice(1, 2);
    additionalCouponConditions.push(
      `사용 가능 시간: 오전 ${start}시부터 ${end}시까지`
    );
  }

  return additionalCouponConditions;
};
