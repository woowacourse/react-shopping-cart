import { AvailableTime, Coupon } from '../types/Coupon';
import isCouponExpired from '../utils/IsCouponExpired';
import { useCouponFinder } from './useCouponFinder';

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();

  /**
   * 쿠폰 객체와 총 주문 금액, 현재 시간을 받아 해당 쿠폰의 적용 가능 여부 반환
   * @returns { boolean }
   */
  const isCouponApplicable = (
    coupon: Coupon,
    totalAmount: number,
    now: Date = new Date(),
  ) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || isCouponExpired(coupon)) return false;

    if (coupon.discountType === 'freeShipping' && totalAmount >= 100000) {
      return false;
    }

    if (
      targetCoupon.minimumAmount &&
      totalAmount < targetCoupon.minimumAmount
    ) {
      return false;
    }

    if (targetCoupon.availableTime) {
      return isWithinAvailableTime(targetCoupon.availableTime, now);
    }

    return true;
  };

  /**
   * 인자로 받은 쿠폰 시간을 현재 시간과 비교하여 사용 가능한지 확인하는 함수
   * @returns { boolean }
   */
  const isWithinAvailableTime = (couponTime: AvailableTime, now: Date) => {
    const [startHour, startMinute, startSecond] = couponTime.start
      .split(':')
      .map(Number);
    const [endHour, endMinute, endSecond] = couponTime.end
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

    return now >= startTime && now <= endTime;
  };

  return {
    isCouponApplicable,
  };
};
