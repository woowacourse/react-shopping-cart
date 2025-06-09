import { Coupon } from '../types/coupon';

export const isCouponAvailable = (coupon: Coupon): boolean => {
  const today = new Date();
  const expirationDate = new Date(coupon.expirationDate);

  if (expirationDate < today) {
    return false;
  }

  if (coupon.availableTime) {
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const startTimeParts = coupon.availableTime.start.split(':');
    const startHour = Number(startTimeParts[0]);
    const startMinute = Number(startTimeParts[1]);

    const endTimeParts = coupon.availableTime.end.split(':');
    const endHour = Number(endTimeParts[0]);
    const endMinute = Number(endTimeParts[1]);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (currentTime < startTime || currentTime > endTime) {
      return false;
    }
  }

  return true;
};