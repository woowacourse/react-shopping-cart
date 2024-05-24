import { Coupon } from '../types/Coupon';
import isCouponExpired from '../utils/IsCouponExpired';
import { useCouponFinder } from './useCouponFinder';

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();

  /**
   * 쿠폰 객체와 총 주문 금액, 현재 시간을 받아 해당 쿠폰의 적용 가능 여부 반환
   * @returns { boolean}
   */
  const isCouponApplicable = (
    coupon: Coupon,
    totalAmount: number,
    now: Date = new Date(),
  ) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || isCouponExpired(coupon)) return false;

    if (
      targetCoupon.minimumAmount &&
      totalAmount < targetCoupon.minimumAmount
    ) {
      return false;
    }

    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] =
        targetCoupon.availableTime.start.split(':').map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end
        .split(':')
        .map(Number);

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

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
