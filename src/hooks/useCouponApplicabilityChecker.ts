import { useCouponFinder } from './useCouponFinder';

import { PRICE } from '@/constants/config';
import { Coupon } from '@/types/coupon';
import { couponValidator } from '@components/Coupon/couponValidator';

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = couponValidator();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    const targetCoupon = findCouponByCode(coupon.code);

    // 만료일 유효성 검사
    if (!targetCoupon || !isCouponValid(coupon)) return false;

    // 최소 주문 금액 유효성 검사
    if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
      return false;
    }

    // 총 주문 금액이 100000원 이상일 경우 무료 배송 쿠폰 사용 막기 유효성 검사
    if (coupon.code === 'FREESHIPPING' && totalAmount >= PRICE.FREE_SHIPPING_CONDITION) {
      return false;
    }

    // 사용 가능 시간 유효성 검사
    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] = targetCoupon.availableTime.start
        .split(':')
        .map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end.split(':').map(Number);

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

  return { isCouponApplicable };
};
