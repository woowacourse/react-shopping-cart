import { CouponProps } from '../../types';

export const isCouponAvailableTime = (
  coupon: CouponProps,
  now: Date = new Date(),
) => {
  if (coupon.availableTime) {
    const [startHour, startMinute, startSecond] = coupon.availableTime.start
      .split(':')
      .map(Number);

    const [endHour, endMinute, endSecond] = coupon.availableTime.end
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
