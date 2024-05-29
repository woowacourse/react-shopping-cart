import { couponFinder } from './couponFinder';

import { PRICE } from '@/constants/config';
import { CouponCode } from '@/constants/coupon';
import { CartItemProps } from '@/types/cartItem';
import { Coupon } from '@/types/coupon';
import { couponValidator } from '@/utils/coupons/couponValidator';

interface IsCouponApplicableProps {
  coupon: Coupon;
  totalOrderPrice: number;
  checkedCartItems?: CartItemProps[];
  now?: Date;
}

export const couponApplicabilityChecker = (couponList: Coupon[]) => {
  const { findCouponByCode } = couponFinder(couponList);
  const { isCouponValid } = couponValidator();

  const isCouponApplicable = ({
    coupon,
    totalOrderPrice,
    now = new Date(),
    checkedCartItems,
  }: IsCouponApplicableProps) => {
    const targetCoupon = findCouponByCode(coupon.code);

    // 만료일 유효성 검사
    if (!targetCoupon || !isCouponValid(coupon)) return false;

    // 최소 주문 금액 유효성 검사
    if (coupon.minimumAmount && totalOrderPrice < coupon.minimumAmount) {
      return false;
    }

    // 총 주문 금액이 100000원 이상일 경우 무료 배송 쿠폰 사용 막기 유효성 검사
    if (
      coupon.code === CouponCode.FREESHIPPING &&
      totalOrderPrice >= PRICE.FREE_SHIPPING_CONDITION
    ) {
      return false;
    }

    // BOGO 쿠폰일 경우 3개 이상인 제품을 카운팅하여 쿠폰 유효성 검사
    if (coupon.code === CouponCode.BOGO && checkedCartItems) {
      const overThreeQuantityItems = checkedCartItems.filter((cartItem) => cartItem.quantity >= 3);
      return overThreeQuantityItems.length > 0;
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
